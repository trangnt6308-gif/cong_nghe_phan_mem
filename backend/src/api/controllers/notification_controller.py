from flask import Blueprint, request, jsonify
from infrastructure.repositories.notification_repository import NotificationRepository
from services.notification_service import NotificationService
from api.schemas.notification import ThongBaoRequestSchema, ThongBaoResponseSchema
from infrastructure.databases.postgres import session
from infrastructure.models.app_don_hang_model import DonHangModel
from infrastructure.models.app_giao_hang_model import GiaoHangModel
from infrastructure.models.app_nguoi_dung_model import NguoiDungModel

notification_bp = Blueprint('notification', __name__, url_prefix='/notifications')

notification_repo = NotificationRepository()
notification_service = NotificationService(notification_repo)

req_schema = ThongBaoRequestSchema()
res_schema = ThongBaoResponseSchema()

@notification_bp.route('/', methods=['GET'])
def list_notifications():
    """
    Get all notifications
    ---
    get:
      summary: List all notifications
      tags:
        - Notifications
      responses:
        200:
          description: List of notifications
    """
    notifications = notification_service.get_all()
    return jsonify(res_schema.dump(notifications, many=True)), 200

@notification_bp.route('/customer/<uuid:ma_kh>', methods=['GET'])
def list_customer_notifications(ma_kh):
    """
    Get customer notifications
    ---
    get:
      summary: List customer specific notifications
      tags:
        - Notifications
      parameters:
        - name: ma_kh
          in: path
          required: true
          schema:
            type: string
            format: uuid
      responses:
        200:
          description: List of notifications
    """
    notifications = notification_service.get_by_customer_id(str(ma_kh))
    return jsonify(res_schema.dump(notifications, many=True)), 200

@notification_bp.route('/', methods=['POST'])
def create_notification():
    """
    Create notification
    ---
    post:
      summary: Send a notification to customer
      tags:
        - Notifications
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/ThongBaoRequest'
      responses:
        201:
          description: Notification created
    """
    data = request.get_json()
    errors = req_schema.validate(data)
    if errors:
        return jsonify(errors), 400
        
    notification = notification_service.create(data)
    if not notification:
        return jsonify({'error': 'Customer or Order not found'}), 404
        
    return jsonify(res_schema.dump(notification)), 201

@notification_bp.route('/<uuid:ma_thong_bao>/read', methods=['PUT'])
def mark_read(ma_thong_bao):
    """
    Mark notification as read
    ---
    put:
      summary: Set notification status to read
      tags:
        - Notifications
      parameters:
        - name: ma_thong_bao
          in: path
          required: true
          schema:
            type: string
            format: uuid
      responses:
        200:
          description: Marked as read
    """
    notification = notification_service.mark_read(str(ma_thong_bao))
    if not notification:
        return jsonify({'error': 'Notification not found'}), 404
        
    return jsonify(res_schema.dump(notification)), 200

@notification_bp.route('/<uuid:ma_thong_bao>', methods=['DELETE'])
def delete_notification(ma_thong_bao):
    """
    Delete notification
    ---
    delete:
      summary: Delete notification
      tags:
        - Notifications
      parameters:
        - name: ma_thong_bao
          in: path
          required: true
          schema:
            type: string
            format: uuid
      responses:
        204:
          description: Notification deleted
    """
    success = notification_service.delete(str(ma_thong_bao))
    if not success:
        return jsonify({'error': 'Notification not found'}), 404
    return '', 204


@notification_bp.route('/activity-log', methods=['GET'])
def get_activity_log():
    """
    Get system activity log (audit log)
    ---
    get:
      summary: Get recent system activity events from orders and deliveries
      tags:
        - Notifications
      responses:
        200:
          description: Activity log list
    """
    logs = []

    # Lấy 30 đơn hàng cập nhật gần nhất
    orders = (
        session.query(DonHangModel)
        .order_by(DonHangModel.ngay_cap_nhat.desc())
        .limit(30)
        .all()
    )
    for o in orders:
        logs.append({
            'id': str(o.ma_don_hang),
            'time': o.ngay_cap_nhat.strftime('%Y-%m-%d %H:%M:%S') if o.ngay_cap_nhat else '',
            'user': 'Hệ thống',
            'action': f'Đơn hàng → {o.trang_thai_don_hang}',
            'target': f'Đơn #{str(o.ma_don_hang)[:8]}',
            'ip': '127.0.0.1',
            'type': 'order'
        })

    # Lấy 20 chuyến giao hàng cập nhật gần nhất
    deliveries = (
        session.query(GiaoHangModel)
        .order_by(GiaoHangModel.updated_at.desc())
        .limit(20)
        .all()
    )
    for d in deliveries:
        logs.append({
            'id': str(d.ma_giao_hang),
            'time': d.updated_at.strftime('%Y-%m-%d %H:%M:%S') if d.updated_at else '',
            'user': 'Hệ thống',
            'action': f'Giao hàng → {d.trang_thai_giao_hang}',
            'target': f'Chuyến #{str(d.ma_giao_hang)[:8]}',
            'ip': '127.0.0.1',
            'type': 'delivery'
        })

    # Sắp xếp theo thời gian mới nhất
    logs.sort(key=lambda x: x['time'], reverse=True)
    return jsonify(logs[:50]), 200

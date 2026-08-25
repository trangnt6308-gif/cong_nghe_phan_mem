import { useState } from 'react'
import { Badge } from '../components/Badges'
import { Icon } from '../components/Icons'

interface OrderDetailScreenProps {
  onBack: () => void
  showToast: (msg: string, type: 'success' | 'error' | 'info') => void
}

export function OrderDetailScreen({ onBack, showToast }: OrderDetailScreenProps) {
  const [showApprove, setShowApprove] = useState(false)
  const [showReject, setShowReject] = useState(false)
  const [rejectReason, setRejectReason] = useState('')

  const handleApprove = () => {
    setShowApprove(false)
    showToast('Phê duyệt đơn hàng ORD-2024-001 thành công. Đơn hàng chuyển sang trạng thái: Đã duyệt.', 'success')
  }

  const handleReject = () => {
    setShowReject(false)
    showToast(`Đã từ chối đơn hàng ORD-2024-001. Lý do: "${rejectReason || 'Không có lý do'}"`, 'info')
  }

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <button className="btn btn-outline btn-sm" onClick={onBack}>← Quay lại danh sách</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 16 }}>
        {/* Main info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div className="card" style={{ padding: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <div>
                <span style={{ fontSize: 13, color: '#94a3b8' }}>Chi tiết đơn hàng</span>
                <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 18, color: '#1e293b', marginTop: 2 }}>ORD-2024-001</h2>
              </div>
              <Badge status="pending" />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '16px 24px', fontSize: 14 }}>
              <div>
                <span style={{ color: '#64748b', fontSize: 12 }}>KHÁCH HÀNG</span>
                <div style={{ fontWeight: 550, color: '#1e293b', marginTop: 2 }}>Nguyễn Văn An</div>
              </div>
              <div>
                <span style={{ color: '#64748b', fontSize: 12 }}>SỐ ĐIỆN THOẠI</span>
                <div style={{ fontWeight: 550, color: '#1e293b', marginTop: 2 }}>0912 345 678</div>
              </div>
              <div style={{ gridColumn: 'span 2' }}>
                <span style={{ color: '#64748b', fontSize: 12 }}>ĐỊA CHỈ GIAO HÀNG</span>
                <div style={{ fontWeight: 550, color: '#1e293b', marginTop: 2 }}>12 Lý Thường Kiệt, Q.1, TP.HCM</div>
              </div>
              <div>
                <span style={{ color: '#64748b', fontSize: 12 }}>TRỌNG LƯỢNG HÀNG</span>
                <div style={{ fontWeight: 550, color: '#1e293b', marginTop: 2 }}>2.4 kg</div>
              </div>
              <div>
                <span style={{ color: '#64748b', fontSize: 12 }}>TRẠM PHÁT</span>
                <div style={{ fontWeight: 550, color: '#1e293b', marginTop: 2 }}>Trạm Quận 1 (STN-01)</div>
              </div>
            </div>
          </div>

          <div className="card" style={{ padding: 20 }}>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 15, color: '#1e293b', marginBottom: 12 }}>Bản đồ lộ trình dự kiến</div>
            <div style={{
              height: 200, background: '#EFF6FF', borderRadius: 10, border: '1px dashed #93C5FD',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#1D4ED8', fontSize: 13,
            }}>
              {Icon.map}
              <span style={{ marginTop: 6, fontWeight: 500 }}>Vị trí trạm phát và lưới tọa độ giao hàng tại Q.1</span>
            </div>
          </div>
        </div>

        {/* Status panel */}
        <div className="card" style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <div style={{ fontSize: 12, color: '#64748b' }}>Hành động điều phối</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 10 }}>
              <button className="btn btn-success" onClick={() => setShowApprove(true)} style={{ justifyContent: 'center' }}>{Icon.check} Phê duyệt đơn</button>
              <button className="btn btn-outline" onClick={() => setShowReject(true)} style={{ justifyContent: 'center', color: '#EF4444', borderColor: '#FCA5A5' }}>{Icon.x} Từ chối đơn</button>
            </div>
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid #f1f5f9' }} />

          <div>
            <div style={{ fontSize: 12, color: '#64748b', marginBottom: 10 }}>Nhật ký đơn hàng</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, fontSize: 13 }}>
              <div style={{ display: 'flex', gap: 8 }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#F97316', display: 'inline-block', marginTop: 5, flexShrink: 0 }} />
                <div>
                  <b>Đơn hàng được khởi tạo</b>
                  <div style={{ fontSize: 11, color: '#94a3b8' }}>06/08/2026 08:12 — Hệ thống</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Duyệt đơn */}
      {showApprove && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(15,23,42,0.4)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ background: 'white', borderRadius: 16, padding: '24px 20px', width: '100%', maxWidth: 400, boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 17, color: '#1e293b', marginBottom: 8 }}>Xác nhận phê duyệt</h3>
            <p style={{ fontSize: 14, color: '#64748b', lineHeight: 1.5, marginBottom: 16 }}>
              Bạn có chắc chắn muốn phê duyệt đơn hàng này? Hệ thống sẽ lưu log hoạt động của bạn.
            </p>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
              <button className="btn btn-outline btn-sm" onClick={() => setShowApprove(false)}>Hủy</button>
              <button className="btn btn-success btn-sm" onClick={handleApprove}>Phê duyệt</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Từ chối đơn */}
      {showReject && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(15,23,42,0.4)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ background: 'white', borderRadius: 16, padding: '24px 20px', width: '100%', maxWidth: 400, boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 17, color: '#1e293b', marginBottom: 8 }}>Từ chối đơn hàng</h3>
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#374151', marginBottom: 6 }}>Lý do từ chối</label>
              <input className="input" placeholder="Ví dụ: Địa chỉ ngoài vùng phủ sóng..." value={rejectReason} onChange={e => setRejectReason(e.target.value)} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
              <button className="btn btn-outline btn-sm" onClick={() => setShowReject(false)}>Hủy</button>
              <button className="btn btn-sm" style={{ background: '#EF4444', color: 'white', border: 'none' }} onClick={handleReject}>Xác nhận từ chối</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
export default OrderDetailScreen

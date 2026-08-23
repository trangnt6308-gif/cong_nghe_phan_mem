export const ORDERS = [
  { id: 'ORD-2024-001', customer: 'Nguyễn Văn An', address: '12 Lý Thường Kiệt, Q.1, TP.HCM', weight: '2.4 kg', status: 'pending', created: '06/08/2026 08:12', station: 'Trạm Quận 1' },
  { id: 'ORD-2024-002', customer: 'Trần Thị Bích', address: '45 Đinh Tiên Hoàng, Bình Thạnh', weight: '0.8 kg', status: 'delivering', created: '06/08/2026 07:50', station: 'Trạm Bình Thạnh' },
  { id: 'ORD-2024-003', customer: 'Lê Minh Châu', address: '88 Nguyễn Trãi, Q.5', weight: '3.1 kg', status: 'completed', created: '06/08/2026 07:30', station: 'Trạm Quận 5' },
  { id: 'ORD-2024-004', customer: 'Phạm Quốc Dũng', address: '22 Cách Mạng Tháng 8, Q.3', weight: '1.2 kg', status: 'failed', created: '06/08/2026 07:10', station: 'Trạm Quận 3' },
  { id: 'ORD-2024-005', customer: 'Hoàng Thị Em', address: '77 Võ Văn Tần, Q.3', weight: '0.5 kg', status: 'approved', created: '06/08/2026 06:55', station: 'Trạm Quận 3' },
  { id: 'ORD-2024-006', customer: 'Đỗ Văn Phúc', address: '5 Phan Văn Trị, Gò Vấp', weight: '4.0 kg', status: 'expired', created: '05/08/2026 18:20', station: 'Trạm Gò Vấp' },
  { id: 'ORD-2024-007', customer: 'Vũ Thị Giang', address: '101 Điện Biên Phủ, Bình Thạnh', weight: '1.8 kg', status: 'pending', created: '06/08/2026 09:05', station: 'Trạm Bình Thạnh' },
  { id: 'ORD-2024-008', customer: 'Ngô Thanh Hùng', address: '30 Hai Bà Trưng, Q.1', weight: '2.9 kg', status: 'delivering', created: '06/08/2026 09:22', station: 'Trạm Quận 1' },
]

export const STATIONS = [
  { id: 'STN-01', name: 'Trạm Quận 1', lat: '10.7769°N', lng: '106.7009°E', capacity: 8, current: 3, status: 'active', district: 'Quận 1' },
  { id: 'STN-02', name: 'Trạm Bình Thạnh', lat: '10.8027°N', lng: '106.7181°E', capacity: 6, current: 6, status: 'maintenance', district: 'Bình Thạnh' },
  { id: 'STN-03', name: 'Trạm Quận 3', lat: '10.7801°N', lng: '106.6897°E', capacity: 5, current: 1, status: 'active', district: 'Quận 3' },
  { id: 'STN-04', name: 'Trạm Quận 5', lat: '10.7548°N', lng: '106.6647°E', capacity: 7, current: 4, status: 'active', district: 'Quận 5' },
  { id: 'STN-05', name: 'Trạm Gò Vấp', lat: '10.8380°N', lng: '106.6880°E', capacity: 4, current: 0, status: 'stopped', district: 'Gò Vấp' },
  { id: 'STN-06', name: 'Trạm Tân Bình', lat: '10.8009°N', lng: '106.6523°E', capacity: 6, current: 2, status: 'active', district: 'Tân Bình' },
]

export const USERS = [
  { id: '1', name: 'Trần Quốc Bảo', email: 'bao.tran@smartdrone.vn', role: 'admin', created: '01/01/2026', status: 'active' },
  { id: '2', name: 'Lê Văn Cường', email: 'cuong.le@smartdrone.vn', role: 'dispatcher', created: '15/03/2026', status: 'active' },
  { id: '3', name: 'Nguyễn Thị Dung', email: 'dung.nguyen@smartdrone.vn', role: 'operator', created: '20/04/2026', status: 'active' },
  { id: '4', name: 'Phạm Minh Hiếu', email: 'hieu.pham@smartdrone.vn', role: 'manager', created: '10/05/2026', status: 'active' },
  { id: '5', name: 'Hoàng Thị Kim', email: 'kim.hoang@smartdrone.vn', role: 'operator', created: '01/06/2026', status: 'locked' },
  { id: '6', name: 'Vũ Đức Lâm', email: 'lam.vu@smartdrone.vn', role: 'dispatcher', created: '15/06/2026', status: 'active' },
]

export const ACTIVITY_LOG = [
  { id: 1, time: '06/08/2026 09:32:14', user: 'Lê Văn Cường', action: 'Duyệt đơn', target: 'ORD-2024-007', ip: '192.168.1.42' },
  { id: 2, time: '06/08/2026 09:15:08', user: 'Nguyễn Thị Dung', action: 'Xác nhận nhận', target: 'ORD-2024-002', ip: '10.0.0.15' },
  { id: 3, time: '06/08/2026 08:58:44', user: 'Lê Văn Cường', action: 'Lập lịch', target: 'ORD-2024-005', ip: '192.168.1.42' },
  { id: 4, time: '06/08/2026 08:42:31', user: 'Trần Quốc Bảo', action: 'Tạo tài khoản', target: 'Vũ Đức Lâm', ip: '192.168.1.1' },
  { id: 5, time: '06/08/2026 08:20:19', user: 'Lê Văn Cường', action: 'Từ chối đơn', target: 'ORD-2024-004', ip: '192.168.1.42' },
  { id: 6, time: '06/08/2026 07:55:02', user: 'Trần Quốc Bảo', action: 'Đăng nhập', target: '—', ip: '192.168.1.1' },
  { id: 7, time: '06/08/2026 07:30:50', user: 'Nguyễn Thị Dung', action: 'Đăng nhập', target: '—', ip: '10.0.0.15' },
  { id: 8, time: '06/08/2026 07:12:37', user: 'Phạm Minh Hiếu', action: 'Xuất báo cáo', target: 'Báo cáo tháng 7', ip: '172.16.0.8' },
  { id: 9, time: '05/08/2026 22:10:05', user: 'Lê Văn Cường', action: 'Xóa', target: 'STN-05 (cũ)', ip: '192.168.1.42' },
  { id: 10, time: '05/08/2026 18:30:11', user: 'Trần Quốc Bảo', action: 'Sửa tài khoản', target: 'Hoàng Thị Kim', ip: '192.168.1.1' },
]

export const HOURLY_DATA = [
  { hour: '00h', orders: 3 }, { hour: '02h', orders: 1 }, { hour: '04h', orders: 2 },
  { hour: '06h', orders: 8 }, { hour: '08h', orders: 24 }, { hour: '10h', orders: 31 },
  { hour: '12h', orders: 18 }, { hour: '14h', orders: 27 }, { hour: '16h', orders: 35 },
  { hour: '18h', orders: 22 }, { hour: '20h', orders: 14 }, { hour: '22h', orders: 6 },
]

export const WEEKLY_DATA = [
  { day: 'T2', completed: 120, failed: 8 }, { day: 'T3', completed: 145, failed: 5 },
  { day: 'T4', completed: 98, failed: 12 }, { day: 'T5', completed: 178, failed: 6 },
  { day: 'T6', completed: 201, failed: 9 }, { day: 'T7', completed: 167, failed: 4 },
  { day: 'CN', completed: 89, failed: 3 },
]

export const STATUS_DONUT = [
  { name: 'Đang giao', value: 42, color: '#3B82F6' },
  { name: 'Hoàn tất', value: 156, color: '#22C55E' },
  { name: 'Chờ duyệt', value: 18, color: '#F97316' },
  { name: 'Thất bại', value: 12, color: '#EF4444' },
]

export const STATION_PERF = [
  { name: 'Quận 1', success: 96 }, { name: 'Bình Thạnh', success: 88 },
  { name: 'Quận 3', success: 92 }, { name: 'Quận 5', success: 84 },
  { name: 'Tân Bình', success: 78 },
]

export const TREND_DATA = Array.from({ length: 30 }, (_, i) => ({
  date: `${i + 1}/7`, orders: Math.floor(150 + 10 * Math.sin(i)), success: Math.floor(130 + 8 * Math.cos(i)),
}))

export const DRONES = [
  { id: 'DRN-01', orderId: 'ORD-2024-002', x: 62, y: 38, status: 'delivering', eta: '12 phút', customer: 'Trần Thị Bích' },
  { id: 'DRN-02', orderId: 'ORD-2024-008', x: 35, y: 55, status: 'arriving', eta: '3 phút', customer: 'Ngô Thanh Hùng' },
  { id: 'DRN-03', orderId: 'ORD-2024-009', x: 75, y: 65, status: 'issue', eta: 'Sự cố', customer: 'Bùi Thị Lan' },
  { id: 'DRN-04', orderId: 'ORD-2024-010', x: 48, y: 28, status: 'delivering', eta: '8 phút', customer: 'Đinh Mạnh Nam' },
]

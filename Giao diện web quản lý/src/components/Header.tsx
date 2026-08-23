import { Screen, Role } from '../types'
import { Icon } from './Icons'
import { RoleBadge } from './Badges'

interface HeaderProps {
  screen: Screen
  role: Role
  onLogout: () => void
}

export function Header({ screen, role, onLogout }: HeaderProps) {
  const labels: Record<Screen, string> = {
    login: 'Đăng nhập',
    dashboard: 'Tổng quan',
    orders: 'Quản lý đơn hàng',
    'order-detail': 'Chi tiết đơn hàng',
    scheduling: 'Lập lịch giao hàng',
    failed: 'Xử lý thất bại',
    'station-ops': 'Vận hành trạm',
    tracking: 'Theo dõi giao hàng',
    stations: 'Quản lý trạm hạ cánh',
    reports: 'Báo cáo & Thống kê',
    'ai-eta': 'AI & Phân tích ETA',
    users: 'Quản lý người dùng',
    'activity-log': 'Nhật ký hoạt động',
  }

  const roleNames: Record<Role, string> = {
    admin: 'Trần Quốc Bảo',
    dispatcher: 'Lê Văn Cường',
    operator: 'Nguyễn Thị Dung',
    manager: 'Phạm Minh Hiếu',
  }

  return (
    <header style={{
      background: 'white', borderBottom: '1px solid #f1f5f9',
      padding: '0 24px', height: 56,
      display: 'flex', alignItems: 'center', gap: 16,
      boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
      position: 'sticky', top: 0, zIndex: 50,
    }}>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 11, color: '#94a3b8', marginBottom: 1 }}>SmartDroneDelivery</div>
        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 15, color: '#1e293b' }}>{labels[screen]}</div>
      </div>

      <button style={{ position: 'relative', background: 'none', border: 'none', cursor: 'pointer', color: '#64748b', padding: 8, borderRadius: 8, display: 'flex' }}>
        {Icon.bell}
        <span style={{ position: 'absolute', top: 6, right: 6, width: 7, height: 7, background: '#EF4444', borderRadius: '50%', border: '1.5px solid white' }} />
      </button>

      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{
          width: 32, height: 32, borderRadius: '50%',
          background: 'linear-gradient(135deg,#3B82F6,#60A5FA)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'white', fontWeight: 700, fontSize: 13, fontFamily: 'var(--font-display)',
        }}>
          {roleNames[role]?.[0] || 'U'}
        </div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#1e293b', lineHeight: 1.2 }}>{roleNames[role]}</div>
          <div style={{ fontSize: 11, color: '#94a3b8' }}><RoleBadge role={role} /></div>
        </div>
      </div>

      <button onClick={onLogout} className="btn btn-ghost btn-sm" style={{ gap: 6 }}>
        {Icon.logout} <span style={{ fontSize: 12 }}>Đăng xuất</span>
      </button>
    </header>
  )
}
export default Header

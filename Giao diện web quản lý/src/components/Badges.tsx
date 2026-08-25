export const statusConfig: Record<string, { label: string; bg: string; color: string }> = {
  pending:    { label: 'Chờ duyệt',    bg: '#FFF7ED', color: '#C2410C' },
  approved:   { label: 'Đã duyệt',     bg: '#EFF6FF', color: '#1D4ED8' },
  delivering: { label: 'Đang giao',    bg: '#EFF6FF', color: '#2563EB' },
  completed:  { label: 'Hoàn tất',     bg: '#F0FDF4', color: '#15803D' },
  failed:     { label: 'Thất bại',     bg: '#FEF2F2', color: '#B91C1C' },
  expired:    { label: '⏰ Quá hạn',   bg: '#FFF3CD', color: '#92400E' },
  scheduled:  { label: 'Đã lên lịch', bg: '#F3E8FF', color: '#7C3AED' },
}

export const roleBadge: Record<string, { label: string; bg: string; color: string }> = {
  admin:      { label: 'Admin',      bg: '#EDE9FE', color: '#7C3AED' },
  dispatcher: { label: 'Dispatcher', bg: '#DBEAFE', color: '#1D4ED8' },
  operator:   { label: 'Operator',   bg: '#FEF3C7', color: '#D97706' },
  manager:    { label: 'Manager',    bg: '#DCFCE7', color: '#16A34A' },
}

export const actionBadge: Record<string, { bg: string; color: string }> = {
  'Duyệt đơn':      { bg: '#F0FDF4', color: '#15803D' },
  'Tạo tài khoản':  { bg: '#F0FDF4', color: '#15803D' },
  'Xác nhận nhận':  { bg: '#F0FDF4', color: '#15803D' },
  'Đăng nhập':      { bg: '#EFF6FF', color: '#1D4ED8' },
  'Lập lịch':       { bg: '#EFF6FF', color: '#1D4ED8' },
  'Từ chối đơn':    { bg: '#FEF2F2', color: '#B91C1C' },
  'Xóa':            { bg: '#FEF2F2', color: '#B91C1C' },
  'Sửa tài khoản':  { bg: '#FFF7ED', color: '#C2410C' },
  'Xuất báo cáo':   { bg: '#FFF7ED', color: '#C2410C' },
}

export function Badge({ status }: { status: string }) {
  const cfg = statusConfig[status] || { label: status, bg: '#f1f5f9', color: '#475569' }
  return (
    <span className="badge" style={{ background: cfg.bg, color: cfg.color }}>
      {cfg.label}
    </span>
  )
}

export function RoleBadge({ role }: { role: string }) {
  const cfg = roleBadge[role] || { label: role, bg: '#f1f5f9', color: '#475569' }
  return (
    <span className="badge" style={{ background: cfg.bg, color: cfg.color }}>
      {cfg.label}
    </span>
  )
}

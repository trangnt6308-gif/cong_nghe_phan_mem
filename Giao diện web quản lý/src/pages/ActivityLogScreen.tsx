import { ACTIVITY_LOG } from '../mockData'
import { actionBadge } from '../components/Badges'

export function ActivityLogScreen() {
  return (
    <div className="card" style={{ overflow: 'hidden' }}>
      <div style={{ padding: '16px 20px', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 650, fontSize: 15, color: '#1e293b' }}>Hệ thống lưu nhật ký vận hành (Audit Logs)</h3>
        <span style={{ fontSize: 11, background: '#f8fafc', padding: '4px 8px', borderRadius: 6, color: '#64748b' }}>Lưu trữ bảo mật • Không thể sửa/xóa</span>
      </div>
      <table className="data-table">
        <thead><tr>
          <th>Thời gian</th><th>Thành viên thực hiện</th><th>Hành động</th><th>Đối tượng tác động</th><th>Địa chỉ IP</th>
        </tr></thead>
        <tbody>
          {ACTIVITY_LOG.map(log => {
            const badge = actionBadge[log.action] || { bg: '#f1f5f9', color: '#475569' }
            return (
              <tr key={log.id}>
                <td style={{ color: '#64748b', fontSize: 12, fontFamily: 'var(--font-mono)' }}>{log.time}</td>
                <td style={{ fontWeight: 550, color: '#1E293B' }}>{log.user}</td>
                <td>
                  <span className="badge" style={{ background: badge.bg, color: badge.color }}>
                    {log.action}
                  </span>
                </td>
                <td style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: '#475569' }}>{log.target}</td>
                <td style={{ color: '#64748b', fontSize: 12, fontFamily: 'var(--font-mono)' }}>{log.ip}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
export default ActivityLogScreen

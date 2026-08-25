import {
  BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts'
import { Screen } from '../types'
import { Icon } from '../components/Icons'
import { Badge } from '../components/Badges'
import { ORDERS, HOURLY_DATA, STATUS_DONUT } from '../mockData'

interface DashboardScreenProps {
  onNav: (s: Screen) => void
}

export function DashboardScreen({ onNav }: DashboardScreenProps) {
  const kpis = [
    { label: 'Tổng đơn hôm nay', value: '228', sub: '+18% so hôm qua', color: '#1E3A5F', bg: '#EFF6FF', trend: 'up' },
    { label: 'Đang giao', value: '42', sub: '6 drone hoạt động', color: '#2563EB', bg: '#EFF6FF', trend: 'up' },
    { label: 'Hoàn tất', value: '156', sub: 'Tỷ lệ: 68.4%', color: '#15803D', bg: '#F0FDF4', trend: 'up' },
    { label: 'Thất bại', value: '12', sub: '2 chờ xử lý', color: '#B91C1C', bg: '#FEF2F2', trend: 'down' },
  ]

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16, marginBottom: 24 }}>
        {kpis.map(k => (
          <div key={k.label} className="kpi-card" style={{ borderLeft: `4px solid ${k.color}` }}>
            <div style={{ fontSize: 12, color: '#64748b', marginBottom: 6 }}>{k.label}</div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 800, color: k.color, lineHeight: 1 }}>{k.value}</div>
            <div style={{ fontSize: 12, color: k.trend === 'up' ? '#22C55E' : '#EF4444', marginTop: 6 }}>
              {k.trend === 'up' ? '▲' : '▼'} {k.sub}
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 16, marginBottom: 16 }}>
        <div className="card" style={{ padding: 20 }}>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 15, color: '#1e293b', marginBottom: 16 }}>Đơn hàng theo giờ — hôm nay</div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={HOURLY_DATA} barSize={18}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="hour" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #e2e8f0' }} />
              <Bar dataKey="orders" fill="#3B82F6" radius={[4,4,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="card" style={{ padding: 20, display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 15, color: '#1e293b', marginBottom: 4 }}>Tỷ lệ trạng thái</div>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie data={STATUS_DONUT} cx="50%" cy="50%" innerRadius={50} outerRadius={72} dataKey="value" stroke="none">
                {STATUS_DONUT.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
            </PieChart>
          </ResponsiveContainer>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px 12px', marginTop: 4 }}>
            {STATUS_DONUT.map(d => (
              <div key={d.name} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#475569' }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: d.color, display: 'inline-block' }} />
                {d.name}: <b style={{ color: '#1e293b' }}>{d.value}</b>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card" style={{ overflow: 'hidden' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 15, color: '#1e293b' }}>Đơn hàng cần xử lý</div>
          <button className="btn btn-outline btn-sm" onClick={() => onNav('orders')}>Xem tất cả</button>
        </div>
        <table className="data-table">
          <thead><tr>
            <th>Mã đơn</th><th>Khách hàng</th><th>Địa chỉ</th><th>Trạng thái</th><th>Thời gian</th><th>Hành động</th>
          </tr></thead>
          <tbody>
            {ORDERS.filter(o => o.status === 'pending' || o.status === 'expired').slice(0,5).map(o => (
              <tr key={o.id}>
                <td><span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: '#3B82F6', fontWeight: 600 }}>{o.id}</span></td>
                <td style={{ fontWeight: 500 }}>{o.customer}</td>
                <td style={{ color: '#64748b', maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{o.address}</td>
                <td><Badge status={o.status} /></td>
                <td style={{ color: '#64748b', fontSize: 12 }}>{o.created}</td>
                <td>
                  <div style={{ display: 'flex', gap: 6 }}>
                    <button className="btn btn-success btn-sm">{Icon.check} Duyệt</button>
                    <button className="btn btn-outline btn-sm" style={{ color: '#EF4444', borderColor: '#FCA5A5' }}>{Icon.x} Từ chối</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
export default DashboardScreen

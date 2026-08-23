import {
  ResponsiveContainer, BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend,
  AreaChart, Area
} from 'recharts'
import { WEEKLY_DATA, STATION_PERF, TREND_DATA } from '../mockData'
import { Icon } from '../components/Icons'

export function ReportsScreen() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* KPI stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }}>
        <div className="card" style={{ padding: 16 }}>
          <div style={{ fontSize: 12, color: '#64748b', marginBottom: 4 }}>Hiệu suất bay bình quân</div>
          <div style={{ fontSize: 24, fontWeight: 700, color: '#10B981' }}>94.2%</div>
          <div style={{ fontSize: 11, color: '#64748b', marginTop: 4 }}>Dựa trên 1,240 chuyến bay tháng này</div>
        </div>
        <div className="card" style={{ padding: 16 }}>
          <div style={{ fontSize: 12, color: '#64748b', marginBottom: 4 }}>Thời gian giao trung bình</div>
          <div style={{ fontSize: 24, fontWeight: 700, color: '#1E3A5F' }}>14.5 phút</div>
          <div style={{ fontSize: 11, color: '#64748b', marginTop: 4 }}>Giảm 1.2 phút so với tháng trước</div>
        </div>
        <div className="card" style={{ padding: 16 }}>
          <div style={{ fontSize: 12, color: '#64748b', marginBottom: 4 }}>Khoảng cách bay tích lũy</div>
          <div style={{ fontSize: 24, fontWeight: 700, color: '#3B82F6' }}>8,421 km</div>
          <div style={{ fontSize: 11, color: '#64748b', marginTop: 4 }}>Tổng cộng 4 trạm hoạt động</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        {/* Weekly throughput */}
        <div className="card" style={{ padding: 20 }}>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 15, color: '#1e293b', marginBottom: 16 }}>Sản lượng giao nhận theo tuần</div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={WEEKLY_DATA} barSize={16}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Bar dataKey="completed" name="Giao thành công" fill="#10B981" radius={[3,3,0,0]} />
              <Bar dataKey="failed" name="Giao thất bại" fill="#EF4444" radius={[3,3,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Station Performance */}
        <div className="card" style={{ padding: 20 }}>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 15, color: '#1e293b', marginBottom: 16 }}>Tỷ lệ bay thành công theo trạm</div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={STATION_PERF} layout="vertical" barSize={12}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis dataKey="name" type="category" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
              <Bar dataKey="success" name="Tỷ lệ thành công (%)" fill="#3B82F6" radius={[0,3,3,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Trend chart */}
      <div className="card" style={{ padding: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 15, color: '#1e293b' }}>Biểu đồ tăng trưởng đơn hàng (30 ngày qua)</div>
          <button className="btn btn-outline btn-sm">{Icon.download} Xuất báo cáo CSV</button>
        </div>
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={TREND_DATA}>
            <defs>
              <linearGradient id="colorO" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.2}/>
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="date" tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
            <Area type="monotone" dataKey="orders" name="Tổng đơn đặt" stroke="#3B82F6" strokeWidth={2} fillOpacity={1} fill="url(#colorO)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
export default ReportsScreen

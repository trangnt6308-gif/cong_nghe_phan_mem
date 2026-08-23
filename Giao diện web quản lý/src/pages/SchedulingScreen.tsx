import { useState } from 'react'
import { Badge } from '../components/Badges'
import { Icon } from '../components/Icons'
import { ORDERS, STATIONS } from '../mockData'

interface SchedulingScreenProps {
  showToast: (msg: string, type: 'success' | 'error' | 'info') => void
}

export function SchedulingScreen({ showToast }: SchedulingScreenProps) {
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null)
  const [station, setStation] = useState('STN-01')
  const [droneType, setDroneType] = useState('standard')

  const schedulerOrders = ORDERS.filter(o => o.status === 'approved')

  const handleScheduleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedOrder) return
    showToast(`Đã xếp lịch đơn hàng ${selectedOrder} bằng Drone ${droneType} phát từ ${STATIONS.find(s => s.id === station)?.name || station}`, 'success')
    setSelectedOrder(null)
  }

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 16 }}>
        {/* Available Approved Orders */}
        <div className="card" style={{ padding: 20 }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 650, fontSize: 16, color: '#1e293b', marginBottom: 12 }}>Đơn hàng chờ xếp lịch giao</h3>
          {schedulerOrders.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 0', color: '#94a3b8', fontSize: 14 }}>
              Không có đơn hàng nào cần lập lịch tại thời điểm này.
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {schedulerOrders.map(o => (
                <div key={o.id} onClick={() => setSelectedOrder(o.id)} style={{
                  padding: 12, borderRadius: 10, border: '1px solid', cursor: 'pointer', transition: 'all 0.2s',
                  background: selectedOrder === o.id ? '#EFF6FF' : 'white',
                  borderColor: selectedOrder === o.id ? '#3B82F6' : '#e2e8f0',
                  boxShadow: selectedOrder === o.id ? '0 4px 6px -1px rgba(59,130,246,0.1)' : 'none',
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 600, color: '#3B82F6' }}>{o.id}</span>
                    <Badge status={o.status} />
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 550, color: '#374151' }}>{o.customer}</div>
                  <div style={{ fontSize: 12, color: '#64748b', marginTop: 2 }}>{o.address}</div>
                  <div style={{ display: 'flex', gap: 12, fontSize: 11, color: '#94a3b8', marginTop: 6, borderTop: '1px dashed #f1f5f9', paddingTop: 6 }}>
                    <span>Cân nặng: <b>{o.weight}</b></span>
                    <span>Hạn: <b>{o.created}</b></span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Schedule Form */}
        <div className="card" style={{ padding: 20 }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 650, fontSize: 16, color: '#1e293b', marginBottom: 12 }}>Cấu hình thiết bị giao</h3>
          {selectedOrder ? (
            <form onSubmit={handleScheduleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ padding: 10, background: '#f8fafc', borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 13 }}>
                <span style={{ color: '#64748b' }}>Đơn hàng chọn:</span>
                <div style={{ fontWeight: 600, color: '#1e293b', marginTop: 2, fontFamily: 'var(--font-mono)' }}>{selectedOrder}</div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 605, color: '#374151', marginBottom: 4 }}>Chọn trạm phát</label>
                <select className="input" value={station} onChange={e => setStation(e.target.value)}>
                  {STATIONS.filter(s => s.status === 'active').map(s => (
                    <option key={s.id} value={s.id}>{s.name} ({s.current}/{s.capacity} drone rảnh)</option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 605, color: '#374151', marginBottom: 4 }}>Chọn loại Drone</label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, cursor: 'pointer', padding: '6px 10px', borderRadius: 8, border: '1px solid #e2e8f0' }}>
                    <input type="radio" name="drone" checked={droneType === 'standard'} onChange={() => setDroneType('standard')} />
                    <div>
                      <div>Standard Drone (Tải tối đa: 3kg)</div>
                      <div style={{ fontSize: 10, color: '#94a3b8' }}>Pin: 35 phút bay • Bán kính 8km</div>
                    </div>
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, cursor: 'pointer', padding: '6px 10px', borderRadius: 8, border: '1px solid #e2e8f0' }}>
                    <input type="radio" name="drone" checked={droneType === 'heavy'} onChange={() => setDroneType('heavy')} />
                    <div>
                      <div>Heavy-Duty Drone (Tải tối đa: 8kg)</div>
                      <div style={{ fontSize: 10, color: '#94a3b8' }}>Pin: 45 phút bay • Bán kính 12km</div>
                    </div>
                  </label>
                </div>
              </div>

              <button className="btn btn-primary" type="submit" style={{ justifyContent: 'center', marginTop: 8 }}>
                {Icon.calendar} Xếp lịch bay
              </button>
            </form>
          ) : (
            <div style={{ textAlign: 'center', padding: '60px 0', color: '#94a3b8', fontSize: 13 }}>
              Vui lòng chọn đơn hàng ở danh sách bên trái để thiết lập thiết bị và trạm giao.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
export default SchedulingScreen

import { useState, useEffect } from 'react'
import { DRONES } from '../mockData'
import { Icon } from '../components/Icons'
import { Badge } from '../components/Badges'

export function TrackingScreen() {
  const [selectedDrone, setSelectedDrone] = useState<string | null>(null)
  const [tick, setTick] = useState(0)

  // Simulation: Move drones slightly every 5 seconds to simulate real-time tracking
  useEffect(() => {
    const t = setInterval(() => {
      setTick(p => p + 1)
    }, 5000)
    return () => clearInterval(t)
  }, [])

  // Generate slightly adjusted coordinates based on tick
  const simulatedDrones = DRONES.map((d, index) => {
    const offset = Math.sin(tick + index) * 2
    return {
      ...d,
      x: Math.min(95, Math.max(5, d.x + offset)),
      y: Math.min(95, Math.max(5, d.y + offset)),
    }
  })

  const activeDrone = simulatedDrones.find(d => d.id === selectedDrone) || simulatedDrones[0]

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 16, height: 'calc(100vh - 120px)' }}>
      {/* Simulation Map */}
      <div className="card" style={{ padding: 12, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '0 8px 8px', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 650, fontSize: 15, color: '#1e293b' }}>Bản đồ giám sát không phận thời gian thực</h3>
            <span style={{ fontSize: 11, color: '#22c55e' }}>● Hệ thống đang nhận dữ liệu từ telemetry trạm</span>
          </div>
          <span style={{ fontSize: 11, background: '#f8fafc', padding: '4px 8px', borderRadius: 6, color: '#64748b' }}>Cập nhật tự động (5s)</span>
        </div>

        {/* Map Grid container */}
        <div style={{
          flex: 1, background: '#EFF6FF', position: 'relative', marginTop: 12, borderRadius: 10,
          border: '1px solid #dbeafe', overflow: 'hidden',
          backgroundImage: 'radial-gradient(#93c5fd 0.75px, transparent 0.75px), radial-gradient(#93c5fd 0.75px, #eff6ff 0.75px)',
          backgroundSize: '24px 24px', backgroundPosition: '0 0, 12px 12px',
        }}>
          {/* Radial radar scanning ring */}
          <div style={{
            position: 'absolute', width: 280, height: 280, border: '1px dashed rgba(59,130,246,0.3)',
            borderRadius: '50%', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', pointerEvents: 'none',
          }} />
          <div style={{
            position: 'absolute', width: 140, height: 140, border: '1px dashed rgba(59,130,246,0.2)',
            borderRadius: '50%', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', pointerEvents: 'none',
          }} />

          {/* Drones on Map */}
          {simulatedDrones.map(d => {
            const isSel = d.id === (selectedDrone || simulatedDrones[0].id)
            return (
              <div
                key={d.id}
                onClick={() => setSelectedDrone(d.id)}
                style={{
                  position: 'absolute', left: `${d.x}%`, top: `${d.y}%`,
                  transform: 'translate(-50%, -50%)', cursor: 'pointer', zIndex: isSel ? 20 : 10,
                  display: 'flex', flexDirection: 'column', alignItems: 'center',
                }}
              >
                {/* Ping wave */}
                {isSel && (
                  <span style={{
                    position: 'absolute', width: 26, height: 26, background: 'rgba(59,130,246,0.4)',
                    borderRadius: '50%', animation: 'ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite',
                  }} />
                )}
                {/* Drone Icon pin */}
                <div style={{
                  width: 22, height: 22, borderRadius: '50%',
                  background: d.status === 'issue' ? '#EF4444' : d.status === 'arriving' ? '#10B981' : '#3B82F6',
                  border: '2px solid white', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'white', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
                }}>
                  {Icon.drone}
                </div>
                <div style={{
                  background: 'rgba(15,23,42,0.85)', color: 'white', padding: '1px 5px', borderRadius: 4,
                  fontSize: 9, fontWeight: 600, marginTop: 2, pointerEvents: 'none', whiteSpace: 'nowrap',
                }}>
                  {d.id}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Side Details Panel */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {/* Telemetry info */}
        {activeDrone && (
          <div className="card" style={{ padding: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <h4 style={{ fontFamily: 'var(--font-display)', fontWeight: 650, fontSize: 14, color: '#1e293b' }}>Thông số Drone {activeDrone.id}</h4>
              <Badge status={activeDrone.status === 'issue' ? 'failed' : activeDrone.status === 'arriving' ? 'completed' : 'delivering'} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 13 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748b' }}>Đơn hàng quản lý</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 600, color: '#3B82F6' }}>{activeDrone.orderId}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748b' }}>Khách nhận</span>
                <span style={{ fontWeight: 550, color: '#1e293b' }}>{activeDrone.customer}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748b' }}>ETA dự kiến</span>
                <span style={{ fontWeight: 600, color: activeDrone.status === 'issue' ? '#EF4444' : '#10B981' }}>{activeDrone.eta}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748b' }}>GPS Telemetry</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#475569' }}>
                  {activeDrone.x.toFixed(2)}°N, {activeDrone.y.toFixed(2)}°E
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Drone checklists */}
        <div className="card" style={{ padding: 16, flex: 1, overflowY: 'auto' }}>
          <h4 style={{ fontFamily: 'var(--font-display)', fontWeight: 650, fontSize: 14, color: '#1e293b', marginBottom: 10 }}>Danh sách thiết bị (Drone Fleet)</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {simulatedDrones.map(d => (
              <div
                key={d.id}
                onClick={() => setSelectedDrone(d.id)}
                style={{
                  padding: 8, borderRadius: 8, border: '1px solid', cursor: 'pointer', transition: 'all 0.15s',
                  background: (selectedDrone || simulatedDrones[0].id) === d.id ? '#F1F5F9' : 'white',
                  borderColor: (selectedDrone || simulatedDrones[0].id) === d.id ? '#cbd5e1' : '#e2e8f0',
                  display: 'flex', alignItems: 'center', gap: 10,
                }}
              >
                <div style={{
                  width: 8, height: 8, borderRadius: '50%',
                  background: d.status === 'issue' ? '#EF4444' : d.status === 'arriving' ? '#10B981' : '#3B82F6',
                }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: 12, color: '#1e293b' }}>{d.id}</div>
                  <div style={{ fontSize: 10, color: '#94a3b8' }}>Đơn: {d.orderId}</div>
                </div>
                <span style={{ fontSize: 11, fontWeight: 550, color: d.status === 'issue' ? '#EF4444' : '#475569' }}>{d.eta}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
export default TrackingScreen

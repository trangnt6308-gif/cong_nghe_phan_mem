import { useState } from 'react'
import { STATIONS } from '../mockData'
import { Icon } from '../components/Icons'

interface StationsScreenProps {
  showToast: (msg: string, type: 'success' | 'error' | 'info') => void
}

export function StationsScreen({ showToast }: StationsScreenProps) {
  const [search, setSearch] = useState('')
  const [showAdd, setShowAdd] = useState(false)
  const [showDelete, setShowDelete] = useState<string | null>(null)
  const [stationName, setStationName] = useState('')
  const [capacity, setCapacity] = useState('6')

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!stationName) return
    setShowAdd(false)
    showToast(`Đã thêm mới đề xuất trạm: "${stationName}" (Mã: STN-${Math.floor(Math.random() * 90 + 10)}). Chờ duyệt vị trí tọa độ.`, 'success')
    setStationName('')
  }

  const handleDeleteConfirm = () => {
    if (!showDelete) return
    setShowDelete(null)
    showToast(`Đã ngừng hoạt động và xóa thông tin trạm ${showDelete} khỏi hệ thống vận hành.`, 'info')
  }

  const filtered = STATIONS.filter(s => s.name.toLowerCase().includes(search.toLowerCase()) || s.district.toLowerCase().includes(search.toLowerCase()))

  return (
    <div>
      <div style={{ display: 'flex', gap: 12, marginBottom: 16, flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: 200 }}>
          <span style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }}>{Icon.search}</span>
          <input className="input" style={{ paddingLeft: 34 }} placeholder="Tìm trạm, tìm khu vực quận huyện..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <button className="btn btn-primary" onClick={() => setShowAdd(true)}>{Icon.plus} Thêm trạm hạ cánh</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }}>
        {filtered.map(s => {
          const percent = Math.min(100, Math.round((s.current / s.capacity) * 100))
          const isFull = s.current === s.capacity
          const stColor = s.status === 'active' ? '#10B981' : s.status === 'maintenance' ? '#F59E0B' : '#EF4444'
          const stLabel = s.status === 'active' ? 'Hoạt động' : s.status === 'maintenance' ? 'Bảo trì' : 'Tạm dừng'

          return (
            <div key={s.id} className="card" style={{ padding: 16, borderTop: `4px solid ${stColor}` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <div>
                  <h4 style={{ fontWeight: 650, fontSize: 15, color: '#1e293b' }}>{s.name}</h4>
                  <span style={{ fontSize: 11, color: '#94a3b8', fontFamily: 'var(--font-mono)' }}>{s.id}</span>
                </div>
                <span className="badge" style={{ background: `${stColor}15`, color: stColor }}>{stLabel}</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 13, color: '#475569', marginBottom: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Khu vực</span>
                  <span style={{ fontWeight: 550, color: '#1e293b' }}>{s.district}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Tọa độ</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11 }}>{s.lat}, {s.lng}</span>
                </div>
                <div style={{ marginTop: 4 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#64748b', marginBottom: 3 }}>
                    <span>Dung lượng Drone</span>
                    <span>{s.current}/{s.capacity} chiếc ({percent}%)</span>
                  </div>
                  <div style={{ height: 6, background: '#f1f5f9', borderRadius: 3, overflow: 'hidden' }}>
                    <div style={{ height: '100%', background: isFull ? '#EF4444' : '#3B82F6', width: `${percent}%`, borderRadius: 3 }} />
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 8, borderTop: '1px solid #f1f5f9', paddingTop: 10, justifyContent: 'flex-end' }}>
                <button className="btn btn-outline btn-sm">{Icon.edit} Sửa</button>
                <button className="btn btn-outline btn-sm" style={{ color: '#EF4444', borderColor: '#FCA5A5' }} onClick={() => setShowDelete(s.id)}>{Icon.trash} Xóa</button>
              </div>
            </div>
          )
        })}
      </div>

      {/* Modal Add Station */}
      {showAdd && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(15,23,42,0.4)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ background: 'white', borderRadius: 16, padding: '24px 20px', width: '105%', maxWidth: 420, boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 17, color: '#1e293b', marginBottom: 12 }}>Đăng ký trạm hạ cánh mới</h3>
            <form onSubmit={handleAddSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 605, color: '#374151', marginBottom: 4 }}>Tên trạm</label>
                <input className="input" placeholder="Ví dụ: Trạm Quận 10..." value={stationName} onChange={e => setStationName(e.target.value)} required />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 605, color: '#374151', marginBottom: 4 }}>Quận Huyện</label>
                  <input className="input" placeholder="Ví dụ: Quận 10..." required />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 605, color: '#374151', marginBottom: 4 }}>Sức chứa (drones)</label>
                  <input className="input" type="number" value={capacity} onChange={e => setCapacity(e.target.value)} required />
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 8 }}>
                <button className="btn btn-outline btn-sm" type="button" onClick={() => setShowAdd(false)}>Hủy</button>
                <button className="btn btn-primary btn-sm" type="submit">Xác nhận tạo đề xuất</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Confirm Delete */}
      {showDelete && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(15,23,42,0.4)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ background: 'white', borderRadius: 16, padding: '24px 20px', width: '100%', maxWidth: 400, boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 17, color: '#1e293b', marginBottom: 8 }}>Ngừng hoạt động trạm</h3>
            <p style={{ fontSize: 14, color: '#64748b', lineHeight: 1.5, marginBottom: 16 }}>
              Bạn có chắc muốn xóa và tạm ngưng vận hành trạm <b>{showDelete}</b>? Việc này có thể ảnh hưởng đến lộ trình các chuyến bay đang hoạt động.
            </p>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
              <button className="btn btn-outline btn-sm" onClick={() => setShowDelete(null)}>Hủy</button>
              <button className="btn btn-sm" style={{ background: '#EF4444', color: 'white', border: 'none' }} onClick={handleDeleteConfirm}>Xác nhận dừng hoạt động</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
export default StationsScreen

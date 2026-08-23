import { useState } from 'react'
import { Badge } from '../components/Badges'
import { Icon } from '../components/Icons'

interface StationOpsScreenProps {
  showToast: (msg: string, type: 'success' | 'error' | 'info') => void
}

export function StationOpsScreen({ showToast }: StationOpsScreenProps) {
  const [scanCode, setScanCode] = useState('')
  const [cargoWeight, setCargoWeight] = useState('')
  const [loading, setLoading] = useState(false)

  const handleScanSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!scanCode) return
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      showToast(`Đã nhận diện đơn ${scanCode.toUpperCase()}. Hàng chuẩn khớp, sẵn sàng đưa lên bệ phóng.`, 'success')
      setScanCode('')
      setCargoWeight('')
    }, 1000)
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 16 }}>
      {/* Station Status Overview */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div className="card" style={{ padding: 20 }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 650, fontSize: 16, color: '#1e293b', marginBottom: 12 }}>Thông số hoạt động trạm hiện hành</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12 }}>
            <div style={{ padding: 12, background: '#f8fafc', borderRadius: 8, textAlign: 'center' }}>
              <div style={{ fontSize: 12, color: '#64748b' }}>Bệ phóng trống</div>
              <div style={{ fontSize: 24, fontWeight: 700, color: '#1E3A5F', marginTop: 4 }}>3 / 4</div>
            </div>
            <div style={{ padding: 12, background: '#f8fafc', borderRadius: 8, textAlign: 'center' }}>
              <div style={{ fontSize: 12, color: '#64748b' }}>Drone đang sạc</div>
              <div style={{ fontSize: 24, fontWeight: 700, color: '#F59E0B', marginTop: 4 }}>2</div>
            </div>
            <div style={{ padding: 12, background: '#f8fafc', borderRadius: 8, textAlign: 'center' }}>
              <div style={{ fontSize: 12, color: '#64748b' }}>Đã phóng sạch</div>
              <div style={{ fontSize: 24, fontWeight: 700, color: '#10B981', marginTop: 4 }}>14 đơn</div>
            </div>
          </div>
        </div>

        {/* Scan Barcode / Input Area */}
        <div className="card" style={{ padding: 20 }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 650, fontSize: 16, color: '#1e293b', marginBottom: 12 }}>Nhận diện & Quét mã vạch kiện hàng</h3>
          <form onSubmit={handleScanSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 140px', gap: 12 }}>
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 605, color: '#374151', marginBottom: 4 }}>Quét hoặc Nhập mã đơn hàng</label>
                <input className="input" placeholder="Ví dụ: ORD-2024-001..." value={scanCode} onChange={e => setScanCode(e.target.value)} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 605, color: '#374151', marginBottom: 4 }}>Cân thực tế (kg)</label>
                <input className="input" placeholder="Ví dụ: 2.4" value={cargoWeight} onChange={e => setCargoWeight(e.target.value)} />
              </div>
            </div>
            <button className="btn btn-primary" type="submit" disabled={loading} style={{ justifyContent: 'center', marginTop: 6 }}>
              {loading ? 'Đang kiểm tra hóa đơn...' : 'Xác nhận kiểm kho & Đóng gói'}
            </button>
          </form>
        </div>
      </div>

      {/* Cargo confirmation list */}
      <div className="card" style={{ padding: 20 }}>
        <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 650, fontSize: 16, color: '#1e293b', marginBottom: 12 }}>Danh sách hàng chờ tại trạm phóng</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ padding: 10, border: '1px solid #e2e8f0', borderRadius: 8, fontSize: 13 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 600, color: '#3B82F6' }}>ORD-2024-005</span>
              <Badge status="approved" />
            </div>
            <div style={{ color: '#475569' }}>Cân nặng: 0.5kg • Bệ số 2</div>
            <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 4 }}>Trực vận hành: Nguyễn Thị Dung</div>
          </div>
          <div style={{ padding: 10, border: '1px solid #e2e8f0', borderRadius: 8, fontSize: 13, background: '#f8fafc', opacity: 0.7 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 600, color: '#64748b' }}>ORD-2024-003</span>
              <Badge status="completed" />
            </div>
            <div style={{ color: '#64748b' }}>Đã phóng lên không lúc 07:35</div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default StationOpsScreen

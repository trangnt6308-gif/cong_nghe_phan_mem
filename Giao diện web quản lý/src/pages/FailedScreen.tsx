import { useState } from 'react'
import { Badge } from '../components/Badges'
import { Icon } from '../components/Icons'
import { ORDERS } from '../mockData'

interface FailedScreenProps {
  showToast: (msg: string, type: 'success' | 'error' | 'info') => void
}

export function FailedScreen({ showToast }: FailedScreenProps) {
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null)
  const [action, setAction] = useState('retry')
  const [reason, setReason] = useState('battery')

  const failedOrders = ORDERS.filter(o => o.status === 'failed')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedOrder) return
    const actionTxt = action === 'retry' ? 'Đã lập lịch giao lại' : action === 'cancel' ? 'Đã hủy đơn hàng' : 'Đã kết nối điện thoại liên hệ'
    showToast(`${actionTxt} ${selectedOrder}. Lý do sự cố gốc: ${reason === 'battery' ? 'Pin yếu' : reason === 'wind' ? 'Gió mạnh' : 'Lỗi định vị'}`, 'info')
    setSelectedOrder(null)
  }

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 16 }}>
        {/* Failed Orders */}
        <div className="card" style={{ padding: 20 }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 650, fontSize: 16, color: '#1e293b', marginBottom: 12 }}>Đơn hàng giao thất bại / sự cố</h3>
          {failedOrders.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 0', color: '#94a3b8', fontSize: 14 }}>
              Không có sự cố giao hàng nào cần xử lý.
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {failedOrders.map(o => (
                <div key={o.id} onClick={() => setSelectedOrder(o.id)} style={{
                  padding: 12, borderRadius: 10, border: '1px solid', cursor: 'pointer', transition: 'all 0.2s',
                  background: selectedOrder === o.id ? '#FEF2F2' : 'white',
                  borderColor: selectedOrder === o.id ? '#EF4444' : '#e2e8f0',
                  boxShadow: selectedOrder === o.id ? '0 4px 6px -1px rgba(239,68,68,0.1)' : 'none',
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 600, color: '#EF4444' }}>{o.id}</span>
                    <Badge status={o.status} />
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 550, color: '#374151' }}>{o.customer}</div>
                  <div style={{ fontSize: 12, color: '#64748b', marginTop: 2 }}>{o.address}</div>
                  <div style={{ display: 'flex', gap: 12, fontSize: 11, color: '#94a3b8', marginTop: 6, borderTop: '1px dashed #f1f5f9', paddingTop: 6 }}>
                    <span>Trạm phát: <b>{o.station}</b></span>
                    <span>Hạn giao: <b>{o.created}</b></span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Action Panel */}
        <div className="card" style={{ padding: 20 }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 650, fontSize: 16, color: '#1e293b', marginBottom: 12 }}>Hướng xử lý sự cố</h3>
          {selectedOrder ? (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ padding: 10, background: '#FEF2F2', borderRadius: 8, border: '1px solid #FCA5A5', fontSize: 13 }}>
                <span style={{ color: '#B91C1C', fontWeight: 600 }}>Sự cố đơn:</span>
                <div style={{ fontWeight: 700, color: '#1e293b', marginTop: 2, fontFamily: 'var(--font-mono)' }}>{selectedOrder}</div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 605, color: '#374151', marginBottom: 4 }}>Nguyên nhân lỗi</label>
                <select className="input" value={reason} onChange={e => setReason(e.target.value)}>
                  <option value="battery">Drone hết pin trước khi tới đích (Pin &lt; 15%)</option>
                  <option value="wind">Tốc độ gió quá cao (&gt; 35km/h)</option>
                  <option value="gps">GPS mất kết nối hoặc sai lệch tọa độ</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 605, color: '#374151', marginBottom: 4 }}>Hành động khắc phục</label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, cursor: 'pointer', padding: '6px 10px', borderRadius: 8, border: '1px solid #e2e8f0' }}>
                    <input type="radio" name="failed_action" checked={action === 'retry'} onChange={() => setAction('retry')} />
                    <div>
                      <div>Lập lịch giao lại ngay lập tức</div>
                      <div style={{ fontSize: 10, color: '#94a3b8' }}>Chỉ định một Drone thay thế khác</div>
                    </div>
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, cursor: 'pointer', padding: '6px 10px', borderRadius: 8, border: '1px solid #e2e8f0' }}>
                    <input type="radio" name="failed_action" checked={action === 'cancel'} onChange={() => setAction('cancel')} />
                    <div>
                      <div>Hủy đơn hàng và hoàn tiền</div>
                      <div style={{ fontSize: 10, color: '#94a3b8' }}>Hoàn trả hàng về kho trạm</div>
                    </div>
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, cursor: 'pointer', padding: '6px 10px', borderRadius: 8, border: '1px solid #e2e8f0' }}>
                    <input type="radio" name="failed_action" checked={action === 'contact'} onChange={() => setAction('contact')} />
                    <div>
                      <div>Liên hệ trực tiếp khách hàng</div>
                      <div style={{ fontSize: 10, color: '#94a3b8' }}>Điều phối viên gọi điện hỗ trợ địa chỉ</div>
                    </div>
                  </label>
                </div>
              </div>

              <button className="btn btn-primary" type="submit" style={{ justifyContent: 'center', marginTop: 8 }}>
                {Icon.check} Thực thi hướng xử lý
              </button>
            </form>
          ) : (
            <div style={{ textAlign: 'center', padding: '60px 0', color: '#94a3b8', fontSize: 13 }}>
              Vui lòng chọn đơn hàng lỗi bên trái để cấu hình hướng giải quyết.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
export default FailedScreen

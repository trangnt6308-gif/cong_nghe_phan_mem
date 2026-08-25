import { useState } from 'react'
import { Badge } from '../components/Badges'
import { Icon } from '../components/Icons'
import { ORDERS } from '../mockData'

interface OrdersScreenProps {
  onDetail: () => void
}

export function OrdersScreen({ onDetail }: OrdersScreenProps) {
  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [page, setPage] = useState(1)
  const perPage = 6

  const filtered = ORDERS.filter(o => {
    const matchSearch = o.id.toLowerCase().includes(search.toLowerCase()) || o.customer.toLowerCase().includes(search.toLowerCase())
    const matchStatus = filterStatus === 'all' || o.status === filterStatus
    return matchSearch && matchStatus
  })
  const paged = filtered.slice((page - 1) * perPage, page * perPage)
  const totalPages = Math.ceil(filtered.length / perPage)

  return (
    <div>
      <div style={{ display: 'flex', gap: 12, marginBottom: 16, flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: 220 }}>
          <span style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }}>{Icon.search}</span>
          <input className="input" style={{ paddingLeft: 34 }} placeholder="Tìm mã đơn, tên khách hàng..." value={search} onChange={e => { setSearch(e.target.value); setPage(1) }} />
        </div>
        <select className="input" style={{ width: 160 }} value={filterStatus} onChange={e => { setFilterStatus(e.target.value); setPage(1) }}>
          <option value="all">Tất cả trạng thái</option>
          <option value="pending">Chờ duyệt</option>
          <option value="approved">Đã duyệt</option>
          <option value="delivering">Đang giao</option>
          <option value="completed">Hoàn tất</option>
          <option value="failed">Thất bại</option>
          <option value="expired">Quá hạn</option>
        </select>
        <button className="btn btn-primary">{Icon.plus} Tạo đơn mới</button>
      </div>

      <div className="card" style={{ overflow: 'hidden' }}>
        <table className="data-table">
          <thead><tr>
            <th>Mã đơn</th><th>Khách hàng</th><th>Địa chỉ giao</th><th>Cân nặng</th><th>Trạm</th><th>Trạng thái</th><th>Ngày tạo</th><th>Hành động</th>
          </tr></thead>
          <tbody>
            {paged.map(o => (
              <tr key={o.id}>
                <td><span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: '#3B82F6', fontWeight: 600 }}>{o.id}</span></td>
                <td style={{ fontWeight: 500 }}>{o.customer}</td>
                <td style={{ color: '#64748b', maxWidth: 180, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{o.address}</td>
                <td style={{ color: '#64748b' }}>{o.weight}</td>
                <td style={{ fontSize: 12, color: '#64748b' }}>{o.station}</td>
                <td><Badge status={o.status} /></td>
                <td style={{ color: '#64748b', fontSize: 12 }}>{o.created}</td>
                <td>
                  <div style={{ display: 'flex', gap: 4 }}>
                    <button className="btn btn-ghost btn-sm" onClick={onDetail} title="Xem chi tiết">{Icon.eye}</button>
                    {o.status === 'pending' && <>
                      <button className="btn btn-success btn-sm" title="Duyệt">{Icon.check}</button>
                      <button className="btn btn-outline btn-sm" style={{ color: '#EF4444', borderColor: '#FCA5A5' }} title="Từ chối">{Icon.x}</button>
                    </>}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ padding: '12px 20px', borderTop: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: 13, color: '#64748b' }}>Hiển thị {paged.length}/{filtered.length} đơn hàng</div>
          <div style={{ display: 'flex', gap: 6 }}>
            {Array.from({ length: totalPages }, (_, i) => (
              <button key={i} onClick={() => setPage(i + 1)} style={{
                width: 30, height: 30, borderRadius: 6, border: '1px solid', cursor: 'pointer',
                background: page === i + 1 ? '#3B82F6' : 'white',
                color: page === i + 1 ? 'white' : '#374151',
                borderColor: page === i + 1 ? '#3B82F6' : '#e2e8f0',
                fontSize: 13, fontWeight: 600,
              }}>{i + 1}</button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
export default OrdersScreen

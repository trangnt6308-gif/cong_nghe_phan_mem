import { useState } from 'react'
import { USERS } from '../mockData'
import { Icon } from '../components/Icons'
import { RoleBadge } from '../components/Badges'

interface UsersScreenProps {
  showToast: (msg: string, type: 'success' | 'error' | 'info') => void
}

export function UsersScreen({ showToast }: UsersScreenProps) {
  const [search, setSearch] = useState('')
  const [showAdd, setShowAdd] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('dispatcher')

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !email) return
    setShowAdd(false)
    showToast(`Đã thêm mới tài khoản thành viên: ${name} (${email}) với vai trò ${role.toUpperCase()}`, 'success')
    setName('')
    setEmail('')
  }

  const filtered = USERS.filter(u => u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()))

  return (
    <div>
      <div style={{ display: 'flex', gap: 12, marginBottom: 16, flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: 200 }}>
          <span style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }}>{Icon.search}</span>
          <input className="input" style={{ paddingLeft: 34 }} placeholder="Tìm thành viên, email..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <button className="btn btn-primary" onClick={() => setShowAdd(true)}>{Icon.plus} Đăng ký thành viên</button>
      </div>

      <div className="card" style={{ overflow: 'hidden' }}>
        <table className="data-table">
          <thead><tr>
            <th>Mã</th><th>Thành viên</th><th>Địa chỉ Email</th><th>Vai trò</th><th>Ngày tạo</th><th>Trạng thái</th><th>Hành động</th>
          </tr></thead>
          <tbody>
            {filtered.map(u => (
              <tr key={u.id}>
                <td><span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: '#64748b' }}>#{u.id}</span></td>
                <td style={{ fontWeight: 550, color: '#1e293b' }}>{u.name}</td>
                <td style={{ color: '#64748b', fontFamily: 'var(--font-mono)', fontSize: 13 }}>{u.email}</td>
                <td><RoleBadge role={u.role} /></td>
                <td style={{ color: '#64748b', fontSize: 12 }}>{u.created}</td>
                <td>
                  <span className={`badge ${u.status === 'active' ? 'badge-success' : 'badge-danger'}`} style={{
                    background: u.status === 'active' ? '#F0FDF4' : '#FEF2F2',
                    color: u.status === 'active' ? '#15803D' : '#B91C1C',
                  }}>
                    {u.status === 'active' ? 'Đang hoạt động' : 'Tạm khóa'}
                  </span>
                </td>
                <td>
                  <div style={{ display: 'flex', gap: 4 }}>
                    <button className="btn btn-ghost btn-sm" title="Chỉnh sửa">{Icon.edit}</button>
                    {u.status === 'active' ? (
                      <button className="btn btn-ghost btn-sm" style={{ color: '#EF4444' }} title="Khóa tài khoản">{Icon.lock}</button>
                    ) : (
                      <button className="btn btn-ghost btn-sm" style={{ color: '#10B981' }} title="Mở khóa tài khoản">{Icon.unlock}</button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showAdd && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(15,23,42,0.4)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ background: 'white', borderRadius: 16, padding: '24px 20px', width: '100%', maxWidth: 400, boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 17, color: '#1e293b', marginBottom: 12 }}>Đăng ký tài khoản điều hành</h3>
            <form onSubmit={handleAddSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 605, color: '#374151', marginBottom: 4 }}>Họ và tên</label>
                <input className="input" placeholder="Ví dụ: Nguyễn Văn A..." value={name} onChange={e => setName(e.target.value)} required />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 605, color: '#374151', marginBottom: 4 }}>Email</label>
                <input className="input" type="email" placeholder="example@smartdrone.vn" value={email} onChange={e => setEmail(e.target.value)} required />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 605, color: '#374151', marginBottom: 4 }}>Phân vai trò</label>
                <select className="input" value={role} onChange={e => setRole(e.target.value)}>
                  <option value="dispatcher">Dispatcher (Điều phối viên)</option>
                  <option value="operator">Operator (Vận hành trạm)</option>
                  <option value="manager">Manager (Quản lý hệ thống)</option>
                  <option value="admin">Admin (Quản trị viên)</option>
                </select>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 8 }}>
                <button className="btn btn-outline btn-sm" type="button" onClick={() => setShowAdd(false)}>Hủy</button>
                <button className="btn btn-primary btn-sm" type="submit">Đăng ký thành viên</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
export default UsersScreen

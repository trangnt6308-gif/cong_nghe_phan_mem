import { useState, useEffect } from 'react'
import * as API from './api'
import { Screen, Role, Toast } from './types'
import { ORDERS, STATIONS, USERS } from './mockData'

// Share components
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import ToastComp from './components/Toast'

// Page components
import LoginScreen from './pages/LoginScreen'
import DashboardScreen from './pages/DashboardScreen'
import OrdersScreen from './pages/OrdersScreen'
import OrderDetailScreen from './pages/OrderDetailScreen'
import SchedulingScreen from './pages/SchedulingScreen'
import FailedScreen from './pages/FailedScreen'
import StationOpsScreen from './pages/StationOpsScreen'
import TrackingScreen from './pages/TrackingScreen'
import StationsScreen from './pages/StationsScreen'
import ReportsScreen from './pages/ReportsScreen'
import AIEtaScreen from './pages/AIEtaScreen'
import UsersScreen from './pages/UsersScreen'
import ActivityLogScreen from './pages/ActivityLogScreen'

function mapRole(vaiTro?: string): Role {
  if (!vaiTro) return 'dispatcher'
  const v = vaiTro.toLowerCase()
  if (v.includes('admin') || v.includes('quản trị')) return 'admin'
  if (v.includes('dispatch') || v.includes('điều phối')) return 'dispatcher'
  if (v.includes('operator') || v.includes('vận hành')) return 'operator'
  if (v.includes('manager') || v.includes('quản lý')) return 'manager'
  return 'dispatcher'
}

export function App() {
  const [screen, setScreen] = useState<Screen>('login')
  const [role, setRole] = useState<Role>('dispatcher')
  const [currentUser, setCurrentUser] = useState<API.UserInfo | null>(null)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [toast, setToast] = useState<Toast | null>(null)

  // Real backend states
  const [apiOrders, setApiOrders] = useState<API.Order[]>([])
  const [apiStations, setApiStations] = useState<API.Station[]>([])
  const [apiUsers, setApiUsers] = useState<API.UserInfo[]>([])

  const showToast = (msg: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToast({ msg, type })
  }

  // Auto-login from localStorage token
  useEffect(() => {
    const token = localStorage.getItem('sdd_token') || ''
    const userStr = localStorage.getItem('sdd_user')
    if (token && userStr) {
      API.setToken(token)
      try {
        const u = JSON.parse(userStr) as API.UserInfo
        setCurrentUser(u)
        const mapped = mapRole(u.vai_tro?.ten_vai_tro)
        setRole(mapped)
        setScreen(mapped === 'operator' ? 'station-ops' : 'dashboard')
      } catch {
        // ignore
      }
    }
  }, [])

  // Combined fetch function
  const fetchAllData = async () => {
    try {
      const orders = await API.listOrders()
      setApiOrders(orders)
    } catch {
      // quiet fail
    }

    try {
      const stations = await API.listStations()
      setApiStations(stations)
    } catch {
      // quiet fail
    }

    if (role === 'admin') {
      try {
        const users = await API.listUsers()
        setApiUsers(users)
      } catch {
        // quiet fail
      }
    }
  }

  // Load backend data after successful login
  useEffect(() => {
    if (screen !== 'login') {
      void fetchAllData()
    }
  }, [screen, role])

  const handleLogin = (newRole: Role, user: API.UserInfo) => {
    setCurrentUser(user)
    setRole(newRole)
    setScreen(newRole === 'operator' ? 'station-ops' : 'dashboard')
    showToast(`Đăng nhập thành công! Chào mừng ${user.ho_ten}.`, 'success')
  }

  const handleLogout = () => {
    API.clearToken()
    setCurrentUser(null)
    setRole('dispatcher')
    setScreen('login')
  }

  // Merge real backend data with mock arrays in-place to support mock pages
  const mergedOrders = [...apiOrders.map(o => ({
    id: o.ma_don_hang,
    customer: o.ten_khach_hang || 'Ẩn danh',
    address: o.dia_chi_giao || '',
    weight: `${o.tong_trong_luong || 0} kg`,
    status: o.trang_thai || 'pending',
    created: o.created_at ? new Date(o.created_at).toLocaleString() : 'N/A',
    station: o.ten_tram || 'Chưa gán',
  })), ...ORDERS.filter(o => !apiOrders.some(ao => ao.ma_don_hang === o.id))]

  const mergedStations = [...apiStations.map(s => ({
    id: s.ma_tram,
    name: s.ten_tram,
    lat: `${s.vi_do || ''}°N`,
    lng: `${s.kinh_do || ''}°E`,
    capacity: s.suc_chua_toi_da || 5,
    current: s.so_drone_hien_tai || 0,
    status: s.trang_thai || 'active',
    district: s.quan_huyen || 'N/A',
  })), ...STATIONS.filter(s => !apiStations.some(as => as.ma_tram === s.id))]

  const mergedUsers = [...apiUsers.map(u => ({
    id: u.ma_nguoi_dung,
    name: u.ho_ten,
    email: u.email,
    role: mapRole(u.vai_tro?.ten_vai_tro),
    created: 'Khởi tạo',
    status: u.trang_thai || 'active',
  })), ...USERS.filter(u => !apiUsers.some(au => au.email === u.email))]

  // Replace mocks in-place for screens that read them directly
  if (apiOrders.length > 0) ORDERS.splice(0, ORDERS.length, ...mergedOrders)
  if (apiStations.length > 0) STATIONS.splice(0, STATIONS.length, ...mergedStations)
  if (apiUsers.length > 0) USERS.splice(0, USERS.length, ...mergedUsers)

  if (screen === 'login') {
    return <LoginScreen onLogin={handleLogin} />
  }

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', background: '#F8FAFC' }}>
      <Sidebar
        screen={screen}
        onNav={setScreen}
        role={role}
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(p => !p)}
      />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <Header screen={screen} role={role} onLogout={handleLogout} />

        <main style={{ flex: 1, overflowY: 'auto', padding: 24 }}>
          {screen === 'dashboard'    && <DashboardScreen onNav={setScreen} />}
          {screen === 'orders'       && <OrdersScreen onDetail={() => setScreen('order-detail')} />}
          {screen === 'order-detail' && <OrderDetailScreen onBack={() => setScreen('orders')} showToast={showToast} />}
          {screen === 'scheduling'   && <SchedulingScreen showToast={showToast} />}
          {screen === 'failed'       && <FailedScreen showToast={showToast} />}
          {screen === 'station-ops'  && <StationOpsScreen showToast={showToast} />}
          {screen === 'tracking'     && <TrackingScreen />}
          {screen === 'stations'     && <StationsScreen showToast={showToast} />}
          {screen === 'reports'      && <ReportsScreen />}
          {screen === 'ai-eta'       && <AIEtaScreen />}
          {screen === 'users'        && <UsersScreen showToast={showToast} />}
          {screen === 'activity-log' && <ActivityLogScreen />}
        </main>
      </div>

      {toast && <ToastComp toast={toast} onClose={() => setToast(null)} />}
    </div>
  )
}
export default App

// ─── API Service Layer ────────────────────────────────────────────────────────
// Kết nối với SmartDroneDelivery Backend (Flask, port 9999)

const BASE_URL = 'https://smartdronedelivery-api.onrender.com'

// ─── Token helpers ────────────────────────────────────────────────────────────
export function getToken(): string | null {
  return localStorage.getItem('sdd_token')
}

export function setToken(token: string): void {
  localStorage.setItem('sdd_token', token)
}

export function clearToken(): void {
  localStorage.removeItem('sdd_token')
  localStorage.removeItem('sdd_user')
}

function authHeaders(): HeadersInit {
  const token = getToken()
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  }
}

// ─── Generic fetch wrapper ────────────────────────────────────────────────────
async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: authHeaders(),
    ...options,
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    throw new Error(data?.error || `HTTP ${res.status}`)
  }
  return data as T
}

// ─── Auth ─────────────────────────────────────────────────────────────────────
export interface UserInfo {
  ma_nguoi_dung: string
  ho_ten: string
  email: string
  so_dien_thoai?: string
  trang_thai?: string
  vai_tro?: { ten_vai_tro: string }
  created_at?: string
}

export interface LoginResponse {
  user: UserInfo
  token: string
}

export async function login(email: string, password: string): Promise<LoginResponse> {
  return apiFetch<LoginResponse>('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  })
}

export async function listUsers(): Promise<UserInfo[]> {
  return apiFetch<UserInfo[]>('/auth/users')
}

// ─── Orders ───────────────────────────────────────────────────────────────────
export interface Order {
  ma_don_hang: string
  ma_khach_hang?: string
  ten_khach_hang?: string
  dia_chi_giao?: string
  trang_thai?: string
  created_at?: string
  tong_trong_luong?: number
  ma_tram_ha_canh?: string
  ten_tram?: string
}

export async function listOrders(): Promise<Order[]> {
  return apiFetch<Order[]>('/orders/')
}

export async function getOrder(id: string): Promise<Order> {
  return apiFetch<Order>(`/orders/${id}`)
}

export async function approveOrder(id: string): Promise<{ order: Order }> {
  return apiFetch<{ order: Order }>(`/orders/${id}/approve`, { method: 'POST' })
}

export async function rejectOrder(id: string, reason: string): Promise<{ order: Order; reason: string }> {
  return apiFetch(`/orders/${id}/reject`, {
    method: 'POST',
    body: JSON.stringify({ reason }),
  })
}

export async function scheduleOrder(
  id: string,
  payload: { ma_drone?: string; ma_nguoi_phu_trach?: string; thoi_gian_giao?: string }
): Promise<unknown> {
  return apiFetch(`/orders/${id}/schedule`, {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

// ─── Stations ─────────────────────────────────────────────────────────────────
export interface Station {
  ma_tram: string
  ten_tram: string
  vi_do?: string
  kinh_do?: string
  suc_chua_toi_da?: number
  so_drone_hien_tai?: number
  trang_thai?: string
  quan_huyen?: string
}

export async function listStations(): Promise<Station[]> {
  return apiFetch<Station[]>('/stations/')
}

// ─── Deliveries ───────────────────────────────────────────────────────────────
export interface Delivery {
  ma_giao_hang: string
  ma_don_hang: string
  trang_thai?: string
  thoi_gian_giao?: string
  ma_drone?: string
}

export async function listDeliveries(): Promise<Delivery[]> {
  return apiFetch<Delivery[]>('/deliveries/')
}

// ─── Drones ───────────────────────────────────────────────────────────────────
export interface Drone {
  ma_drone: string
  ten_drone?: string
  trang_thai?: string
  vi_do_hien_tai?: string
  kinh_do_hien_tai?: string
}

export async function listDrones(): Promise<Drone[]> {
  return apiFetch<Drone[]>('/drones/')
}

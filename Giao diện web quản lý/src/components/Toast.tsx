import { useEffect } from 'react'
import { Toast } from '../types'

interface ToastCompProps {
  toast: Toast
  onClose: () => void
}

export function ToastComp({ toast, onClose }: ToastCompProps) {
  useEffect(() => {
    const t = setTimeout(onClose, 4000)
    return () => clearTimeout(t)
  }, [onClose])

  const colors = {
    success: { bg: '#F0FDF4', color: '#15803D', border: '#86EFAC' },
    error:   { bg: '#FEF2F2', color: '#B91C1C', border: '#FCA5A5' },
    info:    { bg: '#EFF6FF', color: '#1D4ED8', border: '#93C5FD' },
  }

  const c = colors[toast.type]

  return (
    <div className="toast" style={{ background: c.bg, color: c.color, border: `1px solid ${c.border}` }}>
      <span>{toast.type === 'success' ? '✓' : toast.type === 'error' ? '✗' : 'ℹ'}</span>
      {toast.msg}
      <button onClick={onClose} style={{ marginLeft: 8, background: 'none', border: 'none', cursor: 'pointer', color: c.color, padding: 0, lineHeight: 1 }}>✕</button>
    </div>
  )
}
export default ToastComp

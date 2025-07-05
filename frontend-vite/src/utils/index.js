import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

export function toTitleCase(str) {
  return str
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

export function toSentenceCase(str) {
  return str.toLowerCase().split(' ').charAt(0).toUpperCase() + str.slice(1).join(' ')
}

export function toastExito(str) {
  return toast.success(str, {
    autoClose: 1000,
    position: toast.POSITION.TOP_RIGHT,
    theme: toast.THEME.COLORED,
  })
}
export function baseNormalizada() {
  const base = import.meta.env.VITE_PUBLIC_PATH || '/'
  const baseNormalizada = base.endsWith('/') ? base : base + '/'
  return baseNormalizada
}

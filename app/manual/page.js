import { redirect } from 'next/navigation'

export default function ManualIndex() {
  // /manual/ 접근 시 홈으로 리다이렉트
  redirect('/')
}

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    strictPort: true,    // 5173이 이미 사용 중이면 에러 내고 죽음 (충돌 방지)
    host: true           // 필요하면 0.0.0.0으로 외부접속 허용
  }
})
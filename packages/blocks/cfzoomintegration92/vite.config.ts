import { defineConfig } from 'vite'
import react from '../../blocks/core/node_modules/@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
})
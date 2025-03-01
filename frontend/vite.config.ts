import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@/vars': path.resolve(__dirname, 'src/styles/vars'),
            '@/components': path.resolve(__dirname, 'src/components'),
            '@/redux': path.resolve(__dirname, 'src/redux'),
        },
    },
    server: {
        proxy: {
            '/api': 'http://79.137.192.11:8000',
        },
    },
});

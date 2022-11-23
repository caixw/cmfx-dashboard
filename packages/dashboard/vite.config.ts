import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@dashboard': __dirname,
        },
    },
    build: {
        outDir: './lib',
        target: 'esnext',
        lib: {
            entry: path.resolve(__dirname, './index.ts'),
            formats: ['es'],
            name: 'cmfx-dashboard',
            fileName: (format) =>`cmfx-dashboard.${format}.js`
        },
        rollupOptions: {
            // 确保外部化处理那些你不想打包进库的依赖
            external: ['react', 'react-dom', '@douyinfe/semi-ui', '@douyinfe/semi-icons', '@semi-bot/semi-theme-a11y', 'react-router-dom'],
        }
    }
});

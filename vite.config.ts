import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),

            // 解决子包中的引用问题，需要与子包中的 @dashboard 指同相同的目录。
            '@dashboard': path.resolve(__dirname, './packages/dashboard'),

            // 对子包的真正引用，需要指定入口文件，这样 import 时才不会出错。
            'cmfx-dashboard': path.resolve(__dirname, './packages/dashboard/index.ts')
        },
    }
});

import { defineConfig } from 'vitest/config';
import path from 'path';
import viteConfig from "./vite.config";
import { mergeConfig } from "vite";

export default mergeConfig(
    viteConfig,
    defineConfig({
        test: {
            alias: [
                {find: /@douyinfe\/semi-ui$/, replacement: path.resolve(__dirname, '../../node_modules/@douyinfe/semi-ui/lib/es')},
                {find: '@douyinfe/semi-icons', replacement: path.resolve(__dirname, '../../node_modules/@douyinfe/semi-icons/lib/es')}
            ],
            setupFiles: [path.resolve(__dirname, './setup-test.ts')],
            environment: 'jsdom'
        }
    })
);

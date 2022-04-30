import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { join } from 'path';
import { VitePluginElectronBuilder } from './plugin';
import { compileFile } from 'bytenode';
import { writeFileSync } from 'fs';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import ElementPlus from 'unplugin-element-plus/vite';

// https://vitejs.dev/config/
export default defineConfig({
    root: join(__dirname, 'src/render'),
    plugins: [
        vue(),
        VitePluginElectronBuilder({
            root: process.cwd(),
            tsconfig: "./tsconfig.main.json",
            electronBuilderConfig: "./electron-builder.config.js",
            external: ['@nestjs'],
            afterEsbuildBuild: async () => {
                await compileFile({
                    filename: './dist/main/index.js',
                    output: './dist/main/main.jsc',
                    electron: true,
                });

                writeFileSync('./dist/main/index.js', "require('bytenode');require('./main.jsc')");
            },
        }),
    ],
    resolve: {
        alias: {
            '@render': join(__dirname, 'src/render'),
            '@main': join(__dirname, 'src/main'),
            '@common': join(__dirname, 'src/common'),
            '@libs': join(__dirname, 'libs'),
            '@assets': join(__dirname, 'src/main/assets'),
        },
    },
    base: './',
    build: {
        outDir: join(__dirname, 'dist/render'),
        emptyOutDir: true,
        // assetsDir: join(__dirname, 'dist/assets'),
    },
    server: {
        port: 6060,
    }
});

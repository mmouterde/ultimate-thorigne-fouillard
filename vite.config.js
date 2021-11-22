import {defineConfig} from 'vite'

export default defineConfig({
    build: {
        outDir: '..',
        rollupOptions: {
            output: {
                assetFileNames: '[name].[ext]',
            }
        },
    },
    root: 'src',
    server: {
        open: true,
        base: '/',
        port: 8888,
        fs: {strict: false}
    },

})

import {defineConfig} from 'vite'

export default defineConfig({
    root: 'src',
    build: {
        // 'docs' directory is defined in github page settings as root. (possible values are limited to '/' and '/docs')
        outDir: '../docs'
    },
    server: {
        open: true,
        base: '/',
        port: 8888,
        fs: {strict: false}
    },

})

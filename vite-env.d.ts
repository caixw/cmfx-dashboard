/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_MOCK: boolean
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}

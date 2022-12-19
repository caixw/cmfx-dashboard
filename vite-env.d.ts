/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_API_SERVER: string
    readonly VITE_MOCK?: boolean
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}

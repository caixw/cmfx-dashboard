/// <reference types="vite/client" />

declare module '*.vue' {
    import type { DefineComponent } from 'vue';

    // eslint-disable-next-line
    const component: DefineComponent<unknown, unknown, any>

    export default component;
}

import Vue from 'vue'
import { NuxtContext } from 'nuxt'

declare module 'vue/types/options' {
    interface ComponentOptions<V extends Vue> {
        layout?: string | ((args: NuxtContext) => string)
        fetch?(args: NuxtContext): Promise<any>
        head?: object | (() => object)
    }
}

declare module 'vue/types/vue' {
    interface Vue {}
    interface VueConstructor<V extends Vue> {}
}

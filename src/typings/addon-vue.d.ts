import Vue from 'vue'
import { Route } from 'vue-router'
import { NuxtContext } from 'nuxt'

declare module 'vue/types/options' {
    interface ComponentOptions<V extends Vue> {
        layout?: string | ((args: NuxtContext) => string)
        fetch?(args: NuxtContext): Promise<any>
        head?: object | (() => object)
        validate?: ((args: NuxtContext) => boolean) | ((args: NuxtContext) => Promise<boolean>)
    }
}

declare module 'vue/types/vue' {
    interface Vue {
        $route: Route
        $message: any
        $bus: CombinedVueInstance<Vue, object, object, object, Record<never, any>>
    }
    interface VueConstructor<V extends Vue> {}
}

import Vue from 'vue'

declare module 'vue/types/options' {
    interface ComponentOptions<V extends Vue> {
        layout?: string
    }
}

declare module 'vue/types/vue' {
    interface Vue {}
    interface VueConstructor<V extends Vue> {}
}

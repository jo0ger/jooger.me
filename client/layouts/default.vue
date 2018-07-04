<template>
    <div>
        <Header />
        <nuxt/>
    </div>
</template>

<script lang="ts">
import {
    Component,
    Vue
} from 'vue-property-decorator'
import {
    Header
} from '@/components/pc/index'

@Component({
    name: 'DefaultLayout',
    components: {
        Header
    }
})
export default class DefaultLayout extends Vue {

}
</script>

<style>


</style>

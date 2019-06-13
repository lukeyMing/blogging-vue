<template>
    <van-nav-bar  @click-right="onClickCross" class="border-none">
        <van-icon name="cross" slot="right"></van-icon>
    </van-nav-bar>
</template>

<script>
    import { NavBar,Icon} from 'vant'
    export default {
        name: 'CrossNav',
        data(){
            return {
                border: false
            }
        },
        components: {
            [NavBar.name]:NavBar,
            [Icon.name]:Icon,
        },
        methods: {
            onClickCross() {
                window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
            },
        }
    }
</script>
<style scoped>

</style>
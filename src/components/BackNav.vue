<template>
    <van-nav-bar :title="title" left-arrow @click-left="onClickBack">
    </van-nav-bar>
</template>

<script>
    import { NavBar,Icon} from 'vant'
    export default {
        data(){
            return {
                title: document.title
            }
        },
        name: 'BackNav',
        components: {
            [NavBar.name]:NavBar,
            [Icon.name]:Icon
        },
        methods: {
            onClickBack() {
                window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
            },
        }
    }
</script>
<template>
    <van-nav-bar :title="title"  @click-right="onClickSearch">
        <van-icon name="search" slot="right"></van-icon>
        <van-image  src="./assets/logo.png"></van-image>
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
        name: 'HeaderNav',
        components: {
            [NavBar.name]:NavBar,
            [Icon.name]:Icon,
        },
        methods: {
            onClickSearch() {
                // eslint-disable-next-line no-console
                console.log(document.title)
                this.$router.push('/search')
            },
        }
    }
</script>
<template>
    <van-nav-bar :title="title">
        <router-link to="/" slot="left" class="logo thumbnail" ><img src="../common/image/logo.png" alt="logo"/></router-link>
        <template v-if="user">
            <router-link to="/login"  slot="right" class="avatar thumbnail">
                <img v-if="user.avatar" class="border-circle" :src="user.avatar" alt="logo"/>
                <img  class="border-circle" src="../common/image/avatar.png" alt="logo" v-else />
            </router-link>
            <router-link slot="right" v-if="user" to="/admin" style="margin-left: 1em" ><van-button plain type="default" size="small">admin</van-button></router-link>
        </template>
        <template v-else>
            <router-link to="/login"  slot="right"><van-button plain type="default" size="small">Sign in</van-button></router-link>
        </template>
    </van-nav-bar>
</template>

<script>
    import {NavBar, Icon, Button} from 'vant'
    import { mapState, mapGetters} from 'vuex';
    export default {
        data() {
            return {
                title: document.title,
            }
        },
        name: 'HeaderNav',
        components: {
            [NavBar.name]: NavBar,
            [Icon.name]: Icon,
            [Button.name]: Button
        },
        computed: {
            ...mapState({
                user:"user"
            })
        },
        methods: {
            ...mapGetters({
                getUser: "getUser"
            }),
        }
    }
</script>

<style scoped>
    .logo, .avatar {
        width: 2.5em;
        height: 2.5em;
    }
</style>
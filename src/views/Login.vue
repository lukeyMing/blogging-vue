<template>
    <div class="login">
        <cross-nav></cross-nav>
        <header class="text-center mb-7">
            <h2 class="h4 mb-0">Welcome Back!</h2>
            <p>Login to manage your account.</p>
        </header>
        <van-cell-group class="form-group mb-4">
            <van-field  v-model="email" type="text"  placeholder="email"  left-icon="manager"></van-field>
            <van-field  v-model="password"  type="password" placeholder="password"  left-icon="lock"></van-field>
        </van-cell-group>

        <div class="form-group">
            <van-button type="danger"   block>Login</van-button>
        </div>
        <div class="form-group text-center">
            <span class="small text-muted">Do not have an account?</span>Signup
        </div>
    </div>
</template>

<script>
    import {Field, Icon, CellGroup, Row, Col, Button } from 'vant';
    import CrossNav from '../components/CrossNav';
    import {userLoginApi} from '../api/index'


    export default {
        name: 'login',
        data() {
            return {
                account: "",
                password:"",
                type:"email",
            }
        },
        components: {
            [Field.name]: Field,
            [Icon.name]: Icon,
            [CellGroup.name]: CellGroup,
            [Row.name]: Row,
            [Col.name]: Col,
            [CrossNav.name]: CrossNav,
            [Button.name]: Button,
        },
        methods: {
            userLogin(){
                userLoginApi(this.account, this.password, this.type).then((res) => {
                    
                });
            }
        }
    }
</script>

<style scoped>
 .login{
     max-width: 400px;
     margin: 0 auto;
 }
</style>
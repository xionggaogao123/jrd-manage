<template>
    <div class="login_page fillcontain">
        <transition name="form-fade" mode="in-out">
            <section class="form_contianer" v-show="showLogin">
                <div class="manage_tip">
                    <p>君融贷全国难友联盟</p>
                </div>
                <el-form :model="loginForm" :rules="loginRules" ref="loginForm" v-if="loginOrRegister">
                    <el-form-item prop="name">
                        <el-input v-model="loginForm.name" placeholder="用户名"><span>dsfsf</span></el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input type="password" placeholder="密码" v-model="loginForm.password"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="login('loginForm')" class="submit_btn">登陆</el-button>
                    </el-form-item>
                    <p class="registered"><span @click="loginOrRegister = !loginOrRegister">去注册</span></p>
                </el-form>
                <el-form :model="registerForm" :rules="registerRules" ref="registerForm" v-if="!loginOrRegister">
                    <el-form-item prop="name">
                        <el-input v-model="registerForm.name" placeholder="用户名"><span>dsfsf</span></el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input type="password" placeholder="密码" v-model="registerForm.password"></el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input placeholder="手机号" v-model="registerForm.phone"></el-input>
                    </el-form-item>
                   <!-- <el-form-item prop="password">
                        <el-input placeholder="身份证号码" v-model="registerForm.idcard"></el-input>
                    </el-form-item>-->
                    <el-form-item>
                        <el-button type="primary" @click="register('registerForm')" class="submit_btn">注册</el-button>
                    </el-form-item>
                    <p class="registered"><span @click="loginOrRegister = !loginOrRegister">去登录</span></p>
                </el-form>
            </section>
        </transition>
    </div>
</template>
<script>
import { adminLogin,adminRegister } from '../api/getData';

import { mapActions, mapState } from 'vuex'

export default {
    data() {
        return {
            loginForm: {
                name: '',
                password: '',
            },
            registerForm: {
                name: '',
                password: '',
                phone: '',
                idcard: ''
            },

            loginRules: {
                name: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' }
                ],
            },
            registerRules: {
                name: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' }
                ],
                phone: [
                    { required: true, message: '请输入手机号', trigger: 'blur' },
                ]/*,
                idcard: [
                    { required: true, message: '请输入身份证号码', trigger: 'blur' }
                ],*/
            },
            showLogin: false,
            loginOrRegister: true,
        }
    },
    mounted() {
        this.showLogin = true;
        /*if (!this.adminInfo.id) {
    			this.getAdminData()
    		}*/
    },
    computed: {
        /*...mapState(['adminInfo']),*/
    },
    methods: {
        login() {
            let params = {
                name: this.loginForm.name,
                password: this.loginForm.password
            };
            adminLogin(params).then((res) => {
                if (res.data.result) {
                    localStorage.setItem('ms_username', this.loginForm.name);
                    this.$router.push('notice');
                } else {
                    this.$message.error(res.data.message);
                }
            });
        },
        //注册
        register(){
        	let params = {
                name: this.registerForm.name,
                password: this.registerForm.password,
                phone:this.registerForm.phone,
                idCard:this.registerForm.idcard
            };
            adminRegister(params).then((res) => {
                if (res.data.result) {
                    this.$message.success(res.data.message);
                    this.loginOrRegister = true;
                } else {
                    this.$message.error(res.data.message);
                }
            });
        }
    }
}

</script>
<style lang="less" scoped>
@import '../style/mixin';
.login_page {
    background-color: #324057;
}

.manage_tip {
    position: absolute;
    width: 100%;
    top: -100px;
    left: 0;
    p {
        font-size: 34px;
        color: #fff;
    }
}

.form_contianer {
    .wh(320px, auto);
    .ctp(320px, 210px);
    padding: 25px;
    border-radius: 5px;
    text-align: center;
    background-color: #fff;
    .submit_btn {
        width: 100%;
        font-size: 16px;
    }
}

.tip {
    font-size: 12px;
    color: red;
}

.form-fade-enter-active,
.form-fade-leave-active {
    transition: all 1s;
}

.form-fade-enter,
.form-fade-leave-active {
    transform: translate3d(0, -50px, 0);
    opacity: 0;
}

.registered {
    text-align: right;
    color: #92C7FE;
}

.form_contianer /deep/ .el-form-item {
    margin-bottom: 20px;
}

</style>

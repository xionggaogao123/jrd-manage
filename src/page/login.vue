<template>
  	<div class="login_page fillcontain">
	  	<transition name="form-fade" mode="in-out">
	  		<section class="form_contianer" v-show="showLogin">
		  		<div class="manage_tip">
		  			<p>jrd 债委会</p>
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
						<el-input type="password" placeholder="手机号" v-model="registerForm.phone"></el-input>
					</el-form-item>
					<el-form-item prop="password">
						<el-input type="password" placeholder="身份证号码" v-model="registerForm.idcard"></el-input>
					</el-form-item>
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
    import {adminLogin} from '../api/getData';

	import {mapActions, mapState} from 'vuex'

	export default {
	    data(){
			return {
				loginForm: {
                    name: '',
					password: '',
				},
				registerForm:{
					name:'',
					password:'',
					phone:'',
					idcard:''
				},

				loginRules: {
                    name: [
			            { required: true, message: '请输入用户名', trigger: 'blur' },
			        ],
					password: [
						{ required: true, message: '请输入密码', trigger: 'blur' }
					],
				},
				registerRules:{
					name: [
			            { required: true, message: '请输入用户名', trigger: 'blur' },
			        ],
					password: [
						{ required: true, message: '请输入密码', trigger: 'blur' }
					],
					phone: [
			            { required: true, message: '请输入手机号', trigger: 'blur' },
			        ],
					idcard: [
						{ required: true, message: '请输入身份证号码', trigger: 'blur' }
					],
				},
				showLogin: false,
				loginOrRegister:true,
			}
		},
		mounted(){
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
                const self = this;
                let params = {
                    name: this.loginForm.name,
                    password: this.loginForm.password
                };
                adminLogin(params).then((res) => {
                    if (res.data.result) {
                        localStorage.setItem('ms_username', self.loginForm.name);
                        self.$router.push('notice');
                    } else {
                        self.$message({
                            message: res.data.message,
                            type: 'error'
                        })
                    }
                });
            },
			/*...mapActions(['getAdminData']),
			async login(formName) {
				this.$refs[formName].validate(async (valid) => {
					if (valid) {
						const res = await login({name: this.loginForm.name, password: this.loginForm.password});
						console.log(res);

						if (res.status == 1) {
							this.$message({
		                        type: 'success',
		                        message: '登录成功'
		                    });
							this.$router.push('manage')
						}else{
							this.$message({
		                        type: 'error',
		                        message: res.message
		                    });
						}
					} else {
						this.$notify.error({
							title: '错误',
							message: '请输入正确的用户名密码',
							offset: 100
						});
						return false;
					}
				});
			},*/
		},

		/*watch: {
			adminInfo: function (newValue){
				if (newValue.id) {
					this.$message({
                        type: 'success',
                        message: '检测到您之前登录过，将自动登录'
                    });
					this.$router.push('manage')
				}
			}
		}*/
	}
</script>

<style lang="less" scoped>
	@import '../style/mixin';
	.login_page{
		background-color: #324057;
	}
	.manage_tip{
		position: absolute;
		width: 100%;
		top: -100px;
		left: 0;
		p{
			font-size: 34px;
			color: #fff;
		}
	}
	.form_contianer{
		.wh(320px, 210px);
		.ctp(320px, 210px);
		padding: 25px;
		border-radius: 5px;
		text-align: center;
		background-color: #fff;
		.submit_btn{
			width: 100%;
			font-size: 16px;
		}
	}
	.tip{
		font-size: 12px;
		color: red;
	}
	.form-fade-enter-active, .form-fade-leave-active {
	  	transition: all 1s;
	}
	.form-fade-enter, .form-fade-leave-active {
	  	transform: translate3d(0, -50px, 0);
	  	opacity: 0;
	}
	.registered{
		text-align: right;
		color: #92C7FE;
	}
</style>

<template>
    <div class="loginPage">
        <div class="loginBox">
            <div class="imgBox">
                <img src="../../assets/img/logo.jpg" alt="">
            </div>
            <Form ref="formInline" :model="formInline" :rules="ruleInline">
                <FormItem prop="UserName" label="user name">
                    <Input type="text" v-model="formInline.UserName" placeholder="Username">
                    <Icon type="ios-person-outline" slot="prepend"></Icon>
                    </Input>
                </FormItem>
                <FormItem prop="UserPwd" label="password">
                    <Input type="password" v-model="formInline.UserPwd" placeholder="Password">
                    <Icon type="ios-lock-outline" slot="prepend"></Icon>
                    </Input>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="handleSubmit('formInline')">Signin</Button>
                </FormItem>
            </Form>
            <div class="tipsBox">
                <p><a href="">忘记密码？</a></p>
                <p>尚未拥有账户? <a href="">注册</a></p>
            </div>
        </div>
    </div>
</template>

<script>
import BMap from 'BMap'
export default {
    name: 'loginPage',
    created(){
        this.getAddress();
    },
    data () {
        return {
            formInline: {
                UserName: 'liuan',
                UserPwd: '123456',
                city: ''
            },
            ruleInline: {
                user: [
                    { required: true, message: '请输入用户账号...', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入用户密码...', trigger: 'blur' },
                    { type: 'string', min: 6, message: '密码长度不能小于6位...', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        handleSubmit(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.$api.loginPageApi.login(this.formInline).then(data=>{
                        console.log(data);
                        if (data.code == '1'){
                            localStorage.setItem('token',data.data.Token);
                            this.$router.push('/homePage');
                        }else{
                            this.$Message.error(data.msg);
                        }
                    });
                } else {
                    this.$Message.error('滚!');
                }
            })
        },
        getAddress(){
            let _this = this
            var geolocation = new BMap.Geolocation()
            geolocation.getCurrentPosition(function(r) {
                if (this.getStatus() == BMAP_STATUS_SUCCESS) {
                    const myGeo = new BMap.Geocoder()
                    myGeo.getLocation(new BMap.Point(r.point.lng, r.point.lat), data => {
                        if (data.addressComponents) {
                            const result = data.addressComponents
                            const location = {
                                creditProvince: result.province || '', // 省
                                creditCity: result.city || '', // 市
                                creditArea: result.district || '', // 区
                                creditStreet: (result.street || '') + (result.streetNumber || '') // 街道
                            }
                            _this.formInline.city = location.creditProvince + location.creditCity + location.creditArea;
                        }
                    })
                }
            })
        }
    },
    mounted(){
        this.getAddress();
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

<template>
    <div class="loginPage">
        <div class="loginBox">
            <div class="imgBox">
                <img src="../../assets/img/logo.jpg" alt="">
            </div>
            <Form ref="formInline" :model="formInline" :rules="ruleInline">
                <FormItem prop="user" label="user name">
                    <Input type="text" v-model="formInline.user" placeholder="Username">
                    <Icon type="ios-person-outline" slot="prepend"></Icon>
                    </Input>
                </FormItem>
                <FormItem prop="password" label="password">
                    <Input type="password" v-model="formInline.password" placeholder="Password">
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
export default {
    name: 'loginPage',
    created(){
        this.$api.loginPageApi.login({});
    },
    data () {
        return {
            formInline: {
                user: 'Mick',
                password: '123456'
            },
            ruleInline: {
                user: [
                    { required: true, message: 'Please fill in the user name', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: 'Please fill in the password.', trigger: 'blur' },
                    { type: 'string', min: 6, message: 'The password length cannot be less than 6 bits', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        handleSubmit(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.$router.push('/homePage');
                    this.$Message.success('Success!');
                } else {
                    this.$Message.error('滚!');
                }
            })
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

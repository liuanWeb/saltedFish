<template>
    <div class="homePage">
        <div class="header">
            <div class="logoBox imgBox">
                <img src="../../assets/img/logo.jpg" alt="">
                I am a Salted Fish
            </div>
            <div class="headNavBox">
                <router-link to="/homePage/menuPages" class="item">配置</router-link>
                <router-link to="/homePage/helpPage" class="item">帮助</router-link>
                <router-link to="/homePage/aboutPage" class="item">关于</router-link>
                <router-link to="/homePage/messagePage" class="item"><Icon type="ios-notifications" /></a></router-link>
            </div>
            <div class="userBox">
                <div class="headImg imgBox">
                    <img src="../../assets/img/logo.jpg" alt="">
                </div>
<!--                <a class="name">大德<Icon type="ios-arrow-down" /></a>-->
                <Dropdown class="name" placement="bottom-end">
                    <a href="javascript:void(0)">
                        大德
                        <Icon type="ios-arrow-down"></Icon>
                    </a>
                    <DropdownMenu slot="list">
                        <DropdownItem name="userCenter">
                            <router-link to="/homePage/userCenterPage" class="item">个人中心</router-link>
                        </DropdownItem>
                        <DropdownItem name="setting">
                            <router-link to="/homePage/settingPage" class="item">设置</router-link>
                        </DropdownItem>
                        <DropdownItem name="signOut"><a @click="signOut()">退出</a></DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </div>
        </div>
        <router-view class="content" />
    </div>
</template>

<script>
export default {
    name: 'homePage',
    created(){

    },
    data () {
        return {

        }
    },
    methods: {
        signOut(){
            localStorage.removeItem('token');
            this.$Message.warning('已退出登录！');
            this.$router.push('/loginPage');
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

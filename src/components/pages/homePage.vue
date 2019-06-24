<template>
    <div class="homePage">
        <div class="header">
            <div class="logoBox imgBox">
                <img src="../../assets/img/logo.jpg" alt="">
                I am a Salted Fish
            </div>
            <div class="headNavBox">
                <a class="item">设置</a>
                <a class="item">帮助</a>
                <a class="item">关于</a>
                <a class="item"><Icon type="ios-notifications" /></a>
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
                        <DropdownItem name="userCenter">个人中心</DropdownItem>
                        <DropdownItem name="setting">设置</DropdownItem>
                        <DropdownItem name="signOut"><span @click="signOut()">退出</span></DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </div>
        </div>
        <div class="content">
            <Menu active-name="1-1" :open-names="['1']">
                <Submenu :name="item.MenuId" v-for="(item,index) in menuData" :key="index">
                    <template slot="title">
                        <Icon type="ios-paper" />
                        {{item.MenuName}}
                    </template>
                    <MenuItem name="1-1">文章管理</MenuItem>
                    <MenuItem name="1-2">评论管理</MenuItem>
                    <MenuItem name="1-3">举报管理</MenuItem>
                </Submenu>
            </Menu>
            <router-view class="page" />
<!--            <div class="page"></div>-->
        </div>
    </div>
</template>

<script>
export default {
    name: 'homePage',
    created(){
        this.getMenu();
    },
    data () {
        return {
            menuData: [], // 导航数据
        }
    },
    methods: {
        getMenu(){
            this.$api.homePageApi.getMenu().then(data=>{
                this.menuData = data.data;
            });
        },
        signOut(){
            this.$router.push('/loginPage');
            this.$Message.warning('已退出登录！')
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

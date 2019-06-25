<template>
    <div class="menuPages">
        <Menu active-name="0" class="menu">
            <MenuItem name="0" to="/homePage/menuPages/indexPage">
                <Icon type="ios-home" />
                首页
            </MenuItem>
            <Submenu :name="item.MenuId" v-for="(item,index) in menuData" :key="index">
                <template slot="title">
                    <Icon :type="item.IconClass" />
                    {{item.MenuName}}
                </template>
                <MenuItem v-for="(subItem, subIndex) in item.SubLevelMenus" :key="subIndex"
                          :name="subItem.MenuId"
                          :to="'/homePage/menuPages/' + item.Url + '/' + subItem.Url">
                    <Icon :type="subItem.IconClass" />{{subItem.MenuName}}
                </MenuItem>
            </Submenu>
        </Menu>
        <router-view class="page" />
    </div>
</template>

<script>
export default {
    name: 'menuPages',
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
            this.$api.homePageApi.getUserMenu().then(data=>{
                this.menuData = data.data;
            });
        }
    }
}
</script>

<style>

</style>

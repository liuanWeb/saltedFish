<template>
    <div class="menuPages">
        <Menu active-name="0" class="menu">
            <MenuItem name="0" to="/homePage/menuPages/indexPage">
                <Icon type="ios-home" />
                首页
            </MenuItem>
            <Submenu :name="item.MenuId" v-for="(item,index) in menuData" :key="index">
                <template slot="title">
                    <Icon type="ios-paper" />
                    {{item.MenuName}}
                </template>
                <MenuItem v-for="(subItem, subIndex) in item.SubLevelMenus" :key="subIndex"
                          :name="subItem.MenuId">
                    <Icon type="ios-paper" />{{subItem.MenuName}}
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
            this.$api.homePageApi.getMenu().then(data=>{
                this.menuData = data.data;
            });
        }
    }
}
</script>

<style>

</style>

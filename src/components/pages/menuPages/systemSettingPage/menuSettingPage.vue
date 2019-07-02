<template>
    <div class="menuSettingPage">

        <Breadcrumb separator=">">
            <BreadcrumbItem>配置</BreadcrumbItem>
            <BreadcrumbItem>系统设置</BreadcrumbItem>
            <BreadcrumbItem>菜单管理</BreadcrumbItem>
        </Breadcrumb>

        <div class="searchBox">
            <Input v-model="searchKey">
                <Select v-model="searchType" slot="prepend" style="width: 80px">
                    <Option :value="item" v-for="(item,index) in searchTypeList" :key="index">{{item}}</Option>
                </Select>
            </Input>
            <Button type="primary">搜索</Button>
            <Button type="success" @click="show(null,'new')">新增</Button>
            <Button type="error" :disabled="chooseList.length<=0" @click="removeList(chooseList)">
                删除
                <span class="sub" v-show="chooseList.length > 0">
                    (已选中{{chooseList.length}}项)
                </span>
            </Button>
        </div>

        <div class="menuTable">
            <Table border :loading="loading" ref="selection" :columns="columns" :data="menuData"
                   @on-selection-change="changeTable" @on-select-all="changeTablesAll">
            </Table>
        </div>

        <!--   编辑/新增弹窗     -->
        <Modal v-model="popEdit" width="360"
               :title="isNewOrChange=='new'?'新增菜单':'编辑菜单'"
               @on-ok="editEnter"
               @on-cancel="editCancel">
            <Form :model="editData" :label-width="70">
                <FormItem label="菜单编号:">
                    <Input type="number" v-model="editData.MenuId" placeholder="请输入菜单编号"></Input>
                </FormItem>
                <FormItem label="菜单名称:">
                    <Input type="text" v-model="editData.MenuName" placeholder="请输入菜单名称"></Input>
                </FormItem>
                <FormItem label="菜单级别:">
                    <Select v-model="editData.Level" placeholder="请选择菜单级别">
                        <Option :value="item" v-for="(item,index) in 2" :key="index">{{item}}</Option>
                    </Select>
                </FormItem>
                <FormItem label="父级菜单:" v-if="editData.Level == '2'">
                    <Input type="text" v-model="editData.ParentMenId" placeholder="menu parent"></Input>
                </FormItem>
                <FormItem label="菜单排序:">
                    <Input type="number" v-model="editData.Seq" placeholder="请输入菜单排序"></Input>
                </FormItem>
                <FormItem label="菜单图标:">
                    <Select v-model="editData.IconClass" placeholder="请选择菜单图标" style="width: 200px;">
                        <Option :value="item" v-for="(item,index) in IconClassList" :key="index">
                            <Icon :type="item" />
                        </Option>
                    </Select>
                    <Icon :type="editData.IconClass" />
                </FormItem>
                <FormItem label="菜单路径:">
                    <Input type="text" v-model="editData.Url" placeholder="请输入菜单页面路径"></Input>
                </FormItem>
<!--                <FormItem label="是否显示:">-->
<!--                    <Switch v-model="editData.IsVisible" />-->
<!--                </FormItem>-->
            </Form>
        </Modal>
    </div>
</template>

<script>
export default {
    name: 'menuSettingPage',
    created(){
      this.getQueryNavMenuList();
    },
    data () {
        return {
            searchKey: '', // 搜索关键字
            searchType: '菜单编号', // 当前已选搜索类型
            searchTypeList: ['菜单编号','菜单名称','父级编号','菜单级别'], // 搜索类型列表
            loading: false, // 加载loading
            columns: [
                {
                    type: 'selection',
                    width: 60,
                    align: 'center'
                },
                {
                    title: '菜单编号',
                    key: 'MenuId',
                    sortable: true
                },
                {
                    title: '菜单名称',
                    key: 'MenuName'
                },
                {
                    title: '父级编号',
                    key: 'ParentMenId'
                },
                {
                    title: '菜单级别',
                    key: 'Level',
                    sortable: true
                },
                {
                    title: '菜单路径',
                    key: 'Url'
                },
                {
                    title: '操作',
                    key: 'action',
                    align: 'center',
                    render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'primary',
                                    size: 'small'
                                },
                                on: {
                                    click: () => {
                                       this.show(params.index,'change');
                                    }
                                }
                            }, '编辑'),
                            h('Button', {
                                props: {
                                    type: 'error',
                                    size: 'small'
                                },
                                style: {
                                    margin: '0 5px'
                                },
                                on: {
                                    click: () => {
                                        this.remove(params);
                                    }
                                }
                            }, '删除'),
                            h('Button', {
                                props: {
                                    type: 'info',
                                    size: 'small'
                                },
                                on: {
                                    click: () => {
                                        this.config(params);
                                    }
                                }
                            }, '配置')
                        ]);
                    }
                }
            ], // 表头
            menuData: [], // 数据
            chooseList: [], // 多选时 已选项
            popEdit: false, // 编辑/新增弹窗
            editData: {}, // 编辑/新增弹窗内容
            editDataIndex: '', // 当前修改 index
            IconClassList:['ios-add-circle','ios-albums'],
            isNewOrChange: '', // 编辑 or 新增
        }
    },
    methods:{
        // 获取菜单管理数据
        getQueryNavMenuList(){
          let params = {pageSize: 1000,pageIndex:1};
          this.$api.homePageApi.getQueryNavMenuList(params).then(data=>{
            this.menuData = data.data.Data;
          });
        },
        // 查看详情/新增
        show(index,type) {
            if(index != null){
                this.editDataIndex = index;
                this.editData = JSON.parse(JSON.stringify(this.menuData[index]));
            }
            this.isNewOrChange = type;
            this.popEdit = true;
        },
        // 单个删除
        remove(params){
            this.menuData.splice(params.index, 1);
        },
        // 多个删除
        removeList(list){
            for(let k = 0; k < list.length; k++){
                for(let j = 0; j < this.menuData.length; j++){
                    if(list[k].MenuId == this.menuData[j].MenuId){
                        this.menuData.splice(j, 1);
                    }
                }
            }
        },
        // 单个 选择
        changeTable(s,r){
            this.chooseList = s;
        },
        // 全选
        changeTablesAll(status){
            this.chooseList = status;
        },
        // 编辑确认
        editEnter(){
            // 新增
            if(this.isNewOrChange == 'new'){
                if(this.editData){
                    this.$api.homePageApi.getAddMenuExecutive(this.editData).then(data=>{
                        if(data.data.code == '0'){
                            this.menuData.unshift(this.editData);
                            this.$messagebox.success('新增成功！');
                        }
                    });
                }
            }
            // 修改
            else if(this.isNewOrChange == 'change'){
                this.$api.homePageApi.getUpdateMenuExecutive(this.editData).then(data=>{
                    if(data.data.code){
                        this.$set(this.menuData,this.editDataIndex,this.editData);
                        this.$messagebox.success('修改成功！')
                    }
                });

            }
            this.popEdit = false;
            this.editData = {};
            this.editDataIndex = '';
        },
        // 编辑取消
        editCancel(){
            this.popEdit = false;
            this.editData = {};
            this.editDataIndex = '';
            this.$Message.info('cancel');
        },
        // 配置
        config(params){

        }
    }
}
</script>

<style>
    #app {

    }
</style>

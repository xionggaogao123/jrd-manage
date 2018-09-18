<template>
    <div class="manage_page fillcontain">
        <el-row style="height: 100%;">
            <el-col :span="4" style="min-height: 100%; background-color: #324057;">
                <el-menu :default-active="defaultActive" style="min-height: 100%;" theme="dark" router>

                    <el-menu-item index="notice"><i class="el-icon-menu"></i>公告</el-menu-item>
                    <el-menu-item index="manage"><i class="el-icon-menu"></i>数据统计</el-menu-item>

                    <el-submenu index="2">
                        <template slot="title"><i class="el-icon-document"></i>出借人信息登记中心</template>
                        <el-menu-item index="myLendList">我的出借记录</el-menu-item>
                        <el-menu-item index="allLendList">全平台出借记录</el-menu-item>
                    </el-submenu>

                    <el-submenu index="3">
                        <template slot="title"><i class="el-icon-plus"></i>借款人信息中心</template>
                        <el-menu-item index="myBorrowerList">我的借款人</el-menu-item>
                        <el-menu-item index="allBorrowerList">全平台借款人列表</el-menu-item>
                    </el-submenu>

                    <el-submenu index="4">
                        <template slot="title"><i class="el-icon-star-on"></i>资金链路</template>
                        <el-menu-item index="fundsLinkList">还款人还款资金去向</el-menu-item>
                    </el-submenu>

                    <el-submenu index="5">
                        <template slot="title"><i class="el-icon-edit"></i>分析中心</template>
                        <el-menu-item index="trueProjectList">推测平台真标列表</el-menu-item>
                        <el-menu-item index="falseProjectList">推测平台假标列表</el-menu-item>
                        <el-menu-item index="userList">担保公司列表</el-menu-item>
                    </el-submenu>

                    <el-submenu index="6">
                        <template slot="title"><i class="el-icon-setting"></i>证据中心</template>
                        <el-menu-item index="evidenceList">证据列表</el-menu-item>
                    </el-submenu>

                    <el-submenu index="7">
                        <template slot="title"><i class="el-icon-warning"></i>说明</template>
                        <el-menu-item index="explain">说明</el-menu-item>
                    </el-submenu>

                </el-menu>

            </el-col>
            <el-col :span="20" style="height: 100%;overflow: auto;">
                <keep-alive>
                    <router-view></router-view>
                </keep-alive>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        computed: {
            defaultActive: function () {
                return this.$route.path.replace('/', '');
            }
        },
    }
</script>


<style lang="less" scoped>
    @import '../style/mixin';

    .manage_page {

    }
</style>

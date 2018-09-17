<template>
    <div class="fillcontain">
        <head-top></head-top>

        <div class="table_container">
            <el-table :data="tableData" highlight-current-row style="width: 100%">

                <el-table-column property="lenderName" label="出借人"></el-table-column>
                <el-table-column property="lenderPhone" label="出借人电话"></el-table-column>
                <el-table-column property="projectName" label="项目名称"></el-table-column>
                <el-table-column property="projectNo" label="项目编号"></el-table-column>
                <el-table-column property="lendMoney" label="出借本金"></el-table-column>
                <el-table-column property="interestMoney" label="应收利息"></el-table-column>
                <el-table-column property="lendDate" label="出借时间"></el-table-column>
                <el-table-column property="lendDay" label="出借期限"></el-table-column>
                <el-table-column property="lendDate" label="到期时间"></el-table-column>
                <el-table-column property="borrowerName" label="借款人姓名"></el-table-column>
                <el-table-column property="borrowerPhone" label="借款人电话号码"></el-table-column>
                <el-table-column property="borrowerIdCard" label="借款人身份证号"></el-table-column>
                <el-table-column property="guaranteeCompany" label="担保公司"></el-table-column>
                <el-table-column property="status" label="是否已还款"></el-table-column>
                <el-table-column property="repayMoney" label="已还款金额"></el-table-column>
                <el-table-column property="type" label="还款类型"></el-table-column>
            </el-table>

            <div class="Pagination" style="text-align: left;margin-top: 10px;">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-size="20"
                    layout="total, prev, pager, next"
                    :total="count">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
    import headTop from '../components/headTop'
    import {getUserList, getUserCount} from '@/api/getData'

    export default {
        data() {
            return {
                tableData: [],
                currentRow: null,
                offset: 0,
                limit: 20,
                count: 0,
                currentPage: 1,
            }
        },
        components: {
            headTop,
        },
        created() {
            this.initData();
        },
        methods: {
            async initData() {
                try {
                    const countData = await getUserCount();
                    if (countData.status === 1) {
                        this.count = countData.count;
                    } else {
                        throw new Error('获取数据失败');
                    }
                    this.getUsers();
                } catch (err) {
                    console.log('获取数据失败', err);
                }
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.offset = (val - 1) * this.limit;
                this.getUsers()
            },
            async getUsers() {
                const Users = await getUserList({offset: this.offset, limit: this.limit});
                this.tableData = [];
                Users.forEach(item => {
                    const tableData = {};
                    tableData.username = item.username;
                    tableData.registe_time = item.registe_time;
                    tableData.city = item.city;
                    this.tableData.push(tableData);
                })
            }
        },
    }
</script>

<style lang="less">
    @import '../style/mixin';

    .table_container {
        padding: 20px;
    }
</style>

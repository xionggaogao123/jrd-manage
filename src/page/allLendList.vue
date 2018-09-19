<template>
    <div class="fillcontain">
        <head-top></head-top>
        <div class="searchBox">
            <el-input v-model="lenderName" placeholder="出借人姓名" size="small"></el-input>
            <el-input v-model="lenderPhone" placeholder="出借人号码" size="small"></el-input>
            <el-input v-model="projectNo" placeholder="项目编号" size="small"></el-input>
            <el-input v-model="projectName" placeholder="项目名称" size="small"></el-input>
            <el-input v-model="borrowerPhone" placeholder="借款人手机号" size="small"></el-input>
            <el-input v-model="borrowerName" placeholder="借款人姓名" size="small"></el-input>
            <el-input v-model="borrowerIdCard" placeholder="身份证号码" size="small"></el-input>
            <el-select v-model="borrowerStatus" placeholder="是否还款" size="small">
                <el-option key="0" label="未还款" value="0"></el-option>
                <el-option key="1" label="已还款" value="1"></el-option>
            </el-select>
            <el-button type="primary" size="small" @click="search">搜索</el-button>
        </div>
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
                <el-table-column property="status" label="是否已还款">
                    <template slot-scope="scope">
                        {{scope.row.status === 1?'已还款':'未还款'}}
                    </template>
                </el-table-column>
                <el-table-column property="repayMoney" label="已还款金额"></el-table-column>
                <el-table-column property="type" label="还款类型">
                    <template slot-scope="scope">
                        {{scope.row.type === 1?'系统还款':'主动还款'}}
                    </template>
                </el-table-column>
            </el-table>
            <div class="Pagination" style="text-align: left;margin-top: 10px;">
                <el-pagination @current-change="handleCurrentChange" :current-page="currentPage" :page-size="20" layout="total, prev, pager, next" :total="totalCount">
                </el-pagination>
            </div>
        </div>
    </div>
</template>
<script>
import headTop from '../components/headTop'
import { lendRecordPagingAllLend } from '@/api/getData'

export default {
    data() {
        return {
            tableData: [],
            currentRow: null,
            totalCount: 0,
            currentPage: 1,
            lenderName: "",
            lenderPhone: "",
            projectNo: "",
            projectName: "",
            borrowerPhone: "",
            borrowerName: "",
            borrowerIdCard: "",
            borrowerStatus: ""
        }
    },
    components: {
        headTop,
    },
    created() {
        this.initData();
    },
    methods: {
        initData() {
            lendRecordPagingAllLend({ params: { pageNo: 1 } }).then((res) => {
                if (res.data.result) {
                    this.tableData = res.data.result.data;
                    this.totalCount = res.data.result.total;
                } else {
                    this.$message.error(res.data.message);
                }
            });
        },
        handleCurrentChange(val) {
            let params = {
                pageNo: val,
                lenderName: this.lenderName,
                lenderPhone: this.lenderPhone,
                projectNo: this.projectNo,
                projectName: this.projectName,
                borrowerPhone: this.borrowerPhone,
                borrowerName: this.borrowerName,
                borrowerIdCard: this.borrowerIdCard,
                status: this.borrowerStatus
            };
            lendRecordPagingAllLend({ params: params }).then((res) => {
                if (res.data.result) {
                    this.tableData = res.data.result.data;
                    this.totalCount = res.data.result.total;
                } else {
                    this.$message.error(res.data.message);
                }
            });
        },
        search() {
            let params = {
                pageNo: 1,
                lenderName: this.lenderName,
                lenderPhone: this.lenderPhone,
                projectNo: this.projectNo,
                projectName: this.projectName,
                borrowerPhone: this.borrowerPhone,
                borrowerName: this.borrowerName,
                borrowerIdCard: this.borrowerIdCard,
                status: this.borrowerStatus
            }
            lendRecordPagingAllLend({ params: params }).then((res) => {
                if (res.data.result) {
                    this.tableData = res.data.result.data;
                    this.totalCount = res.data.result.total;
                } else {
                    this.$message.error(res.data.message);
                }
            });
        },
    },
}

</script>
<style lang="less">
@import '../style/mixin';

.table_container {
    padding: 15px 20px;
}

.searchBox {
    margin: 15px 0 0 20px;
}

.searchBox /deep/ .el-input,
.searchBox /deep/ .el-select {
    width: 150px;
}

</style>

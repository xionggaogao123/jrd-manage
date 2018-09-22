<template>
    <div class="fillcontain">
        <head-top></head-top>
        <div class="searchBox">
            <el-input v-model="lenderName" placeholder="出借人姓名" size="small"></el-input>
            <el-button type="primary" size="small" @click="search">搜索</el-button>
        </div>

        <div class="table_container">

            <div class="allMoney"><span>全平台尚未收回本息：{{allMoney/100}} 元</span><span>&nbsp &nbsp &nbsp</span>
                <span>本金：{{principal/100}} 元</span> <span>&nbsp &nbsp &nbsp</span><span>利息：{{interest/100}} 元</span></div>

            <el-table :data="tableData1" highlight-current-row style="width: 100%">
                <el-table-column property="name" label="出借人"></el-table-column>
                <el-table-column property="phone" label="出借人电话"></el-table-column>
                <el-table-column property="idCard" label="出借人身份证号" size="160px"></el-table-column>
                <el-table-column property="totalWaitMoney" label="尚未收回本息(元)"></el-table-column>
                <el-table-column property="totalLendMoney" label="尚未收回本金(元)"></el-table-column>
                <el-table-column property="totalInterestMoney" label="尚未收回利息(元)"></el-table-column>
                <el-table-column property="" label="操作">
                    <template slot-scope="scope">
                        <el-button type="text" @click="checkRecord(scope.$index,scope.row)">出借记录</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="Pagination" style="text-align: left;margin-top: 10px;">
                <el-pagination @current-change="handleCurrentChange1" :current-page="currentPage1" :page-size="20" layout="total, prev, pager, next" :total="totalCount1">
                </el-pagination>
            </div>
        </div>
        <el-dialog title="出借记录" :visible.sync="dialogFormVisible" custom-class="dialogFormVisible3" @close="closeDialog">
            <el-table :data="tableData2" highlight-current-row style="width: 100%">
                <el-table-column type="index" width="50"></el-table-column>
                <el-table-column property="borrowerName" label="借款人姓名"></el-table-column>
                <el-table-column property="borrowerIdCard" label="身份证号"></el-table-column>
                <el-table-column property="borrowerPhone" label="电话号码"></el-table-column>
                <el-table-column property="contractNo" label="借款合同号"></el-table-column>
                <el-table-column property="lendMoney" label="借款金额(元)"></el-table-column>
                <el-table-column property="guaranteeCompany" label="担保公司"></el-table-column>
                <el-table-column property="lendDate" label="借款日期"></el-table-column>
                <el-table-column property="lendDay" label="出借期限(月)"></el-table-column>
                <el-table-column property="expireDate" label="到期时间"></el-table-column>
            </el-table>
            <div class="Pagination" style="text-align: left;margin-top: 10px;">
                <el-pagination @current-change="handleCurrentChange2" :current-page="currentPage2" :page-size="20" layout="total, prev, pager, next" :total="totalCount2">
                </el-pagination>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import headTop from '../components/headTop'
import { lenderListAllUserInfo, lendRecordPagingMyLend, countUserMoneyDate } from '@/api/getData'

export default {
    data() {
        return {
            tableData1: [],
            tableData2: [],
            currentRow: null,
            totalCount1: 0,
            currentPage1: 1,
            totalCount2: 0,
            currentPage2: 1,
            lenderName: "",
            lenderPhone: "",
            projectNo: "",
            contractNo: "",
            projectName: "",
            borrowerPhone: "",
            borrowerName: "",
            borrowerIdCard: "",
            dialogFormVisible: false,
            lenderId: ""
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
            lenderListAllUserInfo({ params: { pageNo: 1 } }).then((res) => {
                if (res.data.result) {
                    this.tableData1 = res.data.result.data;
                    this.totalCount1 = res.data.result.total;
                    for (let i = 0; i < this.tableData1.length; i++) {
                        this.tableData1[i].totalWaitMoney = this.tableData1[i].totalWaitMoney / 100;
                        this.tableData1[i].totalLendMoney = this.tableData1[i].totalLendMoney / 100;
                        this.tableData1[i].totalInterestMoney = this.tableData1[i].totalInterestMoney / 100;
                    }
                } else {
                    this.$message.error(res.data.message);
                }
            });
            countUserMoneyDate().then((res) => {
                if (res.data.result) {
                    this.allMoney = res.data.result.totalWaitMoney;
                    this.principal = res.data.result.totalLendMoney;
                    this.interest = res.data.result.totalInterestMoney;
                } else {
                    this.$message.error(res.data.message);
                }
            });
        },
        handleCurrentChange1(val) {
            let params = {
                pageNo: val,
                lenderName: this.lenderName,
                lenderPhone: this.lenderPhone,
                projectNo: this.projectNo,
                projectName: this.projectName,
                borrowerPhone: this.borrowerPhone,
                borrowerName: this.borrowerName,
                borrowerIdCard: this.borrowerIdCard
            };
            lenderListAllUserInfo({ params: params }).then((res) => {
                if (res.data.result) {
                    this.tableData1 = res.data.result.data;
                    this.totalCount1 = res.data.result.total;
                    for (let i = 0; i < this.tableData1.length; i++) {
                        this.tableData1[i].totalWaitMoney = this.tableData1[i].totalWaitMoney / 100;
                        this.tableData1[i].totalLendMoney = this.tableData1[i].totalLendMoney / 100;
                        this.tableData1[i].totalInterestMoney = this.tableData1[i].totalInterestMoney / 100;
                    }
                } else {
                    this.$message.error(res.data.message);
                }
            });
        },
        handleCurrentChange2(val) {
            lendRecordPagingMyLend({ params: { pageNo: val, lenderId: this.lenderId } }).then((res) => {
                if (res.data.result) {
                    this.tableData2 = res.data.result.data;
                    this.totalCount2 = res.data.result.total;
                    for (let i = 0; i < this.tableData2.length; i++) {
                        this.tableData2[i].lendMoney = this.tableData2[i].lendMoney / 100;
                        this.tableData2[i].lendDate = this.fmtDate(this.tableData2[i].lendDate);
                        this.tableData2[i].expireDate = this.fmtDate(this.tableData2[i].expireDate);
                    }
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
                borrowerIdCard: this.borrowerIdCard
            };
            lenderListAllUserInfo({ params: params }).then((res) => {
                if (res.data.result) {
                    this.tableData1 = res.data.result.data;
                    this.totalCount1 = res.data.result.total;
                    for (let i = 0; i < this.tableData1.length; i++) {
                        this.tableData1[i].totalWaitMoney = this.tableData1[i].totalWaitMoney / 100;
                        this.tableData1[i].totalLendMoney = this.tableData1[i].totalLendMoney / 100;
                        this.tableData1[i].totalInterestMoney = this.tableData1[i].totalInterestMoney / 100;
                    }
                } else {
                    this.$message.error(res.data.message);
                }
            });
        },

        checkRecord(index, row) {
            this.dialogFormVisible = true;
            this.lenderId = row.id;
            lendRecordPagingMyLend({ params: { pageNo: 1, lenderId: row.id } }).then((res) => {
                if (res.data.result) {
                    this.tableData2 = res.data.result.data;
                    this.totalCount2 = res.data.result.total;
                    for (let i = 0; i < this.tableData2.length; i++) {
                        this.tableData2[i].lendMoney = this.tableData2[i].lendMoney / 100;
                        this.tableData2[i].lendDate = this.fmtDate(this.tableData2[i].lendDate);
                        this.tableData2[i].expireDate = this.fmtDate(this.tableData2[i].expireDate);
                    }
                } else {
                    this.$message.error(res.data.message);
                }
            });
        },
        fmtDate(obj) {
            var date = new Date(obj);
            var y = 1900 + date.getYear();
            var m = "0" + (date.getMonth() + 1);
            var d = "0" + date.getDate();
            return y + "-" + m.substring(m.length - 2, m.length) + "-" + d.substring(d.length - 2, d.length);
        },
        closeDialog() {

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

.searchBox .el-input,
.searchBox .el-select {
    width: 150px;
}

.fillcontain .dialogFormVisible3 {
    width: 1000px;
}
.el-table th,.el-table td{
    text-align: center;
}
</style>

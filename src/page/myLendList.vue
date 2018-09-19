<template>
    <div class="fillcontain">
        <head-top></head-top>
        <div class="searchBox">
            <el-input v-model="projectNo" placeholder="项目编号" size="small"></el-input>
            <el-input v-model="projectName" placeholder="项目名称" size="small"></el-input>
            <el-input v-model="borrowerPhone" placeholder="手机号码" size="small"></el-input>
            <el-input v-model="borrowerName" placeholder="姓名" size="small"></el-input>
            <el-input v-model="borrowerIdCard" placeholder="身份证号" size="small"></el-input>
            <el-select v-model="borrowerStatus" placeholder="是否还款" size="small">
                <el-option key="0" label="未还款" value="0"></el-option>
                <el-option key="1" label="已还款" value="1"></el-option>
            </el-select>
            <el-button type="primary" size="small" @click="search">搜索</el-button>
            <el-button type="info" size="small" @click="dialogFormVisible = true">登记出错记录</el-button>
        </div>
        <div class="table_container">
            <el-table :data="tableData" highlight-current-row style="width: 100%">
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
        <el-dialog title="登记出错记录" :visible.sync="dialogFormVisible" custom-class="dialogFormVisible">
            <el-form :model="registrationForm">
                <el-form-item label="项目名称" :label-width="formLabelWidth">
                    <el-input v-model="registrationForm.projectName" size="small"></el-input>
                </el-form-item>
                <el-form-item label="项目编号" :label-width="formLabelWidth">
                    <el-input v-model="registrationForm.projectNo" size="small"></el-input>
                </el-form-item>
                <el-form-item label="出借本金" :label-width="formLabelWidth">
                    <el-input v-model="registrationForm.lendMoney" size="small"></el-input>
                </el-form-item>
                <el-form-item label="出借时间" :label-width="formLabelWidth">
                    <el-date-picker v-model="registrationForm.lendDate" type="date" placeholder="选择日期"></el-date-picker>
                </el-form-item>
                <el-form-item label="出借期限" :label-width="formLabelWidth">
                    <el-input v-model="registrationForm.lendDay" size="small"></el-input>
                </el-form-item>
                <el-form-item label="借款人姓名" :label-width="formLabelWidth">
                    <el-input v-model="registrationForm.borrowerName" size="small"></el-input>
                </el-form-item>
                <el-form-item label="借款人电话" :label-width="formLabelWidth">
                    <el-input v-model="registrationForm.borrowerPhone" size="small"></el-input>
                </el-form-item>
                <el-form-item label="身份证号码" :label-width="formLabelWidth">
                    <el-input v-model="registrationForm.borrowerIdCard" size="small"></el-input>
                </el-form-item>
                <el-form-item label="担保公司" :label-width="formLabelWidth">
                    <el-select v-model="registrationForm.guaranteeCompany" placeholder="担保公司" size="small">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="状态" :label-width="formLabelWidth">
                    <el-select v-model="registrationForm.status" placeholder="状态" size="small">
                        <el-option label="未还款" :value="0" :key="0"></el-option>
                        <el-option label="已还款" :value="1" :key="1"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="已还款金额" :label-width="formLabelWidth" v-if="registrationForm.status === 1">
                    <el-input v-model="registrationForm.repayMoney" size="small"></el-input>
                </el-form-item>
                <el-form-item label="产生利息" :label-width="formLabelWidth" v-if="registrationForm.status === 1">
                    <el-input v-model="registrationForm.interestMoney" size="small"></el-input>
                </el-form-item>
                <el-form-item label="还款类型" :label-width="formLabelWidth" v-if="registrationForm.status === 1">
                    <el-select v-model="registrationForm.type" placeholder="还款类型" size="small">
                        <el-option label="系统还款" value="1"></el-option>
                        <el-option label="主动还款" value="2"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="registration">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import headTop from '../components/headTop'
import { lendRecordPagingMyLend, lendRecordCreate } from '@/api/getData'

export default {
    data() {
        return {
            tableData: [],
            totalCount: 0,
            currentPage: 1,
            projectNo: "",
            projectName: "",
            borrowerPhone: "",
            borrowerName: "",
            borrowerIdCard: "",
            borrowerStatus: "",
            dialogFormVisible:false,
            formLabelWidth: "90px",
            registrationForm: {
                projectName: "",
                projectNo: "",
                lendMoney: 0,
                lendDate: "",
                lendDay: "",
                borrowerName: "",
                borrowerPhone: "",
                borrowerIdCard: "",
                guaranteeCompany: "",
                status: 0,
                repayMoney: "",
                type: "",
                interestMoney: ""
            }
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
            lendRecordPagingMyLend({ params: { pageNo: 1 } }).then((res) => {
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
                projectNo: this.projectNo,
                projectName: this.projectName,
                borrowerPhone: this.borrowerPhone,
                borrowerName: this.borrowerName,
                borrowerIdCard: this.borrowerIdCard,
                status: this.borrowerStatus
            };
            lendRecordPagingMyLend({ params: params }).then((res) => {
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
                projectNo: this.projectNo,
                projectName: this.projectName,
                borrowerPhone: this.borrowerPhone,
                borrowerName: this.borrowerName,
                borrowerIdCard: this.borrowerIdCard,
                status: this.borrowerStatus
            }
            lendRecordPagingMyLend({ params: params }).then((res) => {
                if (res.data.result) {
                    this.tableData = res.data.result.data;
                    this.totalCount = res.data.result.total;
                } else {
                    this.$message.error(res.data.message);
                }
            });
        },
        registration() {
            lendRecordCreate(this.registrationForm).then((res) => {
                if (res.data.result) {
                    this.$message.success(res.data.message);
                    this.dialogFormVisible = false;
                    this.initData();
                    this.currentPage = 1;
                } else {
                    this.$message.error(res.data.message);
                }
            });
        },
    }
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

.fillcontain /deep/ .dialogFormVisible {
    width: 400px;
}

.dialogFormVisible /deep/ .el-input,
.dialogFormVisible /deep/ .el-select {
    width: 260px;
}

.dialogFormVisible .el-form-item {
    margin-bottom: 2px;
}

</style>

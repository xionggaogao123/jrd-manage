<template>
    <div class="fillcontain">
        <head-top></head-top>
        <div class="searchBox">
            <el-input v-model="projectNo" placeholder="项目编号" size="small"></el-input>
            <el-input v-model="projectName" placeholder="项目名称" size="small"></el-input>
            <el-input v-model="borrowerPhone" placeholder="手机号码" size="small"></el-input>
            <el-button type="primary" size="small" @click="search">搜索</el-button>
<<<<<<< HEAD
            <el-button type="info" size="small" @click="dialogFormVisible = true">登记出借记录</el-button>
=======
            <el-button type="info" size="small" @click="dialogFormVisible1 = true">登记未还款记录</el-button>
>>>>>>> 3e4409b1a70080796b876fccbb7264f0a9470c1a
        </div>
        <div class="table_container">
            <div class="allMoney"><span>尚未收回本息：{{allMoney}}</span><span>本金：{{principal}}</span><span>利息：{{interest}}</span></div>
            <el-table :data="tableData" highlight-current-row style="width: 100%">
                <el-table-column type="index" width="50"></el-table-column>
                <el-table-column property="borrowerName" label="借款人姓名"></el-table-column>
                <el-table-column property="borrowerIdCard" label="身份证号"></el-table-column>
                <el-table-column property="borrowerPhone" label="电话号码"></el-table-column>
                <el-table-column property="projectName" label="借款合同号"></el-table-column>
                <el-table-column property="projectNo" label="项目编号"></el-table-column>
                <el-table-column property="projectName" label="项目名称"></el-table-column>
                <el-table-column property="lendMoney" label="借款金额"></el-table-column>
                <el-table-column property="guaranteeCompany" label="担保公司"></el-table-column>
                <el-table-column property="lendDate" label="借款日期"></el-table-column>
                <el-table-column property="lendDay" label="出借期限"></el-table-column>
                <el-table-column property="lendDate" label="到期时间"></el-table-column>
                <el-table-column property="" label="操作">
                    <template slot-scope="scope">
                        <el-button type="text" @click="entryEvidence(scope.$index,scope.row)">录入还款证据</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="Pagination" style="text-align: left;margin-top: 10px;">
                <el-pagination @current-change="handleCurrentChange" :current-page="currentPage" :page-size="20" layout="total, prev, pager, next" :total="totalCount">
                </el-pagination>
            </div>
        </div>
        <el-dialog title="登记未还款记录" :visible.sync="dialogFormVisible1" custom-class="dialogFormVisible" @open="openDialog1">
            <el-form :model="registrationForm">
                <el-form-item label="项目名称" :label-width="formLabelWidth">
                    <el-input v-model="registrationForm.projectName" size="small"></el-input>
                </el-form-item>
                <el-form-item label="项目编号" :label-width="formLabelWidth">
                    <el-input v-model="registrationForm.projectNo" size="small"></el-input>
                </el-form-item>
                <el-form-item label="合同编号" :label-width="formLabelWidth">
                    <el-input v-model="registrationForm.contractNo" size="small"></el-input>
                </el-form-item>
                <el-form-item label="出借本金" :label-width="formLabelWidth">
                    <el-input v-model="registrationForm.lendMoney" size="small"></el-input>
                </el-form-item>
                <el-form-item label="应收利息" :label-width="formLabelWidth">
                    <el-input v-model="registrationForm.interestMoney" size="small"></el-input>
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
                        <el-option v-for="item in companyList" :label="item.name" :value="item.name"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible1 = false">取 消</el-button>
                <el-button type="primary" @click="registration">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="录入还款证据" :visible.sync="dialogFormVisible2" custom-class="dialogFormVisible" @close="closeDialog2">
            <el-form :model="evidenceForm">
                <el-form-item label="还入银行" :label-width="formLabelWidth">
                    <el-input v-model="evidenceForm.bankName" size="small"></el-input>
                </el-form-item>
                <el-form-item label="银行账号" :label-width="formLabelWidth">
                    <el-input v-model="evidenceForm.account" size="small"></el-input>
                </el-form-item>
                <el-form-item label="还款总额" :label-width="formLabelWidth">
                    <el-input v-model="evidenceForm.repayMoney" size="small"></el-input>
                </el-form-item>
                <el-form-item label="相关佐证" :label-width="formLabelWidth">
                    <el-upload action="" :before-upload="uploadImage" :multiple="false" :limit="1" list-type="picture-card" :file-list="fileList">
                        <i class="el-icon-plus"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="备注" :label-width="formLabelWidth">
                    <el-input v-model="evidenceForm.remark" size="small"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible2 = false">取 消</el-button>
                <el-button type="primary" @click="EntryEvidence">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import headTop from '../components/headTop'
import { lendRecordPagingMyLend, lendRecordCreate, toolUploadImage, borrowerRecordEvidence, companyList, lenderUserInfo } from '@/api/getData'

export default {
    data() {
        return {
            tableData: [],
            totalCount: 0,
            currentPage: 1,
            projectNo: "",
            projectName: "",
            borrowerPhone: "",
            dialogFormVisible1: false,
            dialogFormVisible2: false,
            formLabelWidth: "90px",
            registrationForm: {
                projectName: "",
                projectNo: "",
                contractNo:"",
                lendMoney: 0,
                lendDate: "",
                lendDay: "",
                borrowerName: "",
                borrowerPhone: "",
                borrowerIdCard: "",
                guaranteeCompany: "",
                interestMoney: ""
            },
            evidenceForm: {
                bankName: "",
                account: "",
                repayMoney: "",
                remark: "",
                evidences: []
            },
            borrowerId: "",
            fileList: [],
            companyList:[],
            allMoney:"",
            principal:"",
            interest:""
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
            lenderUserInfo().then((res) => {
                if (res.data.result) {
                    this.allMoney = res.data.result.totalWaitMoney;
                    this.principal = res.data.result.totalLendMoney;
                    this.interest = res.data.result.totalInterestMoney;
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
                borrowerPhone: this.borrowerPhone
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
                borrowerPhone: this.borrowerPhone
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
                    this.dialogFormVisible1 = false;
                    this.initData();
                    this.currentPage = 1;
                } else {
                    this.$message.error(res.data.message);
                }
            });
        },
        entryEvidence(index, row) {
            this.dialogFormVisible2 = true;
            this.borrowerId = row.id;
        },
        EntryEvidence() {
            this.evidenceForm.id = this.borrowerId;
            borrowerRecordEvidence(this.evidenceForm).then((res) => {
                if (res.data.result) {
                    this.$message.success(res.data.message);
                    this.dialogFormVisible2 = false;
                } else {
                    this.$message.error(res.data.message);
                }
            });
        },
        closeDialog2() {
            this.evidenceForm = {
                bankName: "",
                account: "",
                repayMoney: "",
                remark: "",
                evidences: []
            }
        },
        uploadImage(file) {
            var formdata = new FormData();
            formdata.append('file', file);
            toolUploadImage(formdata).then(res => {
                if (res.data.result) {
                    this.evidenceForm.evidences.push(res.data.result);
                    this.fileList.push({
                        name: "",
                        url: res.data.ressult
                    })
                }
            }).catch(error => {

            })

        },
        openDialog1() {
            companyList({ params: { pageNo: 1 } }).then((res) => {
                if (res.data.result) {
                    this.companyList = res.data.result;
                } else {
                    this.$message.error(res.data.message);
                }
            });
        }
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

.searchBox .el-input,
.searchBox .el-select {
    width: 150px;
}

.fillcontain .dialogFormVisible {
    width: 400px;
}

.dialogFormVisible .el-input,
.dialogFormVisible .el-select {
    width: 260px;
}

.dialogFormVisible .el-form-item {
    margin-bottom: 2px;
}

.dialogFormVisible .el-upload-list--picture-card .el-upload-list__item,
.dialogFormVisible .el-upload--picture-card {
    width: 80px;
    height: 80px;
    line-height: 80px;
}
.allMoney{
    margin-bottom: 10px;
}
.allMoney span{
    margin-right: 20px;
}
</style>

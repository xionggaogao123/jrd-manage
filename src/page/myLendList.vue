<template>
    <div class="fillcontain">
        <head-top></head-top>
        <div class="searchBox">
            <el-input v-model="projectNo" placeholder="项目编号" size="small"></el-input>
            <el-input v-model="projectName" placeholder="项目名称" size="small"></el-input>
            <el-input v-model="borrowerPhone" placeholder="手机号码" size="small"></el-input>
            <el-button type="primary" size="small" @click="search">搜索</el-button>
            <el-button type="info" size="small" @click="openRegistration">登记未还款记录</el-button>
            <el-button type="primary" style="margin-left: 20px" size="small">
                <a style="color: white;text-decoration: none;" href="/static/template.xlsx" download>下载导入模版</a>
            </el-button>
            <el-button type="primary" @click="dialogFormVisible = true" size="small" style="margin-left: 20px;">
                导入未还款记录
            </el-button>

        </div>

        <!--上传客户资料-->
        <div class="customer-dialog">
            <el-dialog title="上传客户资料" :visible.sync="dialogFormVisible" class="uploadDataBox"
                       @close="closeUploadCustomer">
                <div class="customer-line">
                    <span class="customer-label">&#12288;&#12288;上传文件：</span><input type="file" id="customer_file"/>
                </div>
                <el-button @click="uploadCustomer(1)" type="primary" plain size='small' :loading="fullscreenLoading">
                    上传<span v-if="fullscreenLoading">中,请稍后！</span></el-button>
            </el-dialog>
        </div>

        <div class="table_container">
            <div class="allMoney"><span>尚未收回本息：{{allMoney / 100}} 元</span><span>本金：{{principal / 100}} 元</span><span>利息：{{interest / 100}} 元</span>
            </div>
            <el-table :data="tableData" highlight-current-row style="width: 100%">
                <el-table-column type="index" width="50"></el-table-column>
                <el-table-column property="borrowerName" label="借款人姓名"></el-table-column>
                <el-table-column property="borrowerIdCard" label="借款人身份证号"></el-table-column>
                <el-table-column property="borrowerPhone" label="电话号码"></el-table-column>
                <el-table-column property="projectName" label="项目名称"></el-table-column>
                <el-table-column property="projectNo" label="项目编号"></el-table-column>
                <el-table-column property="contractNo" label="借款合同号"></el-table-column>
                <el-table-column property="lendMoney" label="借款金额(元)"></el-table-column>
                <el-table-column property="guaranteeCompany" label="担保公司"></el-table-column>
                <el-table-column property="lendDate" label="借款日期"></el-table-column>
                <el-table-column property="lendDay" label="出借期限(月)"></el-table-column>
                <el-table-column property="expireDate" label="到期时间"></el-table-column>
                <el-table-column property="" label="操作" width="250">
                    <template slot-scope="scope">
                        <el-button v-if="scope.row.isRecord" type="text"
                                   @click="editorEvidence(scope.$index,scope.row)">编辑还款证据
                        </el-button>
                        <el-button v-else type="text" @click="entryEvidence(scope.$index,scope.row)">录入还款证据</el-button>
                        <el-button type="text" @click="editorList(scope.$index,scope.row)">编辑</el-button>
                        <el-button type="text" @click="deleteList(scope.$index,scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="Pagination" style="text-align: left;margin-top: 10px;">
                <el-pagination @current-change="handleCurrentChange" :current-page="currentPage" :page-size="20"
                               layout="total, prev, pager, next" :total="totalCount">
                </el-pagination>
            </div>
        </div>
        <el-dialog title="登记未还款记录" :visible.sync="dialogFormVisible1" custom-class="dialogFormVisible"
                   @open="openDialog1" @close="closeDialog1">
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
                <el-form-item label="出借本金(元\填数字)" :label-width="formLabelWidth">
                    <el-input v-model="registrationForm.lendMoney2" size="small"></el-input>
                </el-form-item>
                <el-form-item label="待收利息(元\填数字)" :label-width="formLabelWidth">
                    <el-input v-model="registrationForm.interestMoney2" size="small"></el-input>
                </el-form-item>
                <el-form-item label="出借时间" :label-width="formLabelWidth">
                    <el-date-picker v-model="registrationForm.lendDate" type="date" placeholder="选择日期"></el-date-picker>
                </el-form-item>
                <el-form-item label="出借期限(天\填数字)" :label-width="formLabelWidth">
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
        <el-dialog title="录入还款证据" :visible.sync="dialogFormVisible2" custom-class="dialogFormVisible"
                   @close="closeDialog2">
            <el-form :model="evidenceForm">
                <el-form-item label="还入银行" :label-width="formLabelWidth">
                    <el-input v-model="evidenceForm.bankName" size="small"></el-input>
                </el-form-item>
                <el-form-item label="银行账号" :label-width="formLabelWidth">
                    <el-input v-model="evidenceForm.bankAccount" size="small"></el-input>
                </el-form-item>
                <el-form-item label="还款总额" :label-width="formLabelWidth">
                    <el-input v-model="evidenceForm.repayMoney" size="small"></el-input>
                </el-form-item>
                <el-form-item label="相关佐证" :label-width="formLabelWidth">
                    <el-upload action="" :before-upload="uploadImage" :multiple="false" :limit="1"
                               list-type="picture-card" :file-list="fileList">
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
import { lendRecordPagingMyLend, lendRecordCreate,
    toolUploadImage, borrowerRecordEvidence, companyList,
    lenderUserInfo, lendRecordDeleteMyLend, lendRecordUpdateMyLend,
    borrowerFindEvidence, borrowerUpdateEvidence } from '@/api/getData'

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
                    contractNo: "",
                    lendMoney: "",
                    lendMoney2: "",
                    interestMoney: "",
                    interestMoney2: "",
                    lendDate: "",
                    lendDay: "",
                    borrowerName: "",
                    borrowerPhone: "",
                    borrowerIdCard: "",
                    guaranteeCompany: ""

                },

                evidenceForm: {
                    lendRecordId: "",
                    bankName: "",
                    bankAccount: "",
                    repayMoney: "",
                    remark: "",
                    evidences: []
                },

                borrowerId: "",
                fileList: [],
                companyList: [],
                allMoney: "",
                principal: "",
                interest: "",
                isEditor: false,
                isEvidence: true,
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
                lendRecordPagingMyLend({params: {pageNo: 1}}).then((res) => {
                    if (res.data.result) {
                        this.tableData = res.data.result.data;
                        this.totalCount = res.data.result.total;
                        for (let i = 0; i < this.tableData.length; i++) {
                            this.tableData[i].lendMoney2 = this.tableData[i].lendMoney / 100;
                            this.tableData[i].interestMoney2 = this.tableData[i].interestMoney / 100;

                            this.tableData[i].lendMoney = this.tableData[i].lendMoney / 100;
                            this.tableData[i].interestMoney = this.tableData[i].interestMoney / 100;
                            this.tableData[i].lendDate = this.fmtDate(this.tableData[i].lendDate);
                            this.tableData[i].expireDate = this.fmtDate(this.tableData[i].expireDate);
                        }
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
                lendRecordPagingMyLend({params: params}).then((res) => {
                    if (res.data.result) {
                        this.tableData = res.data.result.data;
                        this.totalCount = res.data.result.total;
                        for (let i = 0; i < this.tableData.length; i++) {
                            this.tableData[i].lendMoney = this.tableData[i].lendMoney / 100;
                            this.tableData[i].lendDate = this.fmtDate(this.tableData[i].lendDate);
                            this.tableData[i].expireDate = this.fmtDate(this.tableData[i].lendDate);
                        }
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
                };
                lendRecordPagingMyLend({params: params}).then((res) => {
                    if (res.data.result) {
                        this.tableData = res.data.result.data;
                        this.totalCount = res.data.result.total;
                        for (let i = 0; i < this.tableData.length; i++) {
                            this.tableData[i].lendMoney = this.tableData[i].lendMoney / 100;
                            this.tableData[i].lendDate = this.fmtDate(this.tableData[i].lendDate);
                            this.tableData[i].expireDate = this.fmtDate(this.tableData[i].lendDate);
                        }
                    } else {
                        this.$message.error(res.data.message);
                    }
                });
            },
            registration() {
                if (this.isEditor) { //编辑
                    this.registrationForm.lendMoney = this.registrationForm.lendMoney2 * 100;
                    this.registrationForm.interestMoney = this.registrationForm.interestMoney2 * 100;
                    lendRecordUpdateMyLend(this.registrationForm).then((res) => {
                        if (res.data.result) {
                            this.$message.success(res.data.message);
                            this.dialogFormVisible1 = false;
                            this.initData();
                            this.currentPage = 1;
                        } else {
                            this.$message.error(res.data.message);
                        }
                    });
                } else { //新增
                    this.registrationForm.lendMoney = this.registrationForm.lendMoney2 * 100;
                    this.registrationForm.interestMoney = this.registrationForm.interestMoney2 * 100;
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
                }
            },
            entryEvidence(index, row) {
                this.dialogFormVisible2 = true;
                this.borrowerId = row.id;
                this.isEvidence = true;
            },
            editorEvidence(index, row) {
                this.dialogFormVisible2 = true;
                this.isEvidence = false;
                borrowerFindEvidence({params: {id: row.id}}).then((res) => {
                    if (res.data.result) {
                        this.evidenceForm.bankName = res.data.result.bankName;
                        this.evidenceForm.bankAccount = res.data.result.bankAccount;
                        this.evidenceForm.repayMoney = res.data.result.repayMoney;
                        this.evidenceForm.remark = res.data.result.remark;
                        this.evidenceForm.evidences = res.data.result.evidences;
                        this.evidenceForm.id = res.data.result.lendRecordId;
                    } else {
                        this.$message.error(res.data.message);
                    }
                });
            },
            EntryEvidence() {
                if (this.isEvidence) {
                    this.evidenceForm.id = this.borrowerId;
                    borrowerRecordEvidence(this.evidenceForm).then((res) => {
                        if (res.data.result) {
                            this.$message.success(res.data.message);
                            this.dialogFormVisible2 = false;
                            // this.initData();
                        } else {
                            this.$message.error(res.data.message);
                        }
                    });
                } else {
                    borrowerUpdateEvidence(this.evidenceForm).then((res) => {
                        if (res.data.result) {
                            this.$message.success(res.data.message);
                            this.dialogFormVisible2 = false;
                            // this.initData();
                        } else {
                            this.$message.error(res.data.message);
                        }
                    });
                }
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
                            url: res.data.result
                        })
                    }
                }).catch(error => {

                })

            },
            openDialog1() {
                companyList({params: {pageNo: 1}}).then((res) => {
                    if (res.data.result) {
                        this.companyList = res.data.result;
                    } else {
                        this.$message.error(res.data.message);
                    }
                });
            },
            closeDialog1() {
                this.registrationForm = {
                    projectName: "",
                    projectNo: "",
                    contractNo: "",
                    lendMoney: "",
                    lendDate: "",
                    lendDay: "",
                    borrowerName: "",
                    borrowerPhone: "",
                    borrowerIdCard: "",
                    guaranteeCompany: "",
                    interestMoney: ""
                }
            },
            fmtDate(obj) {
                var date = new Date(obj);
                var y = 1900 + date.getYear();
                var m = "0" + (date.getMonth() + 1);
                var d = "0" + date.getDate();
                return y + "-" + m.substring(m.length - 2, m.length) + "-" + d.substring(d.length - 2, d.length);
            },
            editorList(index, row) {
                this.dialogFormVisible1 = true;
                this.isEditor = true;
                this.registrationForm = row;

            },
            openRegistration() {
                this.dialogFormVisible1 = true;
                this.isEditor = false;

            },
            deleteList(index, row) {
                this.$confirm('此操作将永久删除, 是否继续?', '注意', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    lendRecordDeleteMyLend({params: {id: row.id}}).then((res) => {
                        if (res.data.result) {
                            this.$message.success(res.data.message);
                            this.initData();
                        } else {
                            this.$message.error(res.data.message);
                        }
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
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

    .allMoney {
        margin-bottom: 10px;
    }

    .allMoney span {
        margin-right: 20px;
    }

.el-table th,
.el-table td {
    text-align: center;
}

</style>

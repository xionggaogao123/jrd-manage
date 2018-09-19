<template>
    <div class="fillcontain">
        <head-top></head-top>
        <div class="table_container">
            <el-table :data="tableData" highlight-current-row style="width: 100%">
                <el-table-column property="projectName" label="项目名称"></el-table-column>
                <el-table-column property="borrowerName" label="借款人姓名"></el-table-column>
                <el-table-column property="borrowerPhone" label="借款人电话号码"></el-table-column>
                <el-table-column property="borrowerPhone" label="推测借款人电话号码"></el-table-column>
                <el-table-column property="borrowerIdCard" label="借款人身份证号"></el-table-column>
                <el-table-column property="borrowerIdCard" label="是否取得联系"></el-table-column>
                <el-table-column property="status" label="是否已还款"></el-table-column>
                <el-table-column property="repayMoney" label="已还款金额"></el-table-column>
                <el-table-column property="type" label="还款类型"></el-table-column>
                <el-table-column property="" label="操作">
                    <template slot-scope="scope">
                        <el-button type="text" @click="entryEvidence(scope.$index,scope.row)">录入还款证据</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="Pagination" style="text-align: left;margin-top: 10px;">
                <el-pagination @current-change="handleCurrentChange" :current-page="currentPage" :page-size="20" layout="total, prev, pager, next" :total="count">
                </el-pagination>
            </div>
        </div>
        <el-dialog title="录入还款证据" :visible.sync="dialogFormVisible" custom-class="dialogFormVisible">
            <el-form :model="evidenceForm">
                <el-form-item label="还入银行" :label-width="formLabelWidth">
                    <el-input v-model="evidenceForm.bank" size="small"></el-input>
                </el-form-item>
                <el-form-item label="银行账号" :label-width="formLabelWidth">
                    <el-input v-model="evidenceForm.account" size="small"></el-input>
                </el-form-item>
                <el-form-item label="还款总额" :label-width="formLabelWidth">
                    <el-input v-model="evidenceForm.total" size="small"></el-input>
                </el-form-item>
                <el-form-item label="相关佐证" :label-width="formLabelWidth">
                    <el-upload action="https://jsonplaceholder.typicode.com/posts/" list-type="picture-card">
                        <i class="el-icon-plus"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="备注" :label-width="formLabelWidth">
                    <el-input v-model="evidenceForm.desc" size="small"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="EntryEvidence">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import headTop from '../components/headTop'
import { borrowerListMyBorrower } from '@/api/getData'

export default {
    data() {
        return {
            tableData: [],
            count: 0,
            currentPage: 1,
            dialogFormVisible: false,
            formLabelWidth: "80px",
            evidenceForm: {}
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
            borrowerListMyBorrower({ params: { pageNo: 1 } }).then((res) => {
                if (res.data.result) {
                    this.tableData = res.data.result.data;
                    this.totalCount = res.data.result.total;
                } else {
                    this.$message.error(res.data.message);
                }
            });
        },
        handleCurrentChange(val) {

        },
        entryEvidence(index, row) {
            this.dialogFormVisible = true;
        },
        EntryEvidence() {

        },
    },
}

</script>
<style lang="less">
@import '../style/mixin';

.table_container {
    padding: 20px;
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
.dialogFormVisible .el-upload-list--picture-card .el-upload-list__item,.dialogFormVisible .el-upload--picture-card{
    width: 80px;
    height: 80px;
    line-height: 80px;
}
</style>

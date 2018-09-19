<template>
    <div class="fillcontain">
        <head-top></head-top>
        <div class="table_container">
            <el-table :data="tableData" highlight-current-row style="width: 100%">
                <el-table-column property="projectName" label="项目名称"></el-table-column>
                <el-table-column property="borrowerName" label="出借人姓名"></el-table-column>
                <el-table-column property="borrowerName" label="出借人电话"></el-table-column>
                <el-table-column property="borrowerName" label="借款人姓名"></el-table-column>
                <el-table-column property="borrowerPhone" label="借款人电话号码"></el-table-column>
                <el-table-column property="borrowerPhone" label="推测借款人电话号码"></el-table-column>
                <el-table-column property="borrowerIdCard" label="借款人身份证号"></el-table-column>
                <el-table-column property="borrowerIdCard" label="是否取得联系"></el-table-column>
                <el-table-column property="status" label="是否已还款"></el-table-column>
                <el-table-column property="repayMoney" label="已还款金额"></el-table-column>
                <el-table-column property="type" label="还款类型"></el-table-column>
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
import { borrowerListAllBorrower } from '@/api/getData'

export default {
    data() {
        return {
            tableData: [],
            totalCount: 0,
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
        initData() {
            borrowerListAllBorrower({ params: { pageNo: 1 } }).then((res) => {
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
    },
}

</script>
<style lang="less">
@import '../style/mixin';

.table_container {
    padding: 20px;
}

</style>

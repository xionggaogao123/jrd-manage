<template>
    <div class="fillcontain">
        <head-top></head-top>
        <div class="table_container">
            <el-table :data="tableData" highlight-current-row style="width: 100%">
                <el-table-column property="name" label="公司名称"></el-table-column>
                <el-table-column property="address" label="公司地址"></el-table-column>
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
import { companyList } from '@/api/getData'

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
            companyList({ params: { pageNo: 1 } }).then((res) => {
                if (res.data.result) {
                    this.tableData = res.data.result;
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
.el-table th,.el-table td{
    text-align: center;
}
</style>

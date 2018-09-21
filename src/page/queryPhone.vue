<template>
    <div class="fillcontain">
        <head-top></head-top>
        <div class="table_container">
            <el-input v-model="idCard" placeholder="身份证号码" size="small" style="width: 200px;"></el-input>
            <el-button type="primary" size="small" @click="search">查询</el-button>
            <el-alert :title="phoneNumber" type="info" style="width: 200px;margin-top: 20px;" v-if="phoneNumber"></el-alert>
        </div>
    </div>
</template>
<script>
import headTop from '../components/headTop'
import { toolSurmisePhone } from '@/api/getData'

export default {
    data() {
        return {
            idCard: "",
            phoneNumber: ""
        }
    },
    components: {
        headTop,
    },
    created() {

    },
    methods: {
        search() {
            toolSurmisePhone({ params: { idCard: this.idCard } }).then((res) => {
                if (res.data.result !== "未能推测出正确的手机号码") {
                    this.$notify.info({
                        title: '查询的手机号为：',
                        message: res.data.result,
                        duration: 0
                    });
                } else {
                    this.$message.error(res.data.result);
                }
            });
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

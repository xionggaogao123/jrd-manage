<template>
    <div class="fillcontain">
        <head-top></head-top>
        <p class="explain_text">公告</p>

        <div class="notice">
                欢迎加入君融贷全国难友联盟！君融贷全国难友联盟是出借人自己研制、管理的平台，意在通过集合君融贷所有出借人的未完全还款项目信息，还原数据，
            从而了解和掌握君融贷资金流向，找出资金链或资产端。并自动统计每位出借人及整个平台待回款总额，解决君融贷官网和手机APP关闭之后，出借人无处查看君融贷各种数据的重大难题。
            同时，难友联盟旨在改变君融贷出借人目前的弱势地位，争取在和政府、君融贷平台的对话中，用详实的数据和证据取得最大话语权，起到监督作用！
        </div>

        <!--<p class="explain_text">欢迎加入君融贷全国难友联盟</p>
        <p class="explain_text">君融贷全国难友联盟是出借人自己研制、管理的平台<p>
        <p class="explain_text">意在通过集合君融贷所有出借人的未完全还款项目信息，还原数据</p>
        <p class="explain_text">从而了解和掌握君融贷资金流向，找出资金链或资产端</p>
        <p class="explain_text">并自动统计每位出借人及整个平台待回款总额，解决君融贷官网和手机APP关闭之后</p>
        <p class="explain_text">出借人无处查看君融贷各种数据的重大难题</p>
        <p class="explain_text">难友联盟旨在改变君融贷出借人目前的弱势地位，争取在和政府、君融贷平台的对话中</p>
        <p class="explain_text">用详实的数据和证据取得最大话语权，起到监督作用</p>-->

    </div>
</template>

<script>
	import headTop from '../components/headTop'
    export default {
    	components: {
    		headTop,
    	},
    }
</script>

<style lang="less">
	@import '../style/mixin';
	.explain_text{
		margin-top: 20px;
		text-align: center;
		font-size: 20px;
		color: #333;
	}

    .notice {
        margin-bottom: 10px;
        margin-left: 60px;
        margin-right: 60px;
        font-size: 18px;
        color: #333;
    }

</style>

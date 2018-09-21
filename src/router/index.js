import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

const login = r => require.ensure([], () => r(require('@/page/login')), 'login');
const manage = r => require.ensure([], () => r(require('@/page/manage')), 'manage');
const statistical = r => require.ensure([], () => r(require('@/page/statistical')), 'statistical');
const allLendList = r => require.ensure([], () => r(require('@/page/allLendList')), 'allLendList');
const companyList = r => require.ensure([], () => r(require('@/page/companyList')), 'companyList');
const evidenceList = r => require.ensure([], () => r(require('@/page/evidenceList')), 'evidenceList');
const notice = r => require.ensure([], () => r(require('@/page/notice')), 'notice');
const explain = r => require.ensure([], () => r(require('@/page/explain')), 'explain');
const queryPhone = r => require.ensure([], () => r(require('@/page/queryPhone')), 'explain');


const myLendList = r => require.ensure([], () => r(require('@/page/myLendList')), 'myLendList');
const myBorrowerList = r => require.ensure([], () => r(require('@/page/myBorrowerList')), 'myBorrowerList');
const allBorrowerList = r => require.ensure([], () => r(require('@/page/allBorrowerList')), 'allBorrowerList');
const fundsLinkList = r => require.ensure([], () => r(require('@/page/fundsLinkList')), 'fundsLinkList');
const trueProjectList = r => require.ensure([], () => r(require('@/page/trueProjectList')), 'trueProjectList');
const falseProjectList = r => require.ensure([], () => r(require('@/page/falseProjectList')), 'falseProjectList');

const routes = [{
        path: '/',
        component: login
    },
    {
        path: '/manage',
        component: manage,
        name: '',
        children: [
        {
            path: '/notice',
            component: notice,
            meta: ["公告"],
        }, {
            path: '/statistical',
            component: statistical,
            meta: ["数据统计"],
        }
        , {
            path: '/companyList',
            component: companyList,
            meta: ["公司列表"],
        },{
            path: '/queryPhone',
            component: queryPhone,
            meta: ["查询手机号"],
        }, {
            path: '/myLendList',
            component: myLendList,
            meta: ['出借人信息登记中心', '我的出借记录'],
        }, {
            path: '/allLendList',
            component: allLendList,
            meta: ['登记中心', '所有平台出借记录'],
        }, {
            path: '/myBorrowerList',
            component: myBorrowerList,
            meta: ['数据中心', '我的借款人'],
        },{
            path: '/allBorrowerList',
            component: allBorrowerList,
            meta: ['数据中心', '全平台借款人'],
        },{
            path: '/fundsLinkList',
            component: fundsLinkList,
            meta: ['数据中心', '资金去向'],
        },{
            path: '/trueProjectList',
            component: trueProjectList,
            meta: ['分析中心', '真表列表'],
        },{
            path: '/falseProjectList',
            component: falseProjectList,
            meta: ['分析中心', '假表列表'],
        },{
            path: '/evidenceList',
            component: evidenceList,
            meta: ['证据中心', '证据列表'],
        }, {
            path: '/explain',
            component: explain,
            meta: ['说明'],
        }]
    }
];

export default new Router({
    routes,
    strict: process.env.NODE_ENV !== 'production',
})

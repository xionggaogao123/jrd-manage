import axios from 'axios'



//let host = 'http://192.168.18.164:9001';


let host = 'http://localhost:9001';

/**
 * 登陆
 */
export const adminLogin =(params) => {
    return axios.post(`${host}/lender/login`, params);
};

/**
 * 注册
 */
export const adminRegister =(params) => {
    return axios.post(`${host}/lender/register`, params);
};

/**
 * 退出登录
 */
export const loginOut =(params) => {
    return axios.get(`${host}/lender/login-out`, params);
};

/**
 * 出借人 登记
 */
export const lendRecordCreate =(params) => {
    return axios.post(`${host}/lend-record/create`, params);
};

/**
 * 我的登记列表
 */
export const lendRecordPagingMyLend =(params) => {
    return axios.get(`${host}/lend-record/paging-my-lend`, params);
};

/**
 * 所有人的登记 列表
 */
export const lendRecordPagingAllLend =(params) => {
    return axios.get(`${host}/lend-record/paging-all-lend`, params);
};

/**
 * 我的借款人
 */
export const borrowerListMyBorrower =(params) => {
    return axios.get(`${host}/borrower/list-my-borrower`, params);
};

/**
 * 所有借款人
 */
export const borrowerListAllBorrower =(params) => {
    return axios.get(`${host}/borrower/list-all-borrower`, params);
};

/**
 * 担保公司列表
 */
export const companyList =(params) => {
    return axios.get(`${host}/company/list`, params);
};

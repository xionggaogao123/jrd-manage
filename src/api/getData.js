import axios from 'axios'
axios.defaults.withCredentials=true;


//let host = 'http://192.168.18.164:9001';
//let host = 'http://192.168.19.94:9001';


let host = "http://192.168.18.46:9001";

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

/**
 * 上传 图片
 */
export const toolUploadImage =(params) => {
    return axios.post(`${host}/tool/upload-image`, params);
};

/**
 * 录人 我的 借款人还款 证据
 */
export const borrowerRecordEvidence =(params) => {
    return axios.post(`${host}/borrower/record-evidence`, params);
};

/**
 * 获取当前 登录用户的 信息
 */
export const lenderUserInfo =(params) => {
    return axios.get(`${host}/lender/user-info`, params);
};

/**
 * 获取当前 登录用户的 信息
 */
export const lenderListAllUserInfo =(params) => {
    return axios.get(`${host}/lender/list-all-userInfo`, params);
};

/**
 * 获取当前 登录用户的 信息
 */
export const  toolSurmisePhone =(params) => {
    return axios.get(`${host}/tool/surmise-phone`, params);
};

/**
 * 删除 我的 出借
 */
export const  lendRecordDeleteMyLend =(params) => {
    return axios.get(`${host}/lend-record/delete-my-lend`, params);
};

/**
 * 更新 我的 出借
 */
export const  lendRecordUpdateMyLend =(params) => {
    return axios.post(`${host}/lend-record/update-my-lend`, params);
};

import request from "../utils/request";

/**
 * 发送短信验证码
 * @param {String} mobile 18612345678	手机号
 */
export const getCodes = ({ mobile }) => {
  return request({
    url: `/v1_0/sms/codes/${mobile}`,
    method: "get",
  });
};
/**
 * 用户认证（登录注册）
 * @param {String} mobile 18612345678	手机号
 * @param {String} code 123456	短信验证码
 */
export const authorizations = ({ mobile, code }) => {
  return request({
    url: "/v1_0/authorizations",
    method: "post",
    data: {
      mobile,
      code,
    },
  });
};
/**
 * 获取当前用户的资料
 */
export const getUserProfile = () => {
  return request({ url: "/v1_0/user/profile" });
};
/**
 * 获取当前用户的信息
 */
export const getUser = () => {
  return request({ url: "/v1_0/user" });
};
/**
 * 修改头像
 * @param {Object} formData -  {photo:'文件数据'}
 */
export const updateUserPhoto = (formData) => {
  return request({
    url: "/v1_0/user/photo",
    method: "patch",
    data: formData,
  });
};
/**
 * 修改用户
 * @param {Object} user - 用户对象
 */
export const updateUser = (user) => {
  return request({
    url: "/v1_0/user/profile",
    method: "patch",
    data: user,
  });
};
/**
 * 取消关注用户
 * @param {String} target - （被取消关注的用户id）
 */
export const delFollowings = (target) => {
  return request({
    url: `/v1_0/user/followings/${target}`,
    method: "delete",
  });
};
/**
 * 关注用户
 * @param {Object} target - （被关注的用户id）
 */
export const followings = ({ target }) => {
  return request({
    url: "/v1_0/user/followings",
    method: "post",
    data: {
      target,
    },
  });
};
// 获取所有频道列表
export const channels = () => {
  return request({
    url: "/v1_0/channels",
    method: "get",
  });
};
/**
 *
 * status	否		文章状态，0-草稿，1-待审核，2-审核通过，3-审核失败，不传为全部
 * channel_id	是		不传为全部
 * begin_pubdate	否		起始时间
 * end_pubdate	否		截止时间
 * page	否		页码 默认为1页
 * per_page 否 每页数量 不传为默认10
 */
// 获取文章列表
export const articles = ({
  status,
  channel_id,
  begin_pubdate,
  end_pubdate,
  page,
  per_page,
}) => {
  return request({
    url: "/v1_0/mp/articles",
    method: "get",
    data: {
      status,
      channel_id,
      begin_pubdate,
      end_pubdate,
      page,
      per_page,
    },
  });
};
// 删除文章
export const delArticles = (target) => {
  return request({
    url: `/v1_0/mp/articles/${target}`,
    method: "delete",
  });
};

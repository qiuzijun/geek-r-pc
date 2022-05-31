import { TOKEN } from "../constant/index";
import { authorizations } from "@/api/user";
import { setToken, clearToken } from "@/utils/auth";

// 登录
export const User = (data) => ({ type: TOKEN, data });
export const Login = ({ mobile, code }) => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      authorizations({ mobile, code })
        .then((data) => {
          setToken(data.data.token);
          dispatch(User(data.data.token));
          resolve();
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
  };
};
// 退出登录
export const logout = () => {
  return (dispatch) => {
    clearToken();
    dispatch(User(""));
  };
};

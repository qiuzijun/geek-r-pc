import { Tabs } from "antd";
// 账号登录组件
import Account from "./components/Account";
// 验证码登录组件
import Code from "./components/Code";
import "./index.scss";
const { TabPane } = Tabs;

const Login = () => {
  const onChange = (key) => {
    // console.log(key);
  };
  return (
    <div className="container">
      <div className="login">
        {/* tab切换 */}
        <div className="loginTab">
          <Tabs defaultActiveKey="1" onChange={onChange}>
            <TabPane tab="账户密码登录" key="1">
              <Account />
            </TabPane>
            <TabPane tab="手机号登录" key="2">
              <Code />
            </TabPane>
          </Tabs>
        </div>
      </div>
    </div>
  );
};
export default Login;

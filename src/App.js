// 导入路由
import { Router, Route, Switch, Redirect } from "react-router-dom";
// 导入页面组件
import Login from "@/pages/Login";
import LayOut from "@/Layout";
import NotFound from "@/pages/NotFound";
import { notification } from "antd";
import "./index.scss";
import AuthRoute from "@/components/AuthRoute/index";
import { customHistory } from "@/utils/history";
import { getCode } from "@/utils/tool";
import initSocket from "@/hooks/socket";
import { useEffect } from "react";
// 配置路由规则
function App() {
  useEffect(() => {
    // 初始化websocket
    initSocket()
      .then((data) => {
        notification["success"]({
          message: "验证码",
          description: getCode(data),
          className: "custom-class",
          style: {
            width: 300,
            fontSize: "16px",
            fontWeight: "bold",
          },
        });
      })
      .catch((err) => {
        notification["error"]({
          message: "验证码",
          description: err,
          className: "custom-class",
          style: {
            width: 300,
          },
        });
      });
  }, []);
  return (
    <Router history={customHistory}>
      <div className="App">
        <Switch>
          <Route path="/login" component={Login}></Route>
          <AuthRoute path="/layout" component={LayOut} />
          <Redirect path="/" to="/layout" />
          <Route>
            <NotFound></NotFound>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
export default App;

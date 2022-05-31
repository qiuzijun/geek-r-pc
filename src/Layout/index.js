import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./index.scss";
import RouterView from "@/router/RouterView";
import Nav from "./Nav";
import routes from "@/router";
// 处理子路由
const { children } = routes.find((data) => {
  return data.children;
});
const { Header, Sider, Content } = Layout;

const LayOut = () => {
  const [router, setRouter] = useState("");
  const [collapsed, setCollapsed] = useState(false);
  const history = useHistory();
  const onRouter = (e) => {
    history.push(`${e.key}`);
  };
  useEffect(() => {
    setRouter(history.location.pathname);
  }, [history.location.pathname]);
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo">
          <img src={require("../assets/image/logo.png")} alt="" />
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[router]}
          items={children}
          onClick={onRouter}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{
            padding: 0,
          }}
        >
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: () => setCollapsed(!collapsed),
            }
          )}
          <Nav />
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: "24px 16px",
            minHeight: 280,
          }}
        >
          <RouterView routes={children} />
        </Content>
      </Layout>
    </Layout>
  );
};

export default LayOut;

import { lazy } from "react";
import {
  PieChartOutlined,
  SolutionOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
const Login = lazy(() => import("@/pages/Login"));
const Layout = lazy(() => import("@/Layout"));
const Panel = lazy(() => import("@/pages/Panel"));
const Content = lazy(() => import("@/pages/Content"));
const Article = lazy(() => import("@/pages/Article"));
const NotFound = lazy(() => import("@/pages/NotFound"));

// 封装路由
const routes = [
  // 配置一级路由
  {
    path: "/",
    redirect: "/login",
    exact: true,
  },
  {
    path: "/login",
    component: Login,
    exact: false,
  },
  {
    path: "/layout",
    component: Layout,
    exact: false,
    // 配置二级路由
    children: [
      {
        key: "/layout/panel",
        label: "数据面板",
        path: "/layout/panel",
        component: Panel,
        icon: <PieChartOutlined />,
      },
      {
        key: "/layout/content",
        label: "内容管理",
        path: "/layout/content",
        component: Content,
        icon: <SolutionOutlined />,
      },
      {
        key: "/layout/article",
        label: "发布文章",
        path: "/layout/article",
        component: Article,
        icon: <FileTextOutlined />,
      },
    ],
  },
  // 找不到路径的时候 进行匹配
  {
    path: "*",
    component: NotFound,
    exact: false,
  },
];

//  路由导出
export default routes;

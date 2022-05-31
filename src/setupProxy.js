// 因为是cjs 需要require ，不能使用import
// 在初始化脚手架的时候http-proxy-middleware已经下载了
const { createProxyMiddleware: proxy } = require("http-proxy-middleware");
// 暴露一个对象
module.exports = function (app) {
  //调用app的use方法
  app.use(
    proxy("/api", {
      // 遇到/api1前缀的请求，就会触发该代理配置
      // 转发给谁
      target: "http://geek.itheima.net",
      // 让服务器知道从哪发出的 控制服务器收到的请求头的Host字段的值
      changeOrigin: true,
      // 把api1 替换成空格。去除请求前缀，保证交给后台服务器是正常请求地址
      pathRewrite: { "^/api": "" },
    })
  );
};

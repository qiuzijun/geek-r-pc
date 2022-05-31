import { io } from "socket.io-client";
let socket = null;
const initSocket = function () {
  return new Promise((resolve, reject) => {
    socket = io("http://geek.itheima.net?key=hmlgnb", {
      transports: ["websocket"],
    }); // 创建连接 创建连接写入秘钥
    socket.on("connect", function () {
      console.log("连接建立成功");
    });
    socket.on("disconnect", function () {
      console.log("服务器通讯中断！");
      reject("服务器通讯中断！");
    });
    socket.on("message", function (data) {
      resolve(data);
    });
  });
};

export default initSocket;

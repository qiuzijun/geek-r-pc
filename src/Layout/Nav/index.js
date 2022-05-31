import { Avatar, message, Popconfirm } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "@/store/actions";
import "./index.scss";
const Nav = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const confirm = () => {
    dispatch(logout());
    history.push("/login");
    message.success("退出成功");
  };
  return (
    <div className="nav">
      <Avatar src="https://joeschmoe.io/api/v1/random" />
      <Popconfirm
        title="是否确认退出？"
        onConfirm={confirm}
        okText="退出"
        cancelText="取消"
      >
        <span className="out">
          <LogoutOutlined /> 退出
        </span>
      </Popconfirm>
    </div>
  );
};
export default Nav;

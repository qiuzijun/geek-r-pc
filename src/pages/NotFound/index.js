import "./index.scss";
const NotFound = () => {
  return (
    <div className="NotFound">
      <img src={require("../../assets/404/NotFound.png")} alt="" />
      <p>找不到该页面</p>
    </div>
  );
};

export default NotFound;

import { Button, Checkbox, Form, Input, message } from "antd";
import { LockOutlined, MobileOutlined } from "@ant-design/icons";
import { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { Login } from "@/store/actions";
import { getCodes } from "@/api/user";
import "./index.scss";

let timer;
const Code = () => {
  const inputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState(true);
  const [time, setTime] = useState(60);
  const dispatch = useDispatch();
  const history = useHistory();
  const onFinish = (values) => {
    const { mobile, code, remember } = values;
    if (!remember) {
      message.warning("请勾选我已阅读并同意");
    } else {
      // 登录
      dispatch(Login({ mobile, code }))
        .then(() => {
          history.replace("/layout/panel");
        })
        .catch((err) => {
          console.log(err);
          message.error("登录失败");
        });
    }
  };
  // 发送验证码
  const sendCode = () => {
    if (inputRef.current.input.value) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setCode(false);
        CountDown();
        getCodes({ mobile: inputRef.current.input.value })
          .then((data) => {
            message.success("发送成功");
            // console.log(data);
          })
          .catch((err) => {
            console.log(err);
            message.error("发送失败");
          });
      }, 1000);
    } else {
      message.warning("请输入手机号");
    }
  };
  useEffect(() => {
    clearInterval(timer);
    return () => clearInterval(timer);
  }, []);
  useEffect(() => {
    if (time <= 0) {
      clearInterval(timer);
      setTime(60);
      setCode(true);
    }
  }, [time]);
  // 倒计时
  const CountDown = () => {
    timer = setInterval(() => {
      setTime((time) => time - 1);
    }, 1000);
  };
  return (
    <Form
      name="normal_login"
      className="login-form"
      size="large"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
    >
      <Form.Item
        name="mobile"
        rules={[
          {
            required: true,
            message: "请输入手机号!",
          },
          {
            pattern: /^1[3-9]\d{9}$/,
            message: "手机格式不正确",
          },
        ]}
      >
        <Input
          ref={inputRef}
          prefix={<MobileOutlined className="site-form-item-icon" />}
          placeholder="手机号"
          autoComplete="off"
        />
      </Form.Item>
      <Form.Item
        name="code"
        rules={[
          {
            required: true,
            message: "请输入验证码!",
          },
          { len: 6, message: "验证码6个字符串" },
        ]}
      >
        <div style={{ display: "flex" }}>
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder="验证码"
            autoComplete="off"
          />
          {code ? (
            <Button className="sendCode" loading={loading} onClick={sendCode}>
              发送验证码
            </Button>
          ) : (
            <Button className="sendCode">{time}秒</Button>
          )}
        </div>
      </Form.Item>
      <Form.Item className="checked">
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>我已阅读并同意「用户协议」和「隐私条款」</Checkbox>
        </Form.Item>

        <a className="login-form-forgot" href="">
          忘记密码？
        </a>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          登录
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Code;

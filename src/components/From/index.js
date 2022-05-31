import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Button,
  Radio,
  Select,
  Upload,
  Modal,
  Switch,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
const { Option } = Select;
const MyFrom = (props) => {
  const [value, setValue] = useState(1); //编辑所属频道
  const [previewVisible, setPreviewVisible] = useState(false); //图片上传
  const [previewImage, setPreviewImage] = useState(""); //上传图片地址
  const [previewTitle, setPreviewTitle] = useState(""); //上传图片名
  const [fileList, setFileList] = useState([]); //上传图片集合
  const [draft, setDraft] = useState(true); //是否存为草稿
  //   监听抽屉显示隐藏
  useEffect(() => {});
  //   抽屉隐藏
  const onClose = () => {
    props.close();
  };
  //   提交表单
  const onFinish = (values) => {
    console.log("Success:", values);
    console.log(draft);
  };
  // 表单提交错误
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  //   编辑选择框
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  //   图片类型单选框
  const onChange = (e) => {
    setValue(e.target.value);
  };
  //   图片上传默认按钮
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );
  //   图片格式转换
  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => resolve(reader.result);

      reader.onerror = (error) => reject(error);
    });
  const handleCancel = () => setPreviewVisible(false);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  const UploadChange = ({ fileList: newFileList }) => setFileList(newFileList);

  return (
    <Form
      name="basic"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="文章标题"
        name="title"
        rules={[
          {
            required: true,
            message: "请输入文章标题!",
          },
        ]}
      >
        <Input placeholder="文章标题" />
      </Form.Item>

      <Form.Item
        label="所属频道"
        name="channel"
        rules={[
          {
            required: true,
            message: "请选择频道！",
          },
        ]}
      >
        <Select
          style={{
            width: 120,
          }}
          onChange={handleChange}
        >
          <Option value="jack">Jack</Option>
          <Option value="lucy">Lucy</Option>
          <Option value="Yiminghe">yiminghe</Option>
        </Select>
      </Form.Item>
      <Form.Item label="文章封面" name="cover">
        <Radio.Group onChange={onChange} value={value}>
          <Radio value={1}>单图</Radio>
          <Radio value={3}>三图</Radio>
          <Radio value={0}>无图</Radio>
        </Radio.Group>
      </Form.Item>
      <>
        <Upload
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          listType="picture-card"
          fileList={fileList}
          onPreview={handlePreview}
          onChange={UploadChange}
        >
          {fileList.length >= value ? null : uploadButton}
        </Upload>
        <Modal
          visible={previewVisible}
          title={previewTitle}
          footer={null}
          onCancel={handleCancel}
        >
          <img
            alt="example"
            style={{
              width: "100%",
            }}
            src={previewImage}
          />
        </Modal>
      </>
      <Form.Item
        label="文章内容"
        name="content"
        wrapperCol={{ span: 16 }}
        rules={[{ required: true, message: "请输入文章内容" }]}
        initialValue=""
      >
        <ReactQuill placeholder="请输入文章内容" />
      </Form.Item>
      <div style={{ margin: "15px 0" }}>
        <label htmlFor="draft">是否存为草稿：</label>
        <Switch
          id="draft"
          defaultChecked
          onChange={() => {
            setDraft(!draft);
          }}
        />
      </div>
      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          编辑
        </Button>

        <Button onClick={onClose}>取消</Button>
      </Form.Item>
    </Form>
  );
};
export default MyFrom;

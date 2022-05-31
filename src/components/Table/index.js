import React, { useEffect, useState } from "react";
import { Table, Tag, Space, Image, Popconfirm, message, Drawer } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useCallbackState } from "@/hooks/useCallbackState";
import MyFrom from "../From/index";
import "./index.scss";
const statusList = [
  {
    key: 0,
    color: "",
    value: "草稿",
  },
  {
    key: 1,
    color: "gold",
    value: "待审核",
  },
  {
    key: 2,
    color: "green",
    value: "已通过",
  },
  {
    key: 3,
    color: "red",
    value: "已拒绝",
  },
];
const MyTable = (props) => {
  const columns = [
    {
      title: "封面",
      dataIndex: "cover",
      key: "cover",
      render: (text) => <Image width={100} height={100} src={text} />,
    },
    {
      title: "标题",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "状态",
      key: "status",
      dataIndex: "status",
      render: (_, { status }) => {
        const { value, color } = statusList.find((data) => {
          return data.key == status;
        });
        return (
          <>
            <Tag color={color}>{value}</Tag>
          </>
        );
      },
    },
    {
      title: "发布时间",
      dataIndex: "time",
      key: "time",
    },
    {
      title: "阅读数",
      dataIndex: "read_count",
      key: "read_count",
    },
    {
      title: "评论数",
      dataIndex: "comment_count",
      key: "comment_count",
    },
    {
      title: "点赞数",
      dataIndex: "like_count",
      key: "like_count",
    },
    {
      title: "操作",
      key: "action",
      render: (event) => {
        const confirm = (e) => {
          if (event.status == 2) {
            message.warning("该文章已经发布，不允许直接删除，请先编辑后删除");
          } else {
            Delete(event.key);
            message.success("删除成功");
          }
        };
        const showDrawer = () => {
          setVisible(true);
        };
        return (
          <Space size="middle">
            <a href="#" onClick={showDrawer}>
              <EditOutlined />
            </a>
            <Popconfirm
              title="确定删除这篇文章吗？"
              onConfirm={confirm}
              okText="删除"
              cancelText="取消"
            >
              <a href="#">
                <DeleteOutlined />
              </a>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];
  const [visible, setVisible] = useState(false); //抽屉显示隐藏
  const [data, setData] = useCallbackState([]); //表格数据
  //   获取表格数据
  const getData = () => {
    if (props.data.results) {
      const newData = props.data.results.map((item) => {
        return {
          key: item.id,
          cover: item.cover.images[0],
          title: item.title,
          status: item.status,
          time: item.pubdate,
          read_count: item.read_count,
          comment_count: item.comment_count,
          like_count: item.like_count,
        };
      });
      setData((pre) => {
        return [...newData];
      });
    }
  };
  //   监听props变化
  useEffect(() => {
    getData();
  }, [props]);
  //   删除表行数据
  const Delete = (id) => {
    setData((pre) => {
      return pre.filter((data) => {
        return data.key !== id;
      });
    });
  };
  //   关闭抽屉
  const onClose = () => {
    setVisible(false);
  };
  return (
    <>
      <Table
        columns={columns}
        dataSource={data}
        scroll={{
          y: 400,
        }}
      />
      <Drawer
        title="文章编辑"
        placement="right"
        size="large"
        onClose={onClose}
        visible={visible}
      >
        <MyFrom close={onClose}></MyFrom>
      </Drawer>
    </>
  );
};

export default MyTable;

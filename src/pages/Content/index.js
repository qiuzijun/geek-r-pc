import React, { useEffect, useState } from "react";
import { useCallbackState } from "@/hooks/useCallbackState";
import { Radio, Select, DatePicker, Space, Button, message } from "antd";
import moment from "moment";
import "moment/locale/zh-cn";
import locale from "antd/es/date-picker/locale/zh_CN";
import { channels, articles } from "@/api/user";
import MyTable from "@/components/Table";
import "./index.scss";
const { Option } = Select;
const { RangePicker } = DatePicker;
const radioList = [
  {
    key: -1,
    value: "全部",
  },
  {
    key: 0,
    value: "草稿",
  },
  {
    key: 1,
    value: "待审核",
  },
  {
    key: 2,
    value: "已通过",
  },
  {
    key: 3,
    value: "已拒绝",
  },
];
const Content = () => {
  const [value, setValue] = useState(-1); //状态
  const [props, setProps] = useCallbackState({}); //表格数据
  const [from, setFrom] = useState({
    //筛选参数
    status: "", //状态
    channel_id: "", //频道id
    begin_pubdate: "", //起始时间
    end_pubdate: "", //截止时间
    page: 1, //页码
    per_page: 10, //页数据条数
  });
  const [channelsList, setChannelsList] = useCallbackState([]); //频道列表
  // 获取所有频道列表
  const getChannels = () => {
    channels()
      .then((data) => {
        setChannelsList([...data.data.channels]);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //   状态
  const onChange = (e) => {
    setValue(e.target.value);
    setFrom({ ...from, status: e.target.value });
  };
  //   频道
  const handleChange = (value) => {
    setFrom({ ...from, channel_id: value });
  };
  //   日期
  const onChangeTime = (now) => {
    const beginTime = moment(now[0]._d).format("YYYY-MM-DD");
    const endTime = moment(now[1]._d).format("YYYY-MM-DD");
    setFrom({ ...from, begin_pubdate: beginTime, end_pubdate: endTime });
  };
  //   筛选
  const onScreen = () => {
    if (from.channel_id == "") {
      message.warning("请选择筛选频道");
    } else {
      //   console.log(from);
      articles(from)
        .then((data) => {
          //   console.log(data);
          setProps({ ...data.data });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  useEffect(() => {
    getChannels();
  }, []);
  return (
    <div className="content">
      <div className="screen">
        <div className="radio">
          <label htmlFor="Radio">状态：</label>
          <Radio.Group id="Radio" onChange={onChange} value={value}>
            {radioList.map((data) => {
              return (
                <Radio key={data.key} value={data.key}>
                  {data.value}
                </Radio>
              );
            })}
          </Radio.Group>
        </div>
        <div className="Select">
          <label htmlFor="Select">频道：</label>
          <Select
            id="Select"
            style={{
              width: 120,
            }}
            onChange={handleChange}
          >
            {channelsList.length > 0 ? (
              channelsList.map((data) => {
                return (
                  <Option key={data.id} value={data.id}>
                    {data.name}
                  </Option>
                );
              })
            ) : (
              <Option value={"加载中"}>加载中</Option>
            )}
          </Select>
        </div>
        <div className="time">
          <label htmlFor="time">日期：</label>
          <Space id="time" direction="vertical" size={12}>
            <RangePicker onChange={onChangeTime} locale={locale} />
          </Space>
        </div>
        <Button type="primary" onClick={onScreen}>
          筛选
        </Button>
      </div>
      <div className="list">
        <h4 className="list-title">根据筛选条件共查询5000条结果:</h4>
        <div className="list-content">
          <MyTable data={props} />
        </div>
      </div>
    </div>
  );
};

export default Content;

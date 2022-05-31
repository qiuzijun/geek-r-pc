import { useEffect, useRef, useState } from "react";
import * as echarts from "echarts";
import { releaseCount, visitsCount } from "@/api/data";
import { useCallbackState } from "@/hooks/useCallbackState";
import "./index.scss";
const Panel = () => {
  const visits = useRef(null);
  const release = useRef(null);
  const [RData, setRData] = useCallbackState([]);
  const [VData, setVData] = useCallbackState([]);

  //   发布文章数量
  const initRelease = async () => {
    const array = await getRelease();
    const dataName = [];
    const dataCount = [];
    array.forEach((item) => {
      dataName.push(item.name);
      dataCount.push(item.releasePieceCount);
    });
    const myChart = echarts.init(release.current);
    let option = {
      xAxis: {
        type: "category",
        data: dataName,
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          data: dataCount,
          type: "bar",
        },
      ],
    };

    option && myChart.setOption(option);
    window.addEventListener("resize", function () {
      myChart.resize();
    });
  };
  //   文章访问量
  const initVisits = async () => {
    const array = await getVisits();
    const dataName = [];
    const dataCount = [];
    array.forEach((item) => {
      dataName.push(item.name);
      dataCount.push(item.count);
    });
    const myChart = echarts.init(visits.current);
    let option = {
      xAxis: {
        type: "category",
        data: dataName,
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          data: dataCount,
          type: "bar",
        },
      ],
    };

    option && myChart.setOption(option);
    window.addEventListener("resize", function () {
      myChart.resize();
    });
  };
  //   发布文章数量
  const getRelease = () => {
    return new Promise((resole, reject) => {
      releaseCount()
        .then(({ data }) => {
          setRData([...data.data.result], (data) => {
            resole(data);
          });
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
  };
  //   获取文章访问量
  const getVisits = () => {
    return new Promise((resole, reject) => {
      visitsCount()
        .then(({ data }) => {
          setVData([...data.data.visits], (data) => {
            resole(data);
          });
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
  };

  useEffect(() => {
    initRelease();
    initVisits();
  }, []);
  return (
    <div className="panel">
      <div className="visits">
        <h3>文章访问量</h3>
        <div className="visitsContent">
          <div className="visitsChar" ref={visits}></div>
          <div className="ranking">
            <h4>频道排名</h4>
            <ul>
              {VData.map((data, index) => {
                return (
                  <li key={data.name}>
                    <div className="king_name">
                      <div className="king">{index + 1}</div>
                      <div className="name">{data.name}</div>
                    </div>
                    <div className="count">{data.count}</div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
      <div className="release">
        <h3>发布文章数量</h3>
        <div className="releaseChar" ref={release}></div>
      </div>
    </div>
  );
};

export default Panel;

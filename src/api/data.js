import axios from "axios";

// 用户发布文章数量
export const releaseCount = () => {
  return axios.get("http://localhost:3000/data/release.json");
};
// 用户发布文章访问量
export const visitsCount = () => {
  return axios.get("http://localhost:3000/data/visits.json");
};

import axios from "axios";

export default axios.create({
  // baseURL: "https://0ao4gnpagc.execute-api.ap-northeast-2.amazonaws.com/Prod",
  baseURL: "https://my-json-server.typicode.com/go4real/dummy-qna-api",
  headers: {
    "Content-type": "application/json"
  }
});
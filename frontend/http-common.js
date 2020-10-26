import axios from "axios";

// const dev = process.env.NODE_ENV !== 'production';
// const BASE_URL = dev? "https://0ao4gnpagc.execute-api.ap-northeast-2.amazonaws.com/Prod": 
//                 "https://dqqryphhuqfyi.cloudfront.net/Prod";

const BASE_URL = "/Prod";

export default axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-type": "application/json"
  }
});

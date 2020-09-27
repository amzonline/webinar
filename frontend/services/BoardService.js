import http from "../http-common";

const getAll = (event_id) => {
  // return http.get("/get_item_list", {
  return http.get("/board", {
    params: {
      event_id: event_id,
      page_size: 20
    }
  });
};

export default {
  getAll
}
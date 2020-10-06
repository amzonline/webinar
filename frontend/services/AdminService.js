import http from "../http-common";

const getEventMeta = (eventId) => {
  return http.post("/admin/event", {
    eventNo: eventId
  })
};

export default {
  getEventMeta
}
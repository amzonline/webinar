import http from "../http-common";

const getEventMeta = (eventId) => {
  return http.post("/admin/event", {
    eventNo: eventId
  })
};

const getEventStatus = (eventId) => {
  return http.post("/admin/event", {
    eventNo: eventId,
    status: "on"
  })
};

export default {
  getEventMeta,
  getEventStatus
}
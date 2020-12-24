import http from "../http-common";


const sendUserLog = (eventId, userId, pageId, timestamp, sourceIp) => {
  return http.post("/userlog", {
    "DeliveryStreamName": "webinarx-userlog",
    "Record": {
        "Data": {"event_id": ""+eventId, "user_id":userId, "page_id":pageId, "timestamp":timestamp, "sourceAddr":sourceIp}
    }
  });
}

export default {
  sendUserLog
}
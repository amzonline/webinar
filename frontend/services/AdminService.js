import http from "../http-common";
import { isDev } from "./Util";

const getEventMeta = (eventId) => {
  console.log('AdminService.getEvnetMeta 실행...')
  if (!isDev()) {
    return http.post("/admin/event", {
      eventNo: eventId
    })
  }
  const response = {
    "data": {
      "message": {
        "eventId": eventId,
        "eventNo": 7,
        "eventName": "[10/08] 새로운 웨비나 플랫폼 소개",
        "type": "L",
        "status": "READY",
        "siteOpen": "1",
        "needAuth": "0",
        "startDate": "2020-10-08 15:00:00",
        "endDate": "2020-10-08 17:00:00",
        "maxCapacity": 100,
        "obsUrl": "2",
        "playbackKey": "3",
        "playbackUrl": "https://0b377682ced3.us-west-2.playback.live-video.net/api/video/v1/us-west-2.223427183593.channel.wiHiuxdpsmEf.m3u8",
        // "feedbackUrl": "https://tmuckaup10.execute-api.ap-northeast-2.amazonaws.com/Prod/survey/admin/2020_seoul_summit"
        "feedbackUrl": "/survey"
      }
    }
  };
  return response
};

const getEventStatus = (eventId) => {
  if (!isDev()) {
    return http.post("/admin/event", {
      eventNo: eventId,
      status: "on"
    })
  }
  const response = {
    "data": {
      "message": {
        "status": "START"
      }
    }
  };
  return response
};

export default {
  getEventMeta,
  getEventStatus
}
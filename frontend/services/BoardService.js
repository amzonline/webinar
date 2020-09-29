import http from "../http-common";

const getAll = (event_id) => {
  return http.get("/get_item_list", {
  // return http.get("/board", {
    params: {
      event_id: event_id,
      page_size: 20
    }
  });
};

const insertItem = (token, eventId, title, content, isPublic) => {
  return http.post("/insert_item", {
    event_id: eventId,
    title: title,
    content: content,
    is_public: isPublic
  }, {
    headers: {
      'Authorization': token
    }
  });
}

const insertReply = (token, eventId, uid, content) => {
  return http.post("/insert_reply", {
    event_id: eventId,
    uid: uid,
    content: content
  }, {
    headers: {
      'Authorization': token
    }
  });
}

export default {
  getAll,
  insertItem,
  insertReply
}
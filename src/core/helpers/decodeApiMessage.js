const decodeApiMessage = (payload) => {
  if (payload?.message) return payload?.message;
  if (Object.keys(payload).length > 0) return Object.values(payload).join();
  return "";
};

export default decodeApiMessage;

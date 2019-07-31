export const combineChat = (chat) => {
  const combined = [];
  chat.forEach((message) => {
    const {
      _id, messageOwner,
      content, timestamp,
    } = message;
    if (combined.length > 0) {
      const lastCombined = combined[combined.length - 1];
      const { messageOwner: last, contents } = lastCombined;
      if (last === messageOwner) {
        combined[combined.length - 1] = {
          ...lastCombined,
          contents: contents.concat({ _id, content, timestamp }),
        };
      } else {
        combined.push({ _id: combined.length, messageOwner, contents: [{ _id, content, timestamp }] });
      }
    } else {
      combined.push({ _id: combined.length, messageOwner, contents: [{ _id, content, timestamp }] });
    }
  });
  return combined;
};

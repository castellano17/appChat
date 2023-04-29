const Conversations = require("../models/conversations.models");
const Messages = require("../models/messages.models");
const uuid = require("uuid");
const Participants = require("../models/participants.models");

const getMsgByConversationId = async (conversationId) => {
  const data = await Messages.findAll({
    where: {
      conversationId: conversationId,
    },
    order: [
      ["name", "ASC"],
      ["createdAt", "DESC"],
    ],
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
    include: [
      {
        model: Participants,
        where: { conversationId },
      },
    ],
  });
  return data;
};

const createMessage = async (data, userId) => {
  // console.log(data);
  const response = await Messages.create({
    id: uuid.v4(),
    // userId: userId,
    content: data.content,
    participantId: data.participantId,
  });
  return response;
};

const getMsgByMessageId = async (id, conversationId) => {
  const data = await Messages.findOne({
    where: {
      id,
      conversationId,
    },

    include: [
      {
        model: Conversations,
        attributes: ["name"],
      },
    ],
  });
  return data;
};

const deleteMsgByMessageId = async (id, conversationId) => {
  const data = await Messages.destroy({
    where: {
      id,
      conversationId,
    },
  });
  return data;
};
module.exports = {
  // 3.c
  createMessage,
  getMsgByConversationId,
  // 3.d
  getMsgByMessageId,
  deleteMsgByMessageId,
};

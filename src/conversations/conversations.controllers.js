const uuid = require("uuid");
const Conversations = require("../models/conversations.models");
const Participants = require("../models/participants.models");

const findAllConversations = async (userId) => {
  const conversations = await Conversations.findAll({
    where: {
      userId: userId,
    },
    attributes: {
      exclude: ["userId", "createdAt", "updatedAt"],
    },
  }); // Trae las conversaciones del usuario
  return conversations;
};

const findConversationsById = async (id) => {
  const data = await Conversations.findOne({
    where: {
      id: id,
    },
    attributes: {
      exclude: ["userId", "createdAt", "updatedAt"],
    },
  });
  return data;
};

const createConversation = async (conversationObject, userId) => {
  const data = await Conversations.create({
    id: uuid.v4(),
    name: conversationObject.name,
    profileImage: conversationObject.profileImage,
    userId: conversationObject.userId,
  });

  await Participants.create({
    id: uuid.v4(),
    conversationId: data.id,
    userId: conversationObject.userId,
  });
  await Participants.create({
    id: uuid.v4(),
    conversationId: data.id,
    userId: conversationObject.ParticipantId,
  });
  return data;
};

const updateConversation = async (id, conversationObject) => {
  const selectedConversation = await Conversations.findOne({
    where: {
      id: id,
    },
  });

  if (!selectedConversation) return null;

  const modifiedConversation = await selectedConversation.update(
    conversationObject
  );
  return modifiedConversation;
};

const deletedConvesation = async (id) => {
  const conversation = await Conversations.destroy({
    where: {
      id: id,
    },
  });
  return conversation;
};

module.exports = {
  findAllConversations,
  findConversationsById,
  createConversation,
  updateConversation,
  deletedConvesation,
};

const uuid = require("uuid");
const Conversations = require("../models/conversations.models");

const findAllConversations = async (createdBy) => {
  const conversations = await Conversations.findAll({
    where: {
      createdBy: createdBy,
    },
  }); // Trae las conversaciones del usuario
  return conversations;
};

const findConversationsById = async (id) => {
  const data = await Conversations.findOne({
    where: {
      id: id,
    },
  });
  return data;
};

const createConversation = async (conversationObject, createdBy) => {
  const newConversation = {
    id: uuid.v4(),
    name: conversationObject.name,
    profileImage: conversationObject.profileImage,
    createdBy: createdBy,
  };
  const data = await Conversations.create(newConversation);
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

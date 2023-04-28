const Participants = require("../models/participants.models");
const uuid = require("uuid");
const Users = require("../models/users.models");
const Conversations = require("../models/conversations.models");

const findAllParticipants = async (conversationId) => {
  const data = await Participants.findAll({
    where: {
      conversationId,
    },
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
  });
  return data;
};

const createParticipant = async (conversationId, userId) => {
  const data = await Participants.create({
    id: uuid.v4(),
    conversationId,
    userId,
  });
  return data;
};

const getParticipantById = (conversationId, id) =>
  Participants.findOne({
    where: {
      conversationId,
      id,
    },
    attributes: {
      exclude: ["createdAt", "updatedAt", "conversationId", "userId"],
    },
    include: [
      {
        model: Users,
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      },
      {
        model: Conversations,
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      },
    ],
  });

const deleteParticipant = (conversationId, id) =>
  Participants.destroy({
    where: {
      conversationId,
      id,
    },
  });

module.exports = {
  findAllParticipants,
  createParticipant,
  getParticipantById,
  deleteParticipant,
};

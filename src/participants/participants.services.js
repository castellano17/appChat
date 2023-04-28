const participantsControllers = require("./participants.controllers");

const getAllParticipants = (req, res) => {
  const id = req.params.id;

  participantsControllers
    .findAllParticipants(id)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status().json({ message: err.message });
    });
};

const postParticipant = (req, res) => {
  const { id: conversationId } = req.params;
  const { id: userID } = req.user;

  participantsControllers
    .createParticipant(conversationId, userID)
    .then((data) => {
      res.status(201).json(data);
    })
    .catch(({ message }) => {
      res.status(400).json({ message });
    });
};

//? b
const getParticipantById = async (req, res) => {
  try {
    const { id, participantId } = req.params;
    const data = await participantsControllers.getParticipantById(
      id,
      participantId
    );
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteParticipant = async (req, res) => {
  try {
    const { id, participantId } = req.params;
    const data = await participantsControllers.deleteParticipant(
      id,
      participantId
    );
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getAllParticipants,
  postParticipant,

  getParticipantById,
  deleteParticipant,
};

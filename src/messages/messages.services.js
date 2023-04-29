const messageControllers = require("./messages.controllers");

const getMsgByConversationId = (req, res) => {
  const conversationId = req.params.id;
  messageControllers
    .getMsgByConversationId(conversationId)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
};

const createMessage = (req, res) => {
  // const userId = req.user.id; //? Este es el id del usuario loggeado
  const { content, participantId } = req.body;
  // const conversationId = req.params.id;
  if (content && participantId) {
    messageControllers
      .createMessage({ content, participantId })
      .then((data) => {
        res.status(201).json(data);
      })
      .catch((err) => {
        res.status(400).json(err.message);
      });
  } else {
    res.status(400).json({
      content: "Missing Data",
      fields: {
        content: "string",
        participantId: "uuid",
      },
    });
  }
};

const getMsgByMessageId = (req, res) => {
  const { messageId, participantId } = req.params.id;

  console.log({ participantId, messageId });
  messageControllers
    .getMsgByMessageId(messageId, participantId)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
};

const deleteMsgByMessageId = (req, res) => {
  const { id: conversationId, messageId } = req.params;
  messageControllers
    .deleteMsgByMessageId(messageId, conversationId)
    .then((data) => {
      if (data) {
        res.status(204).json();
      } else {
        res.status(404).json({ message: "Invalid ID" });
      }
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
};

module.exports = {
  getMsgByConversationId,
  createMessage,
  getMsgByMessageId,
  deleteMsgByMessageId,
};

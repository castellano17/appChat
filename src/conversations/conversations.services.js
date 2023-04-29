const conversationsControllers = require("./conversations.controllers");

const getAllConversations = (req, res) => {
  const userId = req.user.id;
  conversationsControllers
    .findAllConversations(userId)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(400).json({ err: err.message });
    });
};

const getConversationById = (req, res) => {
  const id = req.params.conversation_id;

  conversationsControllers
    .findConversationsById(id)
    .then((data) => {
      if (data) {
        res.status(200).json(data);
      } else {
        res.status(404).json({ message: "Invalid ID" });
      }
    })
    .catch((err) => {
      res.status(404).json({ message: err.message });
    });
};

const postConversation = (req, res) => {
  const { name, profileImage, guestId } = req.body;
  const userId = req.user.id;
  conversationsControllers
    .createConversation({
      name,
      profileImage,
      userId,
      guestId,
    })
    .then((data) => {
      res.status(201).json(data);
    })
    .catch((err) => {
      res.status(400).json({
        message: err.message,
        fields: {
          name: "String",
          profileImage: "String",
          guestId: "String",
        },
      });
    });
};

const deleteConversation = (req, res) => {
  const id = req.params.conversation_id;
  conversationsControllers
    .deletedConvesation(id)
    .then((data) => {
      if (data) {
        res.status(204).json();
      } else {
        res
          .status(400)
          .json({ message: `Conversation with id:${id}, Not Found` });
      }
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

const patchConversation = (req, res) => {
  const id = req.params.conversation_id;
  const { name, profileImage } = req.body;
  conversationsControllers
    .updateConversation(id, { name, profileImage })
    .then(() => {
      res
        .status(200)
        .json({ message: "Your conversation was edited succesfully!" });
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
};

module.exports = {
  getAllConversations,
  getConversationById,
  postConversation,
  deleteConversation,
  patchConversation,
};

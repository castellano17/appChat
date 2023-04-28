const router = require("express").Router();

const passport = require("passport");
const conversationsServices = require("./conversations.services");
const messagesServices = require("../messages/messages.services");
const participantsServices = require("../participants/participants.services");

//* 1. /api/v1/conversations
//*     1. Esta ruta debe estar protegida//
//*     2. Debera mostrar las conversaciones del usuario loggeado//
//*     3. Podras crear conversaciones nuevas//

router
  .route("/")
  .get(
    passport.authenticate("jwt", { session: false }),
    conversationsServices.getAllConversations
  )
  .post(
    passport.authenticate("jwt", { session: false }),
    conversationsServices.postConversation
  );
//* 2. /api/v1/conversations/:conversation_id
//*     1. Esta ruta debe estar protegida//
//*     2. Debera mostrar una conversacion en especifico//
//*     3. La podras eliminar y modificar desde aqui//

router
  .route("/:conversation_id")
  .get(
    passport.authenticate("jwt", { session: false }),
    conversationsServices.getConversationById
  )
  .delete(
    passport.authenticate("jwt", { session: false }),
    conversationsServices.deleteConversation
  )
  .patch(
    passport.authenticate("jwt", { session: false }),
    conversationsServices.patchConversation
  );

router
  .route("/:id/messages")
  .get(
    passport.authenticate("jwt", { session: false }),
    messagesServices.getMsgByConversationId
  )
  .post(
    passport.authenticate("jwt", { session: false }),
    messagesServices.createMessage
  );

router
  .route("/:id/messages/:messageId")
  .get(
    passport.authenticate("jwt", { session: false }),
    messagesServices.getMsgByMessageId
  )
  .delete(
    passport.authenticate("jwt", { session: false }),
    messagesServices.deleteMsgByMessageId
  );

//? Optionals a y b
router
  .route("/:id/participants")
  .get(
    passport.authenticate("jwt", { session: false }),
    participantsServices.getAllParticipants
  )
  .post(
    passport.authenticate("jwt", { session: false }),
    participantsServices.postParticipant
  );

router
  .route("/:id/participants/:participantId")
  .get(
    passport.authenticate("jwt", { session: false }),
    participantsServices.getParticipantById
  )
  .delete(
    passport.authenticate("jwt", { session: false }),
    participantsServices.deleteParticipant
  );

module.exports = router;

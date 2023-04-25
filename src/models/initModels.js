const Users = require("./users.models");
const Conversations = require("./conversations.models");
const Messages = require("./messages.models");
const Participants = require("./participants.models");

const initModels = () => {
  //? Users -> Participants
  //* Un usuario tiene muchas conversaciones
  Users.hasMany(Conversations);
  //* Una conversación le pertenece a un usuario
  Conversations.belongsTo(Users);

  //? Conversations -> Participants
  //* Un usuario es participante de muchas conversaciones
  Users.hasMany(Participants);
  //* Participans le pertenece a un usuario
  Participants.belongsTo(Users);

  //? Participants -> Messages
  //* Una conversacion tiene muchos participantes
  Conversations.hasMany(Participants);
  //* Participants le pertenece a una conversación
  Participants.belongsTo(Conversations);

  //? Users -> Messages
  //* Un usuario envia muchos mensajes
  Users.hasMany(Messages);
  //* Un mensaje le pertenece a un usuario
  Messages.belongsTo(Users);

  //? Conversations -> Messages
  //* Una conversacion tiene muchos mensajes
  Conversations.hasMany(Messages);
  //* Un mensaje le pertenece a una conversacion
  Messages.belongsTo(Conversations);
};

module.exports = initModels;

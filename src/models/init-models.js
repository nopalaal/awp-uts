var DataTypes = require("sequelize").DataTypes;
var _event = require("./event");
var _eventgambar = require("./eventgambar");
var _eventpartner = require("./eventpartner");
var _galeri = require("./galeri");
var _interest = require("./interest");
var _mediapartner = require("./mediapartner");
var _program = require("./program");
var _task = require("./task");
var _user = require("./user");

function initModels(sequelize) {
  var event = _event(sequelize, DataTypes);
  var eventgambar = _eventgambar(sequelize, DataTypes);
  var eventpartner = _eventpartner(sequelize, DataTypes);
  var galeri = _galeri(sequelize, DataTypes);
  var interest = _interest(sequelize, DataTypes);
  var mediapartner = _mediapartner(sequelize, DataTypes);
  var program = _program(sequelize, DataTypes);
  var task = _task(sequelize, DataTypes);
  var user = _user(sequelize, DataTypes);

  eventgambar.belongsTo(event, { as: "idEvent_event", foreignKey: "idEvent"});
  event.hasMany(eventgambar, { as: "eventgambars", foreignKey: "idEvent"});
  eventpartner.belongsTo(event, { as: "idEvent_event", foreignKey: "idEvent"});
  event.hasMany(eventpartner, { as: "eventpartners", foreignKey: "idEvent"});
  eventpartner.belongsTo(mediapartner, { as: "idMediaPartner_mediapartner", foreignKey: "idMediaPartner"});
  mediapartner.hasMany(eventpartner, { as: "eventpartners", foreignKey: "idMediaPartner"});
  event.belongsTo(program, { as: "idProgram_program", foreignKey: "idProgram"});
  program.hasMany(event, { as: "events", foreignKey: "idProgram"});
  galeri.belongsTo(program, { as: "idProgram_program", foreignKey: "idProgram"});
  program.hasMany(galeri, { as: "galeris", foreignKey: "idProgram"});
  galeri.belongsTo(user, { as: "idUser_user", foreignKey: "idUser"});
  user.hasMany(galeri, { as: "galeris", foreignKey: "idUser"});
  interest.belongsTo(user, { as: "idUser_user", foreignKey: "idUser"});
  user.hasMany(interest, { as: "interests", foreignKey: "idUser"});
  program.belongsTo(user, { as: "idManager_user", foreignKey: "idManager"});
  user.hasMany(program, { as: "programs", foreignKey: "idManager"});
  task.belongsTo(user, { as: "idManager_user", foreignKey: "idManager"});
  user.hasMany(task, { as: "tasks", foreignKey: "idManager"});
  task.belongsTo(user, { as: "idAdmin_user", foreignKey: "idAdmin"});
  user.hasMany(task, { as: "idAdmin_tasks", foreignKey: "idAdmin"});

  return {
    event,
    eventgambar,
    eventpartner,
    galeri,
    interest,
    mediapartner,
    program,
    task,
    user,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;

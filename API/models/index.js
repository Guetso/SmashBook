const Sequelize = require('sequelize')
const dbConfig = require('../config/db.config')
const PlayerModel = require('./player')
const CharacterModel = require('./character')
const ParticipantModel = require('./participant')
const MatchModel = require('./match')

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
})

const Player = PlayerModel(sequelize, Sequelize)
const Character = CharacterModel(sequelize, Sequelize)
const Participant = ParticipantModel(sequelize,Sequelize)
const Match = MatchModel(sequelize, Sequelize)

Player.belongsToMany(Character, { through: Participant, unique: false })
Character.belongsToMany(Player, { through: Participant, unique: false })
Participant.belongsToMany(Match, { through: 'match_participant', unique: false })
Match.belongsToMany(Participant, { through: 'match_participant', unique: false })

sequelize.sync({ force: true }).then(() => {
  // force option to false when in production
  console.log(`Database & tables created!`)
})

module.exports = {
  Player,
  Character,
  Participant,
  Match
}

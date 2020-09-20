const Sequelize = require('sequelize')
const dbConfig = require('../config/db.config')
const PlayerModel = require('./player')
const CharacterModel = require('./character')
const ParticipantModel = require('./participant')
const MatchModel = require('./match')
const MatchParticipantModel = require('./match_participant')
const PodiumModel = require('./podium')
const StockModel = require('./stock')

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
const Participant = ParticipantModel(sequelize, Sequelize)
const Match = MatchModel(sequelize, Sequelize)
const MatchParticipant = MatchParticipantModel(sequelize, Sequelize)
const Podium = PodiumModel(sequelize, Sequelize)
const Stock = StockModel(sequelize, Sequelize)

Player.belongsToMany(Character, { through: Participant, unique: false })
Character.belongsToMany(Player, { through: Participant, unique: false })

Participant.belongsToMany(Match, {
  through: MatchParticipant,
  unique: false
})
Match.belongsToMany(Participant, {
  through: MatchParticipant,
  unique: false
})

Match.hasOne(Podium, {
  foreignKey: {
    allowNull: false,
    unique: true
  }
})
Podium.belongsTo(Match)

MatchParticipant.hasOne(Stock, {
  foreignKey: {
    allowNull: false,
    unique: true
  }
})

Stock.belongsTo(MatchParticipant)

sequelize.sync({ force: true }).then(() => {
  // force option to false when in production
  console.log(`Database & tables created!`)
})

module.exports = {
  Player,
  Character,
  Participant,
  Match,
  MatchParticipant,
  Podium,
  Stock
}

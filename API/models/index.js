const Sequelize = require('sequelize')
const dbConfig = require('../config/db.config')
const PlayerModel = require('./player')
const CharacterModel = require('./character')
const MatchModel = require('./match')
const ParticipationModel = require('./participation')
const StockModel = require('./stock')
const PodiumModel = require('./podium')

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
const Match = MatchModel(sequelize, Sequelize)
const Participation = ParticipationModel(sequelize, Sequelize)
const Stock = StockModel(sequelize, Sequelize)
const Podium = PodiumModel(sequelize, Sequelize)

sequelize.sync({ force: true }).then(() => {
  // force option to false when in production
  console.log(`Database & tables created!`)
})

module.exports = {
  Player,
  Character,
  Match,
  Participation,
  Stock,
  Podium
}

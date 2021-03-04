const Sequelize = require('sequelize')
const PlayerModel = require('./player')
const CharacterModel = require('./character')
const MatchModel = require('./match')
const ParticipationModel = require('./participation')
const StockModel = require('./stock')
const PodiumModel = require('./podium')
const charactersList = require('../datas/characters')

const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    dialectOptions: {
      charset: process.env.DB_CHARSET,
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
)

const Player = PlayerModel(sequelize, Sequelize)
const Character = CharacterModel(sequelize, Sequelize)
const Match = MatchModel(sequelize, Sequelize)
const Participation = ParticipationModel(sequelize, Sequelize)
const Stock = StockModel(sequelize, Sequelize)
const Podium = PodiumModel(sequelize, Sequelize)

sequelize
  .sync({ force: process.env.SQ_FORCE === 'true' ? true : false })
  .then(() => {
    // force option to false when in production
    Player.hasMany(Participation)
    Participation.hasMany(Stock, {
      foreignKey: 'from_participation_id',
    })
    /*     Participation.hasMany(Stock, {
      foreignKey: 'to_participation_id',
    }) */

    charactersList.forEach((character) => {
      Character.create({
        name: character.name,
        from: character.from,
        imageUrl: character.imageUrl,
        gameId: character.gameId,
      })
    })
    console.log(`Database & tables created!`)
  })

module.exports = {
  Player,
  Character,
  Match,
  Participation,
  Stock,
  Podium,
}

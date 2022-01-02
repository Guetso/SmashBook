const Sequelize = require('sequelize')
const PlayerModel = require('./player')
const CharacterModel = require('./character')
const MatchModel = require('./match')
const ParticipationModel = require('./participation')
const StockModel = require('./stock')
const PodiumModel = require('./podium')
const SessionModel = require('./session')
const charactersList = require('../datas/characters')

const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
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
const Session = SessionModel(sequelize, Sequelize)

sequelize
  .sync({ force: process.env.SQ_FORCE === 'true' ? true : false })
  .then(() => {
    // force option to false when in production
    Player.hasMany(Participation)
    Participation.hasMany(Stock, {
      foreignKey: 'from_participation_id',
    })
    Participation.hasMany(Podium, {
      foreignKey: 'participation_id',
    })
    Match.hasMany(Participation, {
      foreignKey: 'match_id',
    })
    Session.hasMany(Match, {
      foreignKey: 'session_id',
    })
    Match.belongsTo(Session)
    Player.hasMany(Match, { foreignKey: 'created_by' })
    Match.belongsTo(Player, { foreignKey: 'created_by', as: 'creator' })

    if (process.env.SQ_FORCE === 'true') {
      charactersList.forEach((character) => {
        Character.create({
          name: character.name,
          from: character.from,
          imageUrl: character.imageUrl,
          gameId: character.gameId,
        })
      })
    }
    console.log(`Database & tables created!`)
  })

module.exports = {
  Player,
  Character,
  Match,
  Participation,
  Stock,
  Podium,
  Session,
}

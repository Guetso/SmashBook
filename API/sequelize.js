const Sequelize = require('sequelize')
const PlayerModel = require('./models/player')
const CharacterModel = require('./models/character')

const sequelize = new Sequelize('smashbookdb', 'guetso', 'polo2068', {
  host: 'localhost',
  dialect: 'mysql',
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
})

const Player = PlayerModel(sequelize, Sequelize)
const Character = CharacterModel(sequelize, Sequelize)
const Participant = sequelize.define('player_character', {})

Player.belongsToMany(Character, { through: Participant, unique: false })
Character.belongsToMany(Player, { through: Participant, unique: false })

sequelize.sync({ force: true }).then(() => { // force option to false when in production
  console.log(`Database & tables created!`)
})

module.exports = {
  Player,
  Character,
  Participant
}

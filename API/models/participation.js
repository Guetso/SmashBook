module.exports = (sequelize, type) => {
  return sequelize.define('participation', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true
    },
    player_id: {
      type: type.INTEGER,
      primaryKey: true,
      references: {
        model: 'players',
        key: 'id'
      }
    },
    character_id: {
      type: type.INTEGER,
      primaryKey: true,
      references: {
        model: 'characters',
        key: 'id'
      }
    },
    match_id: {
      type: type.INTEGER,
      primaryKey: true,
      references: {
        model: 'matches',
        key: 'id'
      }
    }
  })
}

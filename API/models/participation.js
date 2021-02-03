module.exports = (sequelize, Datatypes) => {
  return sequelize.define('participation', {
    id: {
      type: Datatypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true
    },
    player_id: {
      type: Datatypes.INTEGER,
      primaryKey: true,
      references: {
        model: 'players',
        key: 'id'
      }
    },
    character_id: {
      type: Datatypes.INTEGER,
      primaryKey: true,
      references: {
        model: 'characters',
        key: 'id'
      }
    },
    match_id: {
      type: Datatypes.INTEGER,
      primaryKey: true,
      references: {
        model: 'matches',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    }
  })
}

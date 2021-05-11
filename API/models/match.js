module.exports = (sequelize, Datatypes) => {
  return sequelize.define('match', {
    id: {
      type: Datatypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true
    },
    stocks: {
      type: Datatypes.INTEGER,
      allowNull: false
    },
    players: {
      type: Datatypes.INTEGER,
      allowNull: false
    },
    createdBy: {
      type: Datatypes.INTEGER,
      allowNull: false,
      references: {
        model: 'players',
        key: 'id'
      }
    },
    isOver: {
      type: Datatypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  })
}

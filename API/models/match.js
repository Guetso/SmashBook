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
    }
  })
}

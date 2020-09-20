module.exports = (sequelize, type) => {
  return sequelize.define('match', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true
    },
    stocks: {
      type: type.INTEGER,
      allowNull: false
    },
    players: {
      type: type.INTEGER,
      allowNull: false
    }
  })
}

module.exports = (sequelize, type) => {
  return sequelize.define('match', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    stocks: {
      type: type.INTEGER,
      allowNull: false,
    }
  })
}
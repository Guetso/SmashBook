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
    },
    closed: {
      type: type.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  })
}
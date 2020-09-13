module.exports = (sequelize, type) => {
  return sequelize.define('participant', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    }
  })
}
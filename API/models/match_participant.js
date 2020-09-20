module.exports = (sequelize, type) => {
  return sequelize.define('match_participants', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true
    }
  })
}

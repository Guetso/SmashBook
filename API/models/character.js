module.exports = (sequelize, type) => {
  return sequelize.define('character', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true
    },
    name: {
      type: type.STRING(50),
      allowNull: false,
      unique: true
    },
    gameId: {
      type: type.INTEGER,
      allowNull: false,
      unique: true
    },
    from: {
      type: type.STRING(50),
      allowNull: true
    }
  })
}

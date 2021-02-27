module.exports = (sequelize, Datatypes) => {
  return sequelize.define('character', {
    id: {
      type: Datatypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true
    },
    name: {
      type: Datatypes.STRING(50),
      allowNull: false,
      unique: true
    },
    gameId: {
      type: Datatypes.STRING(4),
      allowNull: false,
      unique: true
    },
    from: {
      type: Datatypes.STRING(50),
      allowNull: true
    },
    imageUrl: {
      type: Datatypes.STRING,
      allowNull: true
    }
  })
}

const sequelize = require('./index')

module.exports = (sequelize, type) => {
  return sequelize.define('player', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: type.STRING(50),
      allowNull: false,
      unique: true
    },
    email: {
      type: type.STRING(50),
      allowNull: false,
      unique: true
    },
    bio: {
      type: type.TEXT,
      allowNull: true,
      unique: false
    },
    isAdmin: {
      type: type.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    password: {
      type: type.STRING,
      allowNull: false,
      unique: false
    }
  })
}

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
    }/* ,
    player_1: {
      type: type.INTEGER,
      allowNull: false,
    },
    player_2: {
      type: type.INTEGER,
      allowNull: false,
    },
    player_3: {
      type: type.INTEGER,
      allowNull: true,
    },
    player_4: {
      type: type.INTEGER,
      allowNull: true,
    },
    player_5: {
      type: type.INTEGER,
      allowNull: true,
    },
    player_6: {
      type: type.INTEGER,
      allowNull: true,
    },
    player_7: {
      type: type.INTEGER,
      allowNull: true,
    },
    player_8: {
      type: type.INTEGER,
      allowNull: true,
    } */
  })
}
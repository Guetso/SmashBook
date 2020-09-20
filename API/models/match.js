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
      allowNull: false,
    },
    player_1: {
      type: type.INTEGER,
      allowNull: false,
      references: {
        model: 'participants',
        key: 'id'
      } 
    },
    player_2: {
      type: type.INTEGER,
      allowNull: false,
      references: {
        model: 'participants',
        key: 'id'
      } 
    },
    player_3: {
      type: type.INTEGER,
      allowNull: true,
      references: {
        model: 'participants',
        key: 'id'
      } 
    },
    player_4: {
      type: type.INTEGER,
      allowNull: true,
      references: {
        model: 'participants',
        key: 'id'
      } 
    },
    player_5: {
      type: type.INTEGER,
      allowNull: true,
      references: {
        model: 'participants',
        key: 'id'
      } 
    },
    player_6: {
      type: type.INTEGER,
      allowNull: true,
      references: {
        model: 'participants',
        key: 'id'
      } 
    },
    player_7: {
      type: type.INTEGER,
      allowNull: true,
      references: {
        model: 'participants',
        key: 'id'
      } 
    },
    player_8: {
      type: type.INTEGER,
      allowNull: true,
      references: {
        model: 'participants',
        key: 'id'
      }
    }
  })
}
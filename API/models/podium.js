module.exports = (sequelize, type) => {
  return sequelize.define(
    'podium',
    {
      first: {
        type: type.INTEGER,
        allowNull: false,
        references: {
          model: 'participants',
          key: 'id'
        } 
      },
      second: {
        type: type.INTEGER,
        allowNull: false,
        references: {
          model: 'participants',
          key: 'id'
        } 
      },
      third: {
        type: type.INTEGER,
        allowNull: true,
        references: {
          model: 'participants',
          key: 'id'
        } 
      },
      fourth: {
        type: type.INTEGER,
        allowNull: true,
        references: {
          model: 'participants',
          key: 'id'
        } 
      },
      fifth: {
        type: type.INTEGER,
        allowNull: true,
        references: {
          model: 'participants',
          key: 'id'
        } 
      },
      sixth: {
        type: type.INTEGER,
        allowNull: true,
        references: {
          model: 'participants',
          key: 'id'
        } 
      },
      seventh: {
        type: type.INTEGER,
        allowNull: true,
        references: {
          model: 'participants',
          key: 'id'
        } 
      },
      heighth: {
        type: type.INTEGER,
        allowNull: true,
        references: {
          model: 'participants',
          key: 'id'
        }
      }
    },
    {freezeTableName: true}
  )
}

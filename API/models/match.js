module.exports = (sequelize, Datatypes) => {
  return sequelize.define(
    'match',
    {
      id: {
        type: Datatypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
      },
      stocks: {
        type: Datatypes.INTEGER,
        allowNull: false,
      },
      players: {
        type: Datatypes.INTEGER,
        allowNull: false,
      },
      created_by: {
        type: Datatypes.INTEGER,
        allowNull: false,
        references: {
          model: 'players',
          key: 'id',
        },
      },
      isOver: {
        type: Datatypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      session_id: {
        type: Datatypes.INTEGER,
        allowNull: false,
        references: {
          model: 'sessions',
          key: 'id',
        },
      },
    },
    {
      underscored: true, // Avoid to Sequelize convert player_id into playerId when using association queries
    }
  )
}

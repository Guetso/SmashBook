module.exports = (sequelize, Datatypes) => {
  return sequelize.define(
    'session',
    {
      id: {
        type: Datatypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
      },
      date: {
        type: Datatypes.DATEONLY,
        defaultValue: Datatypes.NOW,
      },
    },
    {
      underscored: true, // Avoid to Sequelize convert player_id into playerId when using association queries
    }
  )
}

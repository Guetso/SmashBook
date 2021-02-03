module.exports = (sequelize, Datatypes) => {
  return sequelize.define('podium', {
    participation_id: {
      type: Datatypes.INTEGER,
      primaryKey: true,
      references: {
        model: 'participations',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    place: {
      type: Datatypes.INTEGER,
      allowNull: false
    }
  })
}

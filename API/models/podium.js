module.exports = (sequelize, type) => {
  return sequelize.define('podium', {
    participation_id: {
      type: type.INTEGER,
      primaryKey: true,
      references: {
        model: 'participations',
        key: 'id'
      }
    },
    place: {
      type: type.INTEGER,
      allowNull: false
    }
  })
}

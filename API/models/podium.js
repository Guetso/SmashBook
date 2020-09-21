module.exports = (sequelize, type) => {
  return sequelize.define('podium', {
    participation_id: {
      type: type.INTEGER,
      primaryKey: true,
      references: {
        model: 'participations',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    place: {
      type: type.INTEGER,
      allowNull: false
    }
  })
}

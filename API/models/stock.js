module.exports = (sequelize, type) => {
  return sequelize.define('stock', {
    from_participation_id: {
      type: type.INTEGER,
      primaryKey: true,
      references: {
        model: 'participations',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    to_participation_id: {
      type: type.INTEGER,
      primaryKey: true,
      references: {
        model: 'participations',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    stock: {
      type: type.INTEGER,
      allowNull: false
    }
  })
}

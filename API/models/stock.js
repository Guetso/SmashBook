module.exports = (sequelize, Datatypes) => {
  return sequelize.define('stock', {
    from_participation_id: {
      type: Datatypes.INTEGER,
      primaryKey: true,
      references: {
        model: 'participations',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    to_participation_id: {
      type: Datatypes.INTEGER,
      primaryKey: true,
      references: {
        model: 'participations',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    stock: {
      type: Datatypes.INTEGER,
      allowNull: false
    }
  })
}

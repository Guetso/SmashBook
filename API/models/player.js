module.exports = (sequelize, Datatypes) => {
  return sequelize.define(
    'player',
    {
      id: {
        type: Datatypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
      },
      name: {
        type: Datatypes.STRING(50),
        allowNull: false,
        unique: true,
      },
      email: {
        type: Datatypes.STRING(50),
        allowNull: false,
        unique: true,
      },
      bio: {
        type: Datatypes.TEXT,
        allowNull: true,
        unique: false,
      },
      isAdmin: {
        type: Datatypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      password: {
        type: Datatypes.STRING,
        allowNull: false,
        unique: false,
      },
      imageUrl: {
        type: Datatypes.STRING,
        allowNull: true,
      },
    },
    { collate: 'utf8mb4_bin' }
  )
}

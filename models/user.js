// Creating our User model
module.exports = function (sequelize, DataTypes) {
  const User = sequelize.define('User', {
    // email cannot be null, and must be a proper email before creation
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    // Username cannot be false
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [6, 20]
      }
    },
    // password cannot be null
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  })
  return User

  
}


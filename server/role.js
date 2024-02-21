require("dotenv").config();
const sequelize = require('./db');

const { User } = require('./models/models'); 



async function changeUserRole(userId, newRole) {
  try {
    
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    
    const user = await User.findByPk(userId);
    if (user) {
      user.role = newRole;
      await user.save();
      console.log('User role has been successfully updated.');
    } else {
      console.log('User not found.');
    }
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  } finally {
    
    await sequelize.close();
  }
}


const args = process.argv.slice(2);
const userId = args[0];
const newRole = args[1];


if (!userId || !newRole) {
  console.error('Usage: npm run changeRole <userId> <newRole>');
  process.exit(1);
}


changeUserRole(userId, newRole); 


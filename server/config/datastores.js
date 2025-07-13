// filepath: /home/lam/Desktop/Jtis/Sails-React/server/config/datastores.js
module.exports.datastores = {
  default: {
    adapter: 'sails-mongo',
    url: process.env.MONGO_URI,
    // database: 'CMS-database',
    // migrate: 'safe' // <-- Add this line
  }
};

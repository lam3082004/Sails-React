// filepath: /home/lam/Desktop/Jtis/Sails-React/server/config/datastores.js
module.exports.datastores = {
  default: {
    adapter: 'sails-mongo',
    url: 'mongodb+srv://lam3082004:lam3082004@cms-database.omtcheu.mongodb.net/cms_db?retryWrites=true&w=majority&appName=CMS-database&tls=true&tlsAllowInvalidCertificates=true',
    // database: 'CMS-database',
    // migrate: 'safe' // <-- Add this line
  }
};

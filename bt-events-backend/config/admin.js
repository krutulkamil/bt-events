module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '3cc0c2a1c178a973644c14fd8518f202'),
  },
});

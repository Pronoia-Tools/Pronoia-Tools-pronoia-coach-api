const dotenv = require('dotenv');
const path = require('path');
const Joi = require('joi');

dotenv.config({ path: path.join(__dirname, '../.env') });

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid('production', 'development', 'test').required(),
    PORT: Joi.number().default(3000),
    DB_DIALECT: Joi.string().valid('sqlite', 'mysql', 'mariadb', 'postgres', 'mssql').required().description('DB Type'),
    DB_STORAGE: Joi.string().default('./database.sqlite').required().description('DB Storage'),
    FIREBASE_API_KEY: Joi.string().required().description('Firebase Api key'),
    FIREBASE_AUTH_DOMAIN: Joi.string().required().description('Firebase Auth Domain'),
    FIREBASE_PROJECT_ID: Joi.string().required().description('Firebase Project Id'),
    FIREBASE_STORAGE_BUCKET: Joi.string().required().description('Firebase Storage Bucket'),
    FIREBASE_MESSAGING_SENDER_ID: Joi.string().required().description('Firebase Messaging Sender Id'),
    FIREBASE_APP_ID: Joi.string().required().description('Firebase App Id'),
    FIREBASE_MEASUREMENT_ID: Joi.string().required().description('Firebase Measurement Id'),
    })
  .unknown();

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  firebase: {
    apiKey: envVars.FIREBASE_API_KEY,
    authDomain: envVars.FIREBASE_AUTH_DOMAIN,
    projectId: envVars.FIREBASE_PROJECT_ID,
    storageBucket: envVars.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: envVars.FIREBASE_MESSAGING_SENDER_ID,
    appId: envVars.FIREBASE_APP_ID,
    measurementId: envVars.FIREBASE_MEASUREMENT_ID
  },
  db_settings: {
    dialect: envVars.DB_DIALECT,
    storage: envVars.DB_STORAGE
  },
};
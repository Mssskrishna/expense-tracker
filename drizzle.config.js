/** @type { import("drizzle-kit").Config } */
export default {
  schema: "./utils/schema.jsx",
  dialect: 'postgresql',
  dbCredentials: {
    url: 'postgresql://neondb_owner:j5RfevtkqLO1@ep-muddy-mode-a5gew9qs.us-east-2.aws.neon.tech/Expenses-Tracker?sslmode=require',
  }
};  
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173/";
const PORT = process.env.PORT || 3006;

// Configuración para PostgreSQL en Railway
const DATABASE_URL = process.env.DATABASE_URL || "postgresql://postgres:AQMzbJvzPgRzkHudGzHroHnGgwOISsWj@monorail.proxy.rlwy.net:56261/railway";

module.exports = {
  FRONTEND_URL,
  PORT,
  DATABASE_URL,
};
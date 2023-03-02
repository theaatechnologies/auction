export const SERVICE_NAME = process.env.SERVICE_NAME || "auction";
export const PORT = process.env.PORT || "3000";

export const NODE_KEEP_ALIVE_TIMEMOUT_MS =
  Number(process.env.NODE_KEEP_ALIVE_TIMEMOUT_MS) || 65_000;

// Envvars for default database connection
export const PGDATABASE = process.env.PGDATABASE || "test";
export const PGHOST = process.env.PGHOST || "localhost";
export const PGPORT = Number(process.env.PGPORT) || 54320;
export const PGUSER = process.env.PGUSER || "test";
export const PGPASSWORD = process.env.PGPASSWORD || "test";

export class Config {
  constructor() {
  }
}

export const ENV = {
  API_HASH: process.env.API_HASH,
  API_TS: process.env.API_TS,
  API_KEY: process.env.API_KEY,
  API_URL: process.env.API_URL
}

export const AUTH_PARAMS = `ts=${ENV.API_TS}&apikey=${ENV.API_KEY}&hash=${ENV.API_HASH}`

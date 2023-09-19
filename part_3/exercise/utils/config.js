require('dotenv').config()

const POSTGRES_USERNAME = process.env.POSTGRES_USERNAME
const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD
const POSTGRES_HOSTURL = process.env.POSTGRES_HOSTURL
const POSTGRES_DATABASE = process.env.POSTGRES_DATABASE
const SECRET = process.env.SECRET

const DATABASE_URL = `postgres://${POSTGRES_USERNAME}:${POSTGRES_PASSWORD}@${POSTGRES_HOSTURL}:5432/${POSTGRES_DATABASE}`

module.exports = {
    DATABASE_URL,
    PORT: process.env.PORT || 3001,
    SECRET
}
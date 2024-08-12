import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.join((process.cwd(), '.env')) })

export default {
    port : process.env.PORT,
    DB: process.env.dburl,
    NODE_ENV: process.env.NODE_ENV
}
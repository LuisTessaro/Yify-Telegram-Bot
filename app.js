require('dotenv').config()

const config = require('./config')
const token = process.env.BOT_TOKEN

const bot = config.setUpBot(token)
bot.launch()

console.log('[INFO] Bot started.')





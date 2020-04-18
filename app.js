require('dotenv').config()

const config = require('./config')
const token = process.env.BOT_TOKEN

const express = require('express')
const app = express()

app.listen(process.env.PORT, () => console.log('[INFO] Server Running'))

const bot = config.setUpBot(token)
bot.launch()

console.log('[INFO] Bot started.')





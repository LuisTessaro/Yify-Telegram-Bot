const Telegraf = require('telegraf')

module.exports.setUpBot = (token) => {
  const telegrafInstance = new Telegraf(token)
  require('./bot')(telegrafInstance)
  return telegrafInstance
}

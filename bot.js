const search = require('./search-movie')

const Extra = require('telegraf/extra')
const Markup = require('telegraf/markup')

module.exports = (bot) => {
  bot.command(['start', 'help', 'commands'], ctx => {
    ctx.reply('Use /search (Movie Title/IMDb Code, Actor Name/IMDb Code, Director Name/IMDb Code!')
  })

  bot.command('search', async ctx => {
    const term = ctx.message.text.split('/search')[1]
    console.log(ctx.message.from)

    if (term) {
      const movies = await search(term)
      if (movies && movies.length > 0) {
        const torrentsInfo = movies.map(movie => {
          return {
            title: movie.title,
            year: movie.year,
            summary: movie.summary,
            medium_cover_image: movie.medium_cover_image,
            torrentInfo: movie.torrents.map(torrent => {
              return {
                text: `${torrent.quality} ${torrent.size}`,
                url: torrent.url
              }
            })
          }
        })
        torrentsInfo.forEach(info => {
          const keyboard = Markup.inlineKeyboard(buildKeyboard(info.torrentInfo))
          const text = `${info.title} - ${info.year}\n${info.summary} \n${info.medium_cover_image}`
          sendMessage(ctx, text, keyboard)
        })
      } else ctx.reply('No movie found')
    } else
      return ctx.reply('Please provide a Movie Title/IMDb Code, Actor Name/IMDb Code or Director Name/IMDb Code')
  })
}

function sendMessage(ctx, messageInfo, keyboard) {
  return ctx.reply(messageInfo, Extra.markup(keyboard))
}


function buildKeyboard(links) {
  return links.map(link => [{ text: link.text, url: link.url, hide: false }])
}

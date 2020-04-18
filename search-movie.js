const queryString = 'https://yts.mx/api/v2/list_movies.json'
const axios = require('axios')

module.exports = async (queryParam) => {
  const nonSpacedParam = queryParam.replace(' ', '+')
  try {
    const response = await axios.get(`${queryString}?query_term=${nonSpacedParam}`)
    const { data } = await response
    const movieData = data.data
    const parsedResponse = parseMovies(movieData.movies)
    return parsedResponse
  } catch (e) {
    console.log(e)
    return 'Erro'
  }
}

function parseMovies(movies) {
  if (movies)
    return movies.map(movie => {
      return {
        title: movie.title,
        year: movie.year,
        summary: movie.summary,
        medium_cover_image: movie.medium_cover_image,
        torrents: movie.torrents,
      }
    }
    )
  return []
}
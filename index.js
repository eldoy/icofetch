const URL = require('url').URL
const axios = require('axios').default
const cheerio = require('cheerio')
const dugg = require('dugg')

function err(message, data) {
  console.error(message)
  const e = { message }
  if (data) {
    console.error(JSON.stringify(data, null, 2))
    e.data = data
  }
  return e
}

module.exports = async function (domain, opt = {}) {
  const net = dugg(opt.settings)
  const protocol = opt.protocol || 'https'
  const uri = `${protocol}://${domain}`

  // Get URL
  let url
  try {
    url = new URL(uri)
  } catch (e) {
    return err(e.message)
  }

  // Fetch web page
  let page
  try {
    page = await axios.get(url.origin)
  } catch (e) {
    return err(e.message, e.response?.data)
  }

  // Extract favicon link
  const $ = cheerio.load(page.data)
  const href = $('link[rel="icon"]').attr('href')

  if (!href) {
    return err('favicon link href not found on page')
  }

  // Download image
  const link = `${url.origin}${href}`
  const name = href.split('/').reverse()[0]

  let file, path
  if (opt.dir) {
    path = `${opt.dir}/${name}`
  }

  try {
    file = await net.download(link, path)
    file.name = name
  } catch (e) {
    return err(e.message)
  }

  // Upload to amazon
  if (opt.settings) {
    let urls
    try {
      urls = await net.upload([file], { timestamp: true })
      return urls[0]
    } catch (e) {
      err(e.message)
    }
  }

  return file
}

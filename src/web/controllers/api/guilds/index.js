const getGuild = require('./getGuild.js')
const editGuild = require('./editGuild.js')
const feeds = require('./feeds/index.js')
const channels = require('./channels/index.js')

module.exports = {
  feeds,
  channels,
  getGuild,
  editGuild
}

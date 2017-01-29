const fileOps = require('../util/updateJSON.js')

function isEmptyObject(obj) {
    for(var prop in obj) {
        if(obj.hasOwnProperty(prop))
            return false;
    }
    return JSON.stringify(obj) === JSON.stringify({});
}

module.exports = function (bot, role) {

  try {var guildRss = require(`../sources/${role.guild.id}.json`)} catch (e) {return}
  var rssList = guildRss.sources
  var found = false

  for (var rssIndex in rssList) {
    let source = rssList[rssIndex]
    if (source.roleSubscriptions != null) {
      var globalSubList = source.roleSubscriptions;
      for (var globalSub in globalSubList) {
        if (globalSubList[globalSub].roleID == role.id) {globalSubList.splice(globalSub, 1); found = true;}
      }
    }
    if (source.filters != null && source.filters.roleSubscriptions != null && source.filters.roleSubscriptions[role.id] != null) {delete source.filters.roleSubscriptions[role.id]; found = true;}
    if (source.filters != null && isEmptyObject(source.filters.roleSubscriptions)) delete source.filters.roleSubscriptions;
    if (source.filters != null && isEmptyObject(source.filters)) delete source.filters;
    if (source.roleSubscriptions != null && source.roleSubscriptions.length == 0) delete source.roleSubscriptions;
  }

  if (found == true) return fileOps.updateFile(role.guild.id, guildRss, `../sources/${role.guild.id}.json`);

}

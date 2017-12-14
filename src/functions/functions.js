module.exports.messageObjToArray = (obj) => {
  return Object
    .entries(obj)
    .map((value) => (value[1]))
    .sort((a,b) => (a.timestamp - b.timestamp))
    // .map((value) => {
    //   let date = new Date(value.timestamp * 1000)
    //   var formattedDate = ('0' + date.getDate()).slice(-2) + '/' + ('0' + (date.getMonth() + 1)).slice(-2) + '/' + date.getFullYear() + ' ' + ('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2);
    //   return Object.assign(value, { timestamp: JSON.stringify(date)})
    // })
}

module.exports.socketToCurrentChatStore = (obj) => {
  let date = new Date(obj.timestamp * 1000)
  return Object.assign(obj, { timestamp: JSON.stringify(date) })
}
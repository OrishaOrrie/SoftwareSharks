module.exports = function() {
  return function(req, res, next) {
    var reqTime = new Date(Date.now())
    var UTCstring = reqTime.toUTCString()
    console.log('--------------')
    console.log('Requst Logged:')
    console.log('--------------')
    console.log('Time: ' + UTCstring)
    console.log('From: ' + req.ip)
    console.log('Type: ' + req.method)
    console.log('Request: ' + req)
    console.log('Response: ' + res)
    next()
  }
}
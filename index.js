 var https = require('https'),
    semver = require('semver'),
    VERSION = require('./package.json').version;


// (String, String, String, Callback<String>)
function resolve (username, repo, range, y) {
  resolve.tags(username, repo, function (err, tags) {
    if (err) { return y(err) }
    y(null, semver.maxSatisfying(tags, range))
  })
}

resolve.latest = function (username, repo, y) {
  resolve.tags(username, repo, function (err, tags) {
    if (err) { return y(err) }
    y(null, tags.filter(semver.valid).sort(semver.lt)[0])
  })
}

// Get array of tags for repo from github api
// (String, String, Callback<Array<String>>) => Void
resolve.tags = function (username, repo, y) {
  var path = ["/repos", username, repo, 'git/refs/tags/'].join('/');

  var req = https.request({
    host: 'api.github.com',
    path: path,
    port: 443,
    method: 'GET',
    headers: {
      'user-agent': 'https://npmjs.org/github-resolver-semver ' + VERSION
    }
  }, function(res) {
    var data = ''
    res.on('end', function() {
      try {
        var tags = JSON.parse(data).map(function (item) {
          return item.ref.split('/').pop()
        })
        y(null, tags)
      } catch (e) {
        y(e)
      }
    })

    res.on('data', function(chunk) {
      data += chunk +''
    })
  })

  req.end()
  req.on('error', function(e) {
    y(e)
  })
}

module.exports = resolve

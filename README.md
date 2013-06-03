# github-resolve-semver
resolve an npm-style semver range to a git tag for a github repo

## usage

    var resolve = require('github-resolve-semver')

    resolve('jden','github-resolve-semver', '0.1.x', function (err, ver) {
      console.log(ver)
      // '0.1.0' (or whatever's the latest)
    })

## api

### `resolve(username: String, repo: String, range: String, Callback<tag: String>) => Void`

Yields the latest version tag satisfying the `range`. Uses the algorithm in `[semver](https://npm.im/semver)`, just like npm.

### `resolve.latest(username: String, repo: String, Callback<tag: String>) => Void`

Yields the latest version tag for the repo.

### `resolve.getTags(username: String, repo: String, Callback<tags: Array<String>) => Void`

Yields an array of all semver tags for the repo.

## installation

    $ npm install github-resolve-semver


## running the tests

From package root:

    $ npm install
    $ npm test


## contributors

- jden <jason@denizac.org>

Special thanks to @tmpvar for [github-latest](https://npm.im/github-latest), on which this work is based.

## license

MIT. (c) 2013 jden <jason@denizac.org>. See LICENSE.md

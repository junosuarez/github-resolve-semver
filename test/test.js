var chai = require('chai')
chai.should()
var expect = chai.expect
var sinon = require('sinon')
chai.use(require('sinon-chai'))

describe('github-resolve-semver', function () {
  var resolve = require('../')
  
  describe('resolve', function () {
    it('finds the latest version which matches the semver range', function (done) {
      resolve.tags = sinon.stub().yields(null, ['a','b','c', '1.0.4','1.5.2'])
      resolve('user', 'repo', '1.x', function (err, res) {
        expect(err).to.be.null
        resolve.tags.should.have.been.calledWith('user','repo')
        res.should.equal('1.5.2')
        done()
      })
    })  
  })
  
  describe('resolve.latest', function () {
    it('finds the latest version', function (done) {
      resolve.tags = sinon.stub().yields(null, ['a','b','c', '1.0.4','1.5.2'])
      resolve.latest('user', 'repo', function (err, res) {
        expect(err).to.be.null
        resolve.tags.should.have.been.calledWith('user','repo')
        res.should.equal('1.5.2')
        done()
      })
    })  
  })

})
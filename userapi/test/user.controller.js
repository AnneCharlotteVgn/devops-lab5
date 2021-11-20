const { expect } = require('chai')
const userController = require('../src/controllers/user')

describe('User', () => {


  describe('Create', () => {

    it('create a new user', (done) => {
      const user = {
        username: 'sergkudinov',
        firstname: 'Sergei',
        lastname: 'Kudinov'
      }
      userController.create(user, (err, result) => {
        expect(err).to.be.equal(null)
        expect(result).to.be.equal('OK')
        done()
      })
    })

    it('passing wrong user parameters', (done) => {
      const user = {
        firstname: 'Sergei',
        lastname: 'Kudinov'
      }
      userController.create(user, (err, result) => {
        expect(err).to.not.be.equal(null)
        expect(result).to.be.equal(null)
        done()
      })
    })

    it('avoid creating an existing user', (done)=> {
      const user = {
        username: 'AnneC',
        firstname: 'Anne-Charlotte',
        lastname: 'VIGNON'
      }
      //Create a user
      userController.create(user, () => {
        //Create the same user again        
        userController.create(user, (err, result) => {
          expect(err).to.not.be.equal(null)
          expect(result).to.not.be.equal(null)
          done()
        })
      })      
    })
  })

  describe('Get', ()=> {
    // TODO Create test for the get method
    it('get a user by username', (done) => {
      const user = {
        username: 'AnneC',
        firstname: 'Anne-Charlotte',
        lastname: 'VIGNON'
      }
      
      //Create a user
      userController.create(user, () => {
        //Get an existing user
        userController.get(user.username, (err, result) => {
          expect(err).to.be.equal(null)
          expect(result).to.be.devicePixelRatio.equal({
            first: 'Anne-Charlotte',
            lastname: 'VIGNON'
          })
          done()
        })
      })
      
    })
  
    // TODO Create test for the get method
    it('cannot get a user when it does not exist', (done) => {
      userController.get('invalid', (err, result) => {
        expect(err).to.not.be.equal(null)
        expect(result).to.be.equal(null)
        done()
      })      
    })
  
  })
})

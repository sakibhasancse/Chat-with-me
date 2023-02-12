import chai from 'chai'
import chaiHttp from 'chai-http'

import { testData } from '../testData.js'
import { seedAllDataForLoginPostRequest } from './user-helper.js'
import server from '../../../server.js'

chai.use(chaiHttp)
const expect = chai.expect
const request = chai.request

describe('Test user login', () => {
  let user = {}
  before(async () => {
    user = await seedAllDataForLoginPostRequest(testData())
  })

  it('Should throw and error without email or password', async () => {
    const { text } = await request(server).post('/api/auth/login')
    const result = JSON.parse(text)

    const { message, statusCode } = result
    expect(message).to.be.equal('Missing email,password')
    expect(statusCode).to.be.equal(400)
  })

  it('Should not login user using wrong email', async () => {
    const inputData = { email: 'wrong@gmail.com', password: '122112' }
    const { text } = await request(server)
      .post('/api/auth/login')
      .send(inputData)

    const result = JSON.parse(text)
    const { message, statusCode } = result
    expect(message).to.be.equal('User not found.')
    expect(statusCode).to.be.equal(404)
  })

  it('Should not login user using wrong password', async () => {
    const inputData = { email: user.email, password: '122112' }
    const { text } = await request(server)
      .post('/api/auth/login')
      .send(inputData)

    const result = JSON.parse(text)
    const { message, statusCode } = result
    expect(message).to.be.equal('Invalid email or password')
    expect(statusCode).to.be.equal(400)
  })

  it('Should login user', async () => {
    const inputData = { email: user.email, password: user.password }
    const { status, text } = await request(server)
      .post('/api/auth/login')
      .send(inputData)

    const result = JSON.parse(text)
    const { token } = result
    expect(status).to.be.equal(200)
    expect(token).to.be.an('string')
  })
})

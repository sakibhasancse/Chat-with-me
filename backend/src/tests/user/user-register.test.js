import chai from 'chai'
import chaiHttp from 'chai-http'

import { testData } from '../testData.js'
import { UserTestHelper } from '../helpers.js'
import server from '../../../server.js'

chai.use(chaiHttp)
const expect = chai.expect
const request = chai.request

describe('Test user sign up', () => {
  const { user } = testData()
  before(async () => {
    await UserTestHelper.cleanUsers()
  })

  it('Should throw and error without require fields', async () => {
    const { text } = await request(server).post('/api/auth/register')
    const result = JSON.parse(text)

    const { message, statusCode } = result
    expect(message).to.be.equal('Missing email,name,password,phoneNumber')
    expect(statusCode).to.be.equal(400)
  })

  it('Should register a user', async () => {
    const { status, text } = await request(server)
      .post('/api/auth/register')
      .send(user)

    const result = JSON.parse(text)
    const { email, name, phoneNumber, userId } = result
    expect(status).to.be.equal(201)
    expect(email).to.be.equal(user.email)
    expect(userId).to.be.an('string')
    expect(name).to.be.equal(user.name)
    expect(phoneNumber).to.be.equal(Number(user.phoneNumber))
  })

  it('Should not register a user using existing email address', async () => {
    const { text } = await request(server).post('/api/auth/register').send(user)

    const result = JSON.parse(text)
    const { message, statusCode } = result
    expect(message).to.be.equal('User exists with email')
    expect(statusCode).to.be.equal(400)
  })
})

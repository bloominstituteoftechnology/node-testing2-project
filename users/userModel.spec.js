

const express = require('express')

const Users = require('./userModel.js')

const request = require('supertest')
const toTest = require('./userRouter.js')
const app = express()
const router = express.Router()

router.use(app)

describe('User Model', () => {
    it('Get * Users', async () => {
        const users = await Users.getUser()
        expect(users).toHaveLength(0)
    })

})


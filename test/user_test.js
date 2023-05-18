const server = require('../index');
const chai = require('chai')
const chaiHttp = require('chai-http');
const path = require('path');
const userSchema = require('../modles/userSchema');
const routes = require('../routes/userRoutes')
const { request } = require('http');

chai.should();
chai.use(chaiHttp);

describe("User signup Api", () => {

    // test the get resource Limit
    describe("POST /api/user", () => {
        it("it should return login user details:"), (done) => {
            let random = Math.floor(Math.random() * 1000)
            const data = {
                userName: "mayank jaiswal",
                userEmail: `harsha${random}@gmail.com`,
                userPassword: "Harsha@123",
                userPhone:"9340163319",
                userCity:"Khargone",
                userState:"mp",

            }
        }
    })
})


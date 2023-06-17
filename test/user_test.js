const chai = require('chai')
const { server } = require('../index');
const chaiHttp = require('chai-http');

chai.should();
chai.use(chaiHttp);

describe("Using SignUp API ", () => {

    //Test the get resourcesLimits
    describe("POST /api/user", () => {
        it("IT should Return Signup user details:", (done) => {
            let random = Math.floor(Math.random() * 1000)
            const data = {
                userName: "Mayank",
                userEmail: `mayank001${random}@gmail.com`,
                userPassword: "Mayank@123",
                userPhoneno: 9340163319,
                userCity: "Khargone",
                userState: "mp",
                userAddress: "kunda nagar khargone",
            };
            chai
                .request(server)
                .post("/user/signupuser")
                .set("Content-Type", "multipart/form-data")
                .field(data)
                .attach("userProfilePic", 'image_1684409625501_shadi1.jpg')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.have.be.a("object")
                    res.body.should.have.property("success").eq(true);
                    res.body.should.have.property("message").eq("Registaration successfull");
                    done();

                })
        })

    })
    
})
// login test case 
describe("using login api", () => {
    it("it should return login user details:", (done) => {
        const data = {
            userEmail: "Mayankjaiswal20@gmail.com",
            userPassword: "Mayank@123",
        }
        chai
            .request(server)
            .post("/user/loginuser")
            .send(data)
            .end((err, res) => {
                res.should.have.status(200);
                res.should.have.be.a("object")
                res.body.should.have.property("success").eq(true);
                res.body.should.have.property("message").eq("Login Success");
                res.body.should.have.property("token");


            }); done()
    })
})
// forget api unit test
describe("using forget api", () => {
    it("it should return forget user details:", (done) => {
        const data = {
            userEmail: "mayank0051@gmail.com",
        }
        chai
            .request(server)
            .post("/user/forgetpassworduser")
            .send(data)
            .end((err, res) => {
                res.should.have.status(200);
                res.should.have.be.a("object");
                res.body.should.have.property("success").eq(true);
                res.body.should.have.property("message").eq("Mail sent successfull");
                res.body.should.have.property("token");
                // res.body.should.have.property("UserId");

            })
        done();
    })
})
// reset api unit testing 
describe("useing reset api ", () => {
    it("it should return reset password details:", (done) => {
        const data = {
            newPassword: "myank123",
            confirmPassword: "myank123",
        };
        chai
            .request(server)
            .post("/user/restpassworduser/646dee4122a57d046db41239/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDc3MjE5MTU3ZGM0MjI3YzI4YWJjYjUiLCJpYXQiOjE2ODU1MjkwMDYsImV4cCI6MTY4NTUyOTYwNn0.bxSvSo3ECHZxsU-0u6qPsLJFc2bPByyBGoPkd6yOb9c")
            .send(data)
            .end((err, res) => {
                res.should.have.status(200);
                res.should.have.be.a("object")
                res.body.should.have.property("success").eq(true);
                res.body.should.have.property("message").eq("passsword updated successfuly");
            })
        done();
    })

})
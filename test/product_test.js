const chai = require("chai");
const chaiHttp = require("chai-http");
const { server } = require("../index");

chai.should();
chai.use(chaiHttp);

describe("POST /api/product", () => {
    it("should add a product details:", (done) => {
        const productData = {
            product_name: "kuka",
            product_description: "it's a very good product",
            product_price: 222,
            product_categories: "cold drink",
            product_company: "mayank brand",
        };
        chai
            .request(server)
            .post("/product/addproduct")
            .set("Content-Type", "multipart/form-data")
            .field(productData)
            .attach("product_image", "image_1685092864142_iphone 13.jpg")
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.be.a("object");
                res.body.should.have.property("success").eq(true);
                res.body.should.have
                    .property("message")
                    .eq("product added successfully");
                done();
            });
    });
    // it(("it should return null values")

    // )
});

// get all products api unit testing
describe("Get /api/product", () => {
    it("should get all product details:", (done) => {
        chai
            .request(server)
            .get("/product/allproduct")
            .send()
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.be.a("object");
                res.body.should.have.property("success").eq(true);
                res.body.should.have.property("message").eq("all product list below");
                done();
            });
    });
});

// update product unit testing
describe("PATCH /api/product", () => {
    it("should update a product details:", (done) => {
        const productData = {
            product_name: "kuka",
            product_description: "it's a very good product",
            product_price: 225,
            product_categories: "cold drink",
            product_company: "mayank jaiswal brand",
        };
        chai
            .request(server)
            .patch("/product/updateproduct/647081fca423a5d1f72ac08c")
            .send(productData)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.be.a("object");
                res.body.should.have.property("success").eq(true);
                res.body.should.have
                    .property("message")
                    .eq("product updated successfully");
                done();
            });
    });
});

// Delete product unit testing
describe("DELETE /api/product", () => {
    it("should delete a product details:", (done) => {
       
        chai
            .request(server)
            .delete("/product/deleteproduct/647081fca423a5d1f72ac08c")
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.be.a("object");
                res.body.should.have.property("success").eq(true);
                res.body.should.have
                    .property("message")
                    .eq("your product deleted succrssfully");
                done();
            });
    });
});

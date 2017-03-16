var should = require("should"),
    request = require("supertest"),
    app = require("../app.js"),
    mongoose = require("mongoose"),
    Book = mongoose.model("Book"),
    agent = request.agent(app);
    
describe("Book CRUD test", function(){
    it("Should allow a book to be posted and return at least a read and _id", function(done){
        var bookPost = {title : "Some title", author: "Martin", genre: "Fiction"};
        
        agent.post("/api/books")
             .send(bookPost)
             .expect(200)
             .end(function(err, results){
                 // Assertions here
                 
                 // Read is a value by default
                 results.body.read.should.equal(false);
                 // _Id means the book has been saved.
                 results.body.should.have.property("_id");
                 
                 // Let supertest know to move to the other execution
                 done();
             });

    });
    
    afterEach(function(done){
        Book.remove().exec();
        done();
    });
    
});
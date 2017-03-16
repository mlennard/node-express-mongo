// Integration tests, on the gulpFile the env has been changed to use a Test DB instead.
var should = require("should"),
    request = require("supertest"),
    app = require("../app.js"),
    mongoose = require("mongoose"),
    Book = mongoose.model("Book"),
    agent = request.agent(app);

//TODO que es o para que sirve el done?
    
describe("Book CRUD test", function(){
    it("Should allow a book to be posted and return at least a read and _id", function(done){
        //The object defined for testing purposes
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
    
    //The 'tearDown' method, in this case it will remove the books from Mongo
    afterEach(function(done){
        Book.remove().exec();
        done();
    });
    
});
var should = require("should"),
    sinon  = require("sinon");
    
describe('Book Controller Tests', function(){
    describe('Post', function() {
        it('should not allow an empty title on post', function(){
            // Mock objects
            
            //Book and its behaviour
            var Book = function(book){
                this.save = function(){};
            };
            
            //The request 
            var req = {
                body: {
                    author : 'Martin'
                }
            };
            
            // The response and information about the call
            var res = {
                status : sinon.spy(),
                send : sinon.spy()
            }; 
            
            var bookController = require("../controllers/bookController")(Book);
            
            bookController.post(req, res);
            
            // Checking the returned values with should
            res.status.calledWith(400).should.equal(true, 'Bad status ' + res.status.args[0][0]);
            res.send.calledWith('Title is required').should.equal(true);
        })
    });
       
});
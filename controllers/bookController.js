// BookController, it contains the logic linked to the route /api/books/ 
// POST and GET operations.

// Book is received in order to mock up its behaviour on the unit tests.
// On real scenarios, the book is built based on the request.
var bookController = function(Book){
    var post = function(req, res){
            //Validating title is required
            if(!req.body.title){
                res.status(400);
                res.send('Title is required');
            } else {
                //Creates a new instance of the model to persist the object with mongoose
                var book = new Book(req.body);
                book.save();
                res.status(201);
                res.send(book);
            }
            
        };
    var get = function(req, res){
            
            var query = {};
            
            //Request will be '/api/books/?genre=<something>'
            //Other fields could be added.
            if(req.query.genre){
                query.genre = req.query.genre;
            }
            
            //Mongoose find by query
            Book.find(query, function(err, books){
                if(err){
                    res.status(500).send(err);
                } else{
                    
                    var returnBooks = [];
                    
                    books.forEach(function(element, index, array){
                        //aux var newBook to decouple the model of the object we want to return (in this case adding the field links)
                        var newBook = element.toJSON();
                        newBook.links = {};
                        newBook.links.self = 'http://' + req.headers.host + '/api/books/' + newBook._id;
                        returnBooks.push(newBook);
                    });
                    
                    res.json(returnBooks);
                }    
            });
        };
    // this module expose the method post and the mehod get    
    return {
        post : post,
        get : get
    }    
}

module.exports = bookController;
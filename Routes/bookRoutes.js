// This file defines the different entrypoints to the API
var express = require("express");

var routes = function(Book){
    var bookRouter = express.Router();
    var bookController = require("../controllers/bookController")(Book);    
        
    //Whatever being pointed to the '/' (post and get) will be treated here
    bookRouter.route('/')
        .post(bookController.post)
        .get(bookController.get);
    
    //Whatever coming with a parameter after the '/' will be treated here first and then pass to the following according to the verb
    bookRouter.use('/:bookId', function(req, res, next){
        //Mongoose find by ID based on the param.
        Book.findById(req.params.bookId, function(err, book){
                if(err)
                    res.status(500).send(err);
                else if(book){
                    // in case of book, the value will be set in place into the request.book
                    req.book = book;
                    // it makes the call continue to the route
                    next();
                } else {
                    res.status(404).send('No book found');
                }   
            });
    });
        
            
    bookRouter.route('/:bookId')    
        .get(function(req, res){
            
            var returnBook = req.book.toJSON();
            
            returnBook.links = {};
            // Encode URI in case of special characters or blank spaces
            returnBook.links.filterByThisGenre = encodeURI('http://' + req.headers.host + '/api/books/?genre=' + returnBook.genre);
            
            res.json(returnBook);
            
        })
        .put(function(req, res){
            //It's going to modify whatever it was received on the body
            req.book.title = req.body.title;
            req.book.genre = req.body.genre;
            req.book.author = req.body.author;
            req.book.read = req.body.read;
            
            //Mongoose save or update
            req.book.save(function(err){
                if(err)
                    res.status(500).send(err);
                else
                    res.status(200).send(req.book);
            });
                
        })
        .patch(function(req, res){
            //TODO pq el delete?
            if(req.body._id)
                delete req.body._id;
            
            //It's going to modify only the parameters received to be modified
            for(var p in req.body){
                req.book[p] = req.body[p];
            }
            req.book.save(function(err){
                if(err)
                    res.status(500).send(err);
                else
                    res.status(200).send(req.book);
            });
        })
        .delete(function(req, res){
            //It will delete the object from MongoDB
            req.book.remove(function(err){
                if(err)
                    res.status(500).send(err);
                else
                    res.status(204).send('Book has been removed');
            });
        });
    
    return bookRouter;
    
};

module.exports = routes;
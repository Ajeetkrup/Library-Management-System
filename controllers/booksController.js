const { findOne, updateOne } = require('../models/book');
const Book = require('../models/book');

module.exports.books = async function(req, res){
    const books = await Book.find({});
    return res.render('book', {
        title: 'Books',
        books: books
    });
}

module.exports.create = async function(req, res){
    Book.create({
        name: req.body.name,
        author: req.body.author,
        price: req.body.price,
        pages: req.body.pages,
        available: true,
        copies: req.body.copies
    }
    );

    return res.redirect('back');
}

module.exports.issue = async function(req, res){
        const book = await findOne({name: req.body.name});
        if(book.copies == 0){
            return res.redirect('back');
        }

        await Book.updateOne(
            { name: req.body.name }, 
            { 
               copies: {$inc: -1}
            }
        );
        return res.redirect('back');
}

module.exports.return = async function(req, res){
        await Book.updateOne(
            { name: req.body.name }, 
            { 
                copies: {$inc : 1}
            }
        );
        return res.redirect('back');
}

module.exports.delete = async function(req, res){
    await Book.deleteOne({name: req.body.name});

    return res.redirect('back');
}
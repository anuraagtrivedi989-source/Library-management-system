const express = require("express")

const {bookModel, userModel} = require("../model/index")
const router = express.Router();

/**
 * Route : /books
 * Method: GET
 * Description: Gind Books
 * Scope: public
 * params: id
 */


router.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        data: books
    })
})

/**
 * Route : /books/:id
 * Method: GET
 * Description: Get books by id
 * Scope: public
 * params: id
 */

router.get("/:id", (req, res) => {
    const { id } = req.params;
    const book = books.find((each) => each.id === id)

    if (!book) {
        res.status(404).json({
            success: false,
            message: "book not found"
        })
    }
    res.status(200).json({
        success: true,
        data: book
    })
})

/**
 * Route : /users
 * Method: POST
 * Description:crete/register a new user
 * Scope: public
 * params: None
 */

router.use(express.json());
router.post("/", (req, res) => {


    const { id, title, author, genre, price, publishedYear } = req.body;

    if (!id || !title || !author || !genre || !price || !publishedYear) {
        res.status(404).json({
            success: false,
            message: "please provide all the required field"
        })
    }
    const book = books.find((each) => each.id === id)
    if (book) {
        res.status(409).json({
            success: false,
            message: "Book Already Exist"
        })
    }
    books.push({

        id,
        title,
        author,
        genre,
        price,
        publishedYear

    });
    res.status(201).json({
        success: true,
        message: "Book created successfully",
        data: { id, title, author, genre, price, publishedYear }
    })
})



/**
 * Route : /users/:id
 * Method: Put
 * Description:update book info
 * Scope: public
 * params: None
 */
router.put("/:id", (req, res) => {
    const { id } = req.params.id;
    const { data } = req.body;

    const book = books.find((each) => each.id === id)
    if (!book) {
        return res.status(404).json({
            success: false,
            message: "Book not found"
        })
    }
    // updated data
    // book.title = title,
    // book.author = author,
    // book.genre = genre
    const updatedBook = books.map((each) => {
        if (each.id === id) {
            return { ...each, ...data }
        }
        return each
    });
    res.status(200).json({
        success: true,
        message: "book updated successfully",
        data: updatedBook
    })
})


router.delete("/:id", (req, res) => {
    const { id } = req.params;
    const book = books.find((each) => each.id === id)
    if (!book) {
        res.status(404).json({
            success: false,
            message: "User not found"
        })
    }

    const updatedBook = books.filter((each) => each.id !== id)

    res.status(200).json({
        success: true,
        message: "book deleted successfully",
        data: updatedBook
    })
})


// ---------------------------------------------------------------------------------
// Issued Books
// ---------------------------------------------------------------------------------

router.get("/issued/for-users", (req, res) => {

    const userWithBook = users.filter((each) => {
        if (each.issuedBook) {
            return each;
        }
    })

    const issuedBooks = [];
    userWithBook.forEach((each) => {
        const book = books.find((book) => {
            book.id === each.issuedBook
        })
        book.issuedTo = each.name
        book.issuedDate = each.issuedDate
        book.returnDate = each.returnDate

        issuedBooks.push(book)
    })
    if (issuedBooks === 0) {
        res.status(404).json({
            success: false,
            message: "No books issued yet"
        })
    }
    res.status(200).json({
        success: true,
        message: "Issued books",
        data: issuedBooks

    })

})




module.exports = router;
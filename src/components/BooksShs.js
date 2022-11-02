import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { getAll } from '../BooksAPI';
import { UPDATE_BOOK_SHELF, _RENDER_SHELFS } from '../constants';
import BookItemComponent from './BookItemComponent';
const BooksShs = () => {
    const [currentlyReadingArr, setCurrentlyReadingArr] = useState([]);
    const [wantToReadArr, setWantToReadArr] = useState([]);
    const [readArr, setReadArr] = useState([]);

    useEffect(() => {
        fetchBooks();

    }, []);

    const fetchBooks = () => {
        getAll().then((data) => {
            setCurrentlyReadingArr(data.filter((d) => d.shelf === "currentlyReading"));
            setWantToReadArr(data.filter((d) => d.shelf === "wantToRead"))
            setReadArr(data.filter((d) => d.shelf === "read"))

        })
    }




    const ReanderBooks = (shelfArr) => {
        console.log("fromShelf : ",shelfArr)
        return (
            shelfArr.map((sh) => {
                return (
                    <li key={sh.id}>
                        <BookItemComponent fetchBooksCallback={fetchBooks} book={sh} updateBookShelfCallback={UPDATE_BOOK_SHELF} _render_shelfCallback={_RENDER_SHELFS} />
                    </li>
                )
            })
        )

    }


    return (

        <div className="list-books">
            <div className="list-books-title">
                <h1>MyReads</h1>

            </div>
            <div className="list-books-content">
                <div>
                    <div className="bookshelf">
                        <h2 className="bookshelf-title">Currently Reading</h2>
                        <div className="bookshelf-books">
                            <ol className="books-grid">
                                {ReanderBooks(currentlyReadingArr)}
                            </ol>
                        </div>
                    </div>
                    <div className="bookshelf">
                        <h2 className="bookshelf-title">Want to Read</h2>
                        <div className="bookshelf-books">
                            <ol className="books-grid">
                                {ReanderBooks(wantToReadArr)}
                            </ol>
                        </div>
                    </div>
                    <div className="bookshelf">
                        <h2 className="bookshelf-title">Read</h2>
                        <div className="bookshelf-books">
                            <ol className="books-grid">
                                {ReanderBooks(readArr)}
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
            <div className="open-search">
                <Link to="/search">Add a book</Link>
            </div>
        </div>
    )
}
export default BooksShs;
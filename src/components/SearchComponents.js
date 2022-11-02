import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getAll, search } from '../BooksAPI';
import { UPDATE_BOOK_SHELF, _RENDER_SHELFS } from '../constants';
import BookItemComponent from './BookItemComponent';
const SearchComponents = () => {
    const [queryResult, setQueryResult] = useState([]);
    const [queryText, setQueryText] = useState("");
    const [shelfBooks, setShelfBooks] = useState([]);


    useEffect(() => {
        getAll().then((data) => {
            setShelfBooks(data);
        })
    }, [])



    const searchBook = (q) => {
        search(q).then((data) => {

            if (data && data.hasOwnProperty('error')) {
                setQueryResult([]);
            } else {
                setQueryResult(data);
            }
        })
    }

    const fetchBooks = () => {
        searchBook(queryText)
    }

    const _renderQueryResultBooks = () => {
        console.log("fromSearch  : ", queryResult)
        
        return (

            queryResult && queryResult.length !== 0 ? queryResult.map((b) => {
                console.log("check  : ",shelfBooks.filter((sb)=>sb.id === b.id))
                return (
                    <li key={b.id}>
                        <BookItemComponent shelfBooks={shelfBooks} fetchBooksCallback={fetchBooks} book={b} updateBookShelfCallback={UPDATE_BOOK_SHELF} _render_shelfCallback={_RENDER_SHELFS} />

                    </li>
                )
            }) : ""
        )

    }

    const handleonchange = (e) => {
        setQueryText(e.target.value);
        searchBook(e.target.value);
        console.log(queryResult)
    }


    return (
        <div className="search-books">
            <div className="search-books-bar">
                <Link
                    className="close-search"
                    to="/"
                >
                    Close
                </Link>
                <div className="search-books-input-wrapper">
                    <input
                        type="text"
                        placeholder="Search by title, author, or ISBN"
                        onChange={handleonchange}
                    />
                </div>
            </div>

            <div className="search-books-results">
                <ol className="books-grid">
                    {_renderQueryResultBooks()}
                </ol>
            </div>

        </div>
    )
}

export default SearchComponents
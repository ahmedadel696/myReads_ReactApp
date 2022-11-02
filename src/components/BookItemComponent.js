import React from 'react'

const BookItemComponent = (props) => {

    const { book, updateBookShelfCallback, _render_shelfCallback, shelfBooks, fetchBooksCallback } = props;
    const handleOnChange = async (e) => {
        await updateBookShelfCallback(book, e.target.value);
        fetchBooksCallback();
    }

    const checkBookInShelf = (b) => {
        if (shelfBooks && shelfBooks.filter((sb) => sb.id === b.id).length !== 0) {
            let bookShelf = shelfBooks.filter((sb) => sb.id === b.id)[0].shelf;
            return _render_shelfCallback(bookShelf)
        } else {
            return _render_shelfCallback(b.shelf)
        }
    }
    return (
        <div className="book">
            <div className="book-top">
                <div
                    className="book-cover"
                    style={{
                        width: 128,
                        height: 193,

                        backgroundImage: book.imageLinks ?
                            'url(' + book.imageLinks.thumbnail + ')'
                            :
                            'url()'
                    }}
                ></div>
                <div className="book-shelf-changer">
                    <select onChange={handleOnChange}>
                        <option value="" >
                            Move to...
                        </option>
                        {checkBookInShelf(book)}
                    </select>
                </div>
            </div>
            <div className="book-title">{book.title ? book.title : ""}</div>
            <div className="book-authors">{book.authors ? book.authors : ""}
            </div>
        </div>
    )
}

export default BookItemComponent
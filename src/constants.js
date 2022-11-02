import { update } from "./BooksAPI";

export const BOOK_SHELFS = [{ key: "wantToRead", val: "Want to Read" }, { key: "currentlyReading", val: "currently Reading" }, { key: "read", val: "Read" }];

export const _RENDER_SHELFS = (shelfName) => {
    console.log("shelf name : ", shelfName)
    return (
        <>

            {BOOK_SHELFS.map((shelf) => {

                if (shelf.key === shelfName) {
                    return (
                        <option style={{ backgroundColor: "#ddd" }} value={shelf.key} key={shelf.key}>✓ {shelf.val}</option>
                    )
                } else {
                    return (
                        <option value={shelf.key} key={shelf.key}>{shelf.val}</option>
                    )

                }

            })}
            {shelfName === undefined?<option value="none">✓ None</option>:<option value="none">None</option>}
        </>

    )

}

export const UPDATE_BOOK_SHELF = async (book, newShelf) => {
    book.shelf = newShelf;
    await update(book, newShelf);

}

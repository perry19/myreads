import React from 'react'
import PropTypes from 'prop-types'
import { BookShelfItem } from '../components'

const BookShelfContainer = ({ title, books, onShelfChange }) => {
    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{title}</h2>
            <div className="bookshelf-books">
                {books && books.length > 0 && (
                    <ol className="books-grid">
                        {books.map(book => (
                            <BookShelfItem key={book.id} book={book} onShelfChange={onShelfChange} />
                        ))}
                    </ol>
                )}
                {books && books.length === 0 && (
                    <p className="no-books">
                        No books Available here!
                        <span role="img" aria-label="emoji">
              🧐
            </span>
                        Try adding a new book or updating one of the other Shelf
                    </p>
                )}
            </div>
        </div>
    )
}

BookShelfContainer.propTypes = {
    title: PropTypes.string.isRequired,
    onShelfChange: PropTypes.func.isRequired,
    books: PropTypes.array.isRequired
}

export default BookShelfContainer

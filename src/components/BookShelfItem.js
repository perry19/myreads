import React from 'react'
import PropTypes from 'prop-types'
import BookShelfChangeHandler from './BookShelfChangeHandler'

const BookShelfItem = ({ book, onShelfChange }) => {
    const { title, authors, imageLinks, shelf } = book
    const thumbnail = imageLinks && imageLinks.thumbnail ? imageLinks.thumbnail : ''
    return (
        <div className="book">
            <div className="book-top">
                <div
                    className="book-cover"
                    style={{
                        width: 128,
                        height: 193,
                        backgroundImage: `url(${thumbnail})`
                    }}
                />
                <BookShelfChangeHandler book={book} shelf={shelf} onShelfChange={onShelfChange} />
            </div>
            <div className="book-title">{title}</div>
            <div className="book-authors">{authors && authors.join(', ')}</div>
        </div>
    )
}

BookShelfItem.propTypes = {
    book: PropTypes.object.isRequired,
    onShelfChange: PropTypes.func.isRequired
}

export default BookShelfItem

import React from 'react'
import PropTypes from 'prop-types'

const BookShelfChangeHandler = ({ book, onShelfChange, shelf }) => {
    return (
        <div className="book-shelf-changer">
            <select
                onChange={event => {
                    onShelfChange(book, event.target.value)
                }}
                value={shelf}
            >
                <option value="move" disabled>
                    Move to...
                </option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
            </select>
        </div>
    )
}

BookShelfChangeHandler.propTypes = {
    book: PropTypes.object.isRequired,
    onShelfChange: PropTypes.func.isRequired
}

export default BookShelfChangeHandler

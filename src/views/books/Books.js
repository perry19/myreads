import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { BookShelfContainer } from '../../containers'
import { Loading } from '../../components'

const Books = ({ books, onShelfChange, loading }) => {
    return (
        <div className="list-books">
            <div className="list-books-title">
                <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
                {loading && <Loading />}
                {!loading && (
                    <div className="list-books-content__container">
                        <BookShelfContainer
                            title="📖 Currently Reading"
                            books={books.filter(book => book.shelf === 'currentlyReading')}
                            onShelfChange={onShelfChange}
                        />
                        <BookShelfContainer
                            title="🔖 Want to Read"
                            books={books.filter(book => book.shelf === 'wantToRead')}
                            onShelfChange={onShelfChange}
                        />
                        <BookShelfContainer
                            title="📚 Read"
                            books={books.filter(book => book.shelf === 'read')}
                            onShelfChange={onShelfChange}
                        />
                    </div>
                )}
            </div>
            <div className="open-search">
                <Link to="/search">
                    <button>Add a book</button>
                </Link>
            </div>
        </div>
    )
}

Books.propTypes = {
    books: PropTypes.array.isRequired,
    onShelfChange: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired
}
export default Books

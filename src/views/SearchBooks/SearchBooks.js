import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { searchBooks } from '../../api/BooksAPI'
import { APIErrorHandling } from '../../errors'
import { BookShelfItem, Loading } from '../../components'
import { WORDS } from '../../constants/keywords'

class SearchBooks extends Component {
    state = {
        books: [],
        loading: false
    }

    handleSearchBooks = event => {
        this.setState(prevState => ({
            loading: !prevState.loading
        }))

        searchBooks(event.target.value)
            .then(books => {
                if ('error' in books) {
                    this.setState(prevState => ({
                        books: [],
                        loading: !prevState.loading
                    }))
                } else {
                    this.setState(prevState => ({
                        books: books.map(book => {
                            // handle if book doesn't contain shelf
                            if (!('shelf' in book)) {
                                book.shelf = 'none'
                            }
                            // Find if the array contains an object by comparing the property value
                            if (this.props.books.some(({ id }) => id === book.id)) {
                                const currentBook = this.props.books.filter(({id}) => id === book.id)
                                book.shelf = currentBook[0].shelf
                            }
                            return book
                        }),
                        loading: !prevState.loading
                    }))
                }
            })
            .catch(error => {
                APIErrorHandling(error)
            })
    }

    render() {
        const { onShelfChange } = this.props
        const { loading, books } = this.state
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to="/">
                        <button className="close-search">Close</button>
                    </Link>
                    <div className="search-books-input-wrapper">
                        <input
                            type="text"
                            onChange={this.handleSearchBooks}
                            placeholder="Search by title or author"
                        />
                    </div>
                </div>
                {loading && <Loading />}
                {!loading && (
                    <div className="search-books-results">
                        {books && books.length > 0 && (
                            <ol className="books-grid">
                                {books.map(book => (
                                    <BookShelfItem key={book.id} book={book} onShelfChange={onShelfChange} />
                                ))}
                            </ol>
                        )}
                        {books && books.length === 0 && (
                            <div className="search-no-books">
                                <p className="intro">We have a huge library of books for the following topics:</p>
                                <p className="categories">{WORDS && WORDS.join(', ')}</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        )
    }
}
export default SearchBooks

import React from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import Loader from 'react-loader-spinner'
import './assets/styles/App.css'
import { getAll, update } from './api/BooksAPI'
import { APIErrorHandling } from './errors'

const Books = React.lazy(() => {
    return import('./views/books/Books.js');
})
const SearchBooks = React.lazy(() => import((`./views/SearchBooks/SearchBooks`)))
const Page404 = React.lazy(() => import((`./views/pages/page404/Page404`)))

class BooksApp extends React.Component {
  state = {
    books: [],
    loading: false
  }

  async componentDidMount() {
    // start loading
    this.setState(prevState => ({
      loading: !prevState.loading
    }))
    // get books
    const books = await getAll()
    // change state with new books and stop loading
    this.setState(prevState => ({
      books,
      loading: !prevState.loading
    }))
  }

  onShelfChange = (book, newShelf) => {
    // update the book
    update(book, newShelf).catch(error => {
      APIErrorHandling(error)
    })
    const { books } = this.state
    // update the book state locally
    book.shelf = newShelf
    // remove the target book from the current state and add it again with the new shelf
    const updatedBooks = [...books.filter(({ id }) => id !== book.id), book]
    // stop loading and update books
    this.setState(() => ({
      books: updatedBooks
    }))
  }

  render() {
    const { books, loading } = this.state
    return (
        <Router>
          <React.Suspense
              fallback={
                <div className="loader">
                  <Loader type="Circles" color="#3498db" height={100} width={100} />
                </div>
              }
          >
            <Switch>
              <Route
                  exact
                  path="/"
                  name="Books"
                  render={props => (
                      <Books
                          onShelfChange={this.onShelfChange}
                          books={books}
                          loading={loading}
                          {...props}
                      />
                  )}
              />
              <Route
                  exact
                  path="/search"
                  name="Search Books"
                  render={props => (
                      <SearchBooks
                          onShelfChange={this.onShelfChange}
                          books={books}
                          loading={loading}
                          {...props}
                      />
                  )}
              />
              <Route exact path="/404" name="Page 404" render={props => <Page404 {...props} />} />
              <Redirect to="/404" />
            </Switch>
          </React.Suspense>
        </Router>
    )
  }
}

export default BooksApp

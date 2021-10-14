import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route } from 'react-router-dom'
import Book from './Book'
import SearchResults from './SearchResults'




class BooksApp extends React.Component {
  state = {
    books: {},
    searchBooks: {},
    query: ''
  }

  componentDidMount() {
    BooksAPI.getAll()
      .then((books) => {
        this.setState(() => ({
          books
        }))
      })
  }





  updateSelect = (book, select) => {
    BooksAPI.update(book, select)
      .then(() =>
        BooksAPI.getAll()
          .then((books) => {
            this.setState(() => ({
              books
            }))
          })
      )
  }


  // Part of the handle change component below comes from ideas found on the help forum

  handleChange = (event) => {
    event.preventDefault();
    const query = event.target.value;
    this.setState(() => ({
      query: query,
    }));
    if (query.length > 0) {
      BooksAPI.search(query.trim()).then((books) => {
        console.log(books)
        console.log(this.state.books)
        if (books === undefined) {
          this.setState(() => ({
            searchBooks: [],
          }));
        }
        else if ('error' in books) {
          this.setState(() => ({
            searchBooks: [],
          }));
        }
        else {
          books = books.map(obj => this.state.books.find(o => o.id === obj.id) || obj);
          this.setState(() => ({
            searchBooks: books,
          }));
        }
      })
    }
    else {
      this.setState(() => ({
        searchBooks: [],
      }));
    }

  };






  render() {
    const { books, searchBooks, query } = this.state

    return (
      <div className="app">
        <Route exact path='/search' render={({ history }) => (
          <div className="search-books">
            <div className="search-books-bar">
              <button className="close-search" onClick={() => history.push('/')}>Close</button>
              <div className="search-books-input-wrapper">

                <input type="text" value={query}
                  onChange={(event) => this.handleChange(event)} placeholder="Search by title or author" />

              </div>
            </div>
            <SearchResults updateSelect={this.updateSelect} books={searchBooks} query={query} />
          </div>
        )} />
        <Route exact path='/' render={({ history }) => (
          < div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
                  <Book key='currentlyReading' books={books} shelf={'currentlyReading'} updateSelect={this.updateSelect} />
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <Book key='wantToRead' books={books} shelf={'wantToRead'} updateSelect={this.updateSelect} />
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <Book key='read' books={books} shelf={'read'} updateSelect={this.updateSelect} />
                </div>
              </div>
            </div>
            <div className="open-search">
              <button onClick={() => history.push('/search')}>Add a book</button>
            </div>
          </div>
        )
        } />
      </div >
    )
  }
}





export default BooksApp

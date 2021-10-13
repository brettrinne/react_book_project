import React, { Component } from 'react'
import Book from './Book';

class SearchResults extends Component {

    state = {
        searchBooks: null,
        recheck: true
    }


    render() {
        const { books, updateSelect } = this.props
        return (
            <div className="search-books-results">
                <ol className="books-grid">
                    <Book key='searchBooks' books={books} shelf={'none'} updateSelect={updateSelect} />
                </ol>
            </div>
        )




    }





}

export default SearchResults
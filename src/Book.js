import React, { Component } from 'react'
import ShelfChanger from './ShelfChanger'
class Book extends Component {
    constructor(state) {
        super(state);
        this.state = {
            books: {},
            loaded: false
        };
    }

    componentDidMount() {
        this.setState(() => ({
            loaded: true
        }))
    }



    render() {
        const { books, shelf } = this.props
        const showingBooks = Object.keys(books).length === 0 ? books : books.filter((b) => (
            b.shelf === shelf || shelf === 'none'))
        return (
            Object.keys(showingBooks).length === 0 &&

            <div>
                <p> </p>

            </div>


            ,


            Object.keys(showingBooks).length > 0 &&

            <div key={books.shelf} className="bookshelf-books">
                <ol className="books-grid">

                    {
                        showingBooks.map((book) => (
                            'imageLinks' in book &&
                            <li key={book.id}>
                                <div className="book">
                                    <div className="book-top">

                                        <div className="book-cover" style={{ width: 128, height: 192, backgroundImage: `url("${book.imageLinks.thumbnail}")` }}></div>

                                        <ShelfChanger key={book.id} book={book} currentShelf={book.shelf !== undefined ? book.shelf : 'none'} updateSelect={this.props.updateSelect} />

                                    </div>
                                    <div className="book-title">{book.title}</div>
                                    {
                                        book.authors !== undefined &&
                                        <div key={book.authors.join(',')} className="book-authors">{book.authors.join(',')}</div>
                                    }
                                </div>
                            </li>

                        ))

                    }
                </ol>
            </div >
        )




    }





}

export default Book
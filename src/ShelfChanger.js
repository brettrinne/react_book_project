import React, { Component } from 'react'

class ShelfChanger extends Component {
    constructor(state) {
        super(state);
        this.state = {
            books: this.props.books
        };
    }



    render() {

        const shelf = this.props.currentShelf;
        const shelfLabels = ['currentlyReading', 'wantToRead', 'read', 'none']
        const updateSelect = this.props.updateSelect
        const book = this.props.book
        const alertType = (event) => {
            updateSelect(book, event.target.value.replaceAll("'", ""))

        };

        return (
            <div key={shelf} className="book-shelf-changer">
                <select value={`'${shelf}'`} onChange={alertType}>
                    <option key='movekey' value="move" disabled>Move to...</option>

                    {
                        shelfLabels.map((e) =>

                            <option key={e} value={`'${e}'`} > {e}</option>


                        )

                    }





                </select >
            </div >

        )



    }



}




export default ShelfChanger
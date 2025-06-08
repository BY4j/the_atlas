const DisplayBooks = ({ books, edit, deleteBook }) => {

    if (!books.length) return <p>No books found.</p>;

    return (
        <ul>
            {books.map(book => (
                <li key={book._id}>
                    <strong>{book.title}</strong> by {book.author} – {book.price}€
                    <br />
                    <em>{book.description}</em>
                    <div>
                        <button onClick={() => edit(book)}>Edit</button>
                        <button onClick={() => deleteBook(book._id)}>Delete</button>
                    </div>
                </li>
            ))
            }
        </ul>
    );
};

export default DisplayBooks;
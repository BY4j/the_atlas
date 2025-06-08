import { useState, useEffect } from "react"
import axios from "axios"
import BookForm from "./BookForm";
import DisplayBooks from "./DisplayBooks";

const Public = () => {
    const [books, setBooks] = useState([])
    const [formData, setFormData] = useState({ title: "", author: "", price: "", state: "", description: "" });
    const [editingBookId, setEditingBookId] = useState(null);

    useEffect(() => {
        axios.get("/books")
            .then(res => setBooks(res.data))
            .catch(err => console.error("Error : ", err))
    }, [])


    const formChange = e => {
        const { name, value } = e.target

        const updatedFormData = {
            title: formData.title,
            author: formData.author,
            price: formData.price,
            state: formData.state,
            description: formData.description
        };

        updatedFormData[name] = value;

        setFormData(updatedFormData);
    }

    const submit = async e => {
        e.preventDefault()

        try {
            // Check if editing has value, if yes update
            if (editingBookId) {
                const res = await axios.put(`/books/${editingBookId}`, formData);
                console.log(res);
                setBooks(books => books.map(book => book._id === editingBookId ? res.data : book));
                setEditingBookId(null);
            } else {
                const res = await axios.post("/books", formData);
                setBooks(books => [...books, res.data]);
            }

            //console.log(res)
            const resetForm = {
                title: "",
                author: "",
                price: "",
                state: "",
                description: ""
            };
            setFormData(resetForm);
        } catch (err) {
            console.error("Failed to create ad for book :", err)
        }
    }

    const edit = (book) => {
        setEditingBookId(book._id);
        setFormData({
            title: book.title,
            author: book.author,
            price: book.price,
            state: book.state,
            description: book.description
        });
    };

    const disableEdit = () => {
        setEditingBookId(null)
        const resetForm = {
            title: "",
            author: "",
            price: "",
            state: "",
            description: ""
        };
        setFormData(resetForm);
    }

    const deleteBook = async (id) => {
        try {
            await axios.delete(`/books/${id}`);
            setBooks(books => books.filter(book => book._id !== id));
          } catch (err) {
            console.error("Failed to delete ad for book :", err);
          }
    }

    const content = (
        <section>
            <header>
                <h1>Welcome to The Atlas</h1>
            </header>

            <main>
                <h2>{editingBookId
                    ? `Fill the form to update the book : "${formData.title}"`
                    : "Add an advertisement for a book or pick one to edit :"}</h2>
                <BookForm formData={formData}
                    formChange={formChange}
                    submit={submit}
                    editingBookId={editingBookId}
                    disableEdit = {disableEdit}
                />
                <h2>Books:</h2>
                <DisplayBooks books={books} edit={edit} deleteBook={deleteBook} />
            </main>
        </section>
    )
    return content
}

export default Public
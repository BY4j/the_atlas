const BookForm = ({ formData, formChange, submit, editingBookId, disableEdit }) => {
    return (
        <form onSubmit={submit}>
            <input name="title"
                value={formData.title}
                onChange={formChange}
                placeholder="Title"
                required />

            <input name="author"
                value={formData.author}
                onChange={formChange}
                placeholder="Author"
                required />

            <input name="price"
                type="number"
                value={formData.price}
                onChange={formChange}
                placeholder="Price"
                required />

            <select
                required
                name="state"
                value={formData.state}
                onChange={formChange} >
                <option value="">Select a condition</option>
                <option value="new">New</option>
                <option value="good">Good</option>
                <option value="used">Used</option>
            </select>


            <textarea name="description"
                value={formData.description}
                onChange={formChange}
                placeholder="Description"
                required />

            <button type="submit">{editingBookId ? "Update Book" : "Add Book"}
            </button>
            {editingBookId
                    ? <button onClick={() => disableEdit()}>Stop editing</button>
                    : ""}
        </form>
    );
};

export default BookForm;
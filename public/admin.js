//Retrieves the list of books and executes renderBookList function for each book.
async function retrieveBooks() {
    let response = await fetch("http://localhost:3001/listBooks");
    let books = await response.json();

    books.forEach(renderBookList);
};

//Targets the html div with id#root and creates a list item for each book.
//Also creates three inputs: one input for quanity of books, another to submit and another to delete.
function renderBookList(book) {
    let div = document.getElementById("root");

    let li = document.createElement("li");
    li.textContent = book.title;

    let input = document.createElement("input");
    input.type = "number";
    input.value = book.quantity;

    let submit = document.createElement("input");
    submit.type = "submit";
    submit.value = "Save";

    //Updates the book list with the input quantity when the submit button is clicked.
    submit.addEventListener('click', async () => {
        let response = await fetch("http://localhost:3001/updateBook", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: book.id,
                quantity: input.value,
            }),
        });

        let updatedBookQuantity = await response.json();
        console.log(updatedBookQuantity);
    });

    let deleteInput = document.createElement("input");
    deleteInput.type = "submit";
    deleteInput.value = "Delete";

    deleteInput.addEventListener('click', async () => {
        if (confirm("Are you sure you want to delete this book?")) {
            let response = await fetch(`http://localhost:3001/removeBook/${book.id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });
    
            let deletedBook = await response.json();
            console.log(deletedBook);
        }
    });

    //Inserts the list items into the div.
    div.append(li);
    //Inserts the input fields, submit and delete buttons next to the list items.
    li.append(input, submit, deleteInput);
};

retrieveBooks();
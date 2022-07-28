const express = require('express')
const app = express()
const path = require('path')


// include and initialize the rollbar library with your access token
var Rollbar = require('rollbar')
var rollbar = new Rollbar({
  accessToken: 'd3547c47b3f8416f821bbf20ef2b9f3e',
  captureUncaught: true,
  captureUnhandledRejections: true,
})

// record a generic message and send it to Rollbar
rollbar.log('Hello world!')



app.use(express.json())


const books = ['book1', 'book2', 'book3']

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/index.html'))
})

app.get('/api/books', (req, res) => {
    rollbar.info("Books was requested", books)
    res.status(200).send(books)
})

app.post("/api/books", (req, res) => {
    let { name } = req.body;

    const index = books.findIndex((book) => {
        return books === name;
    });

    try {
        if (index === -1 && name !== "") {
            books.push(name);

            rollbar.info("A new book was created", name)

            res.status(200).send(books);
        } else if (name === "") {
            rollbar.error("A book was posted without a name")

            res.status(400).send("You must enter a name.");
        } else {
            rollbar.critical("A book that already exists was posted", name)

            res.status(400).send("That book already exists.");
        }
    } catch (err) {
        console.log(err);
    }
});


app.delete('/api/students/:index', (req, res) => {
    const targetIndex = +req.params.index
    
    students.splice(targetIndex, 1)
    res.status(200).send(students)
})


const port = process.env.PORT || 5055

app.use(rollbar.errorHandler())

app.listen(port, () => console.log(`Server listening on ${port}`))

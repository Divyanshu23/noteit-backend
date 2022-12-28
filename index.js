const express = require("express")
const connectToDB = require("./db")
const authRouter = require("./routes/auth")
const notesRouter = require("./routes/notes")
const cors = require("cors")

connectToDB()
const port = 5000
const app = express()
app.use(express.json())
app.use(cors())

app.use("/api/auth/", authRouter)
app.use("/api/notes", notesRouter)

app.listen(port, () => {
    console.log(`App is up and running on http://localhost:${port}`)
})
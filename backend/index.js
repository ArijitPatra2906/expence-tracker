const express = require("express")
const cors = require("cors")
const path = require("path")
const db = require("./db")
const app = express()
app.use(express.json())
app.use(cors())
const userRoute = require("./routes/UserRoute")
const transactionRoute = require("./routes/TransactionsRoute")

app.use("/api/users", userRoute)
app.use("/api/transaction", transactionRoute)

const port = process.env.PORT || 4000
if (process.env.NODE_ENV === "production") {
    app.use("/", express.static("client/build"))
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client/build/index.html"))
    })
}

app.get("/", (req, res) => res.send("Server running succesfully"))
app.listen(port, () => console.log(`Server listening on port ${port}!!`))
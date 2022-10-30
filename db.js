const mongoose = require("mongoose")

mongoose.connect("mongodb+srv://ar1stin:ar1stin@cluster0.fpp6co3.mongodb.net/?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true })

const connection = mongoose.connection

connection.on("error", err => console.log(err))
connection.on("connected", err => console.log("Mongodb connected!!!"))


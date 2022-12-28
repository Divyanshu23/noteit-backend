const mongoose = require("mongoose")

const mongoURI = "mongodb://127.0.0.1:27017/noteit"

const connectToDB = async () => {
    try {
        mongoose.connection
            .on("connecting", () => {
                console.log("Connecting to database")
            })
            .on("connected", () => {
                console.log("Connected to database")
            })
            .on("disconnected", () => {
                console.log("Disconnected from database")
                process.exit()
            })
            .on("reconnected", () => {
                console.log("Reconnected to database")
            })
            .on("error", (err) => {
                console.error(err);
                process.exit()
            })
        mongoose.set("strictQuery", false)
        await mongoose.connect(mongoURI, { serverSelectionTimeoutMS: 10000 })
    } catch (error) {
        console.error("Can't Connect to database")
        process.exit()
    }
}

module.exports = connectToDB
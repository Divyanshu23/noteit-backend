const Note = require("../models/notes")

const fetchNotes = async (req, res) => {
    const user = req.user
    try {
        const notes = await Note.find({userid: user.userid})
        res.status(200).json({success: true, notes})
    } catch (error) {
        res.status(500).json({success: false, error: "Some internal error occured"})
    }
}

module.exports = fetchNotes
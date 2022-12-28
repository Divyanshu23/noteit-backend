const Note = require("../models/notes")

const updateNote = async (req, res) => {
    const noteid = req.params.noteid
    const { title, description, tag } = req.body
    try {
        let note = await Note.findById(noteid)
        if (!note)
            return res.status(400).json({ success: false, error: "Note does not exist" })
        if (note.userid != req.user.userid)
            return res.status(400).json({ success: false, error: "Note does not exist" })
        try {
            const newNote = {}
            if (title) newNote.title = title
            if (description) newNote.description = description
            if (tag) newNote.tag = tag
            note = await Note.findByIdAndUpdate(noteid, newNote, { new: true })
            res.status(200).json({ success: true, note })
        } catch (error) {
            return res.status(500).json({ success: false, error: "Some internal error occured" })
        }
    } catch (err) {
        return res.status(400).json({ success: false, error: err })
    }
}

module.exports = updateNote
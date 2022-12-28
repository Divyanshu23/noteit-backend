const Note = require("../models/notes")

const deleteNote = async (req, res) => {
    const noteid = req.params.noteid
    try {
        const note = await Note.findById(noteid)
        if (!note)
            return res.status(400).json({ success: false, error: "Note does not exist" })
        if (note.userid != req.user.userid)
            return res.status(400).json({ success: false, error: "Note does not exist" })
        try {
            await Note.findByIdAndDelete(noteid)
            res.status(200).json({ success: true, note })
        } catch (error) {
            return res.status(500).json({ success: false, error: "Some internal error occured" })
        }
    } catch (err) {
        return res.status(400).json({ success: false, error: err })
    }
}

module.exports = deleteNote
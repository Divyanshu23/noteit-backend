const Note = require("../models/notes")

const addNote = (req, res) => {
    const {title, description, tag} = req.body
    if (description == null)
        description = ""
    if (tag == null)
        tag = "general"

    Note.create({
        userid: req.user.userid,
        title,
        description,
        tag: tag
    })
        .then(async (note) => {
            res.status(200).json({ success: true, note })
        })
        .catch((err) => {
            res.status(400).send({ success: false, error: err })
        })
}

module.exports = addNote
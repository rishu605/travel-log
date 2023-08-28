const {Router} = require("express")
const LogEntry = require("./../models/logEntry")

const router = Router()

router.get('/', async (req, res) => {
    try {
        const entries = await LogEntry.find({})
        res.json(entries)
    } catch(err) {
        next(err)
    }
})

router.post('/', async (req, res, next) => {
    try {
        console.log(req.body)
        const logEntry = new LogEntry(req.body)
        const createdEntry = await logEntry.save()
        res.json(createdEntry)
    } catch (err) {
        console.log(err.name)
        if(err.name === "ValidationError") {
            res.status(422)
        }
        next(err)
    }
    
})

module.exports = router
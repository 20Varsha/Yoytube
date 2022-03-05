module.exports = (req, res, next) => {
    if (typeof (req.file) === 'undefined' || typeof (req.body) === 'undefined') {
        return res.status(400).json({
            errors: 'problem with sending data'
        })
    }
  
    if (!(req.file.mimetype).includes('csv')) {
        fs.unlinkSync(req.file.path)
        return res.status(400).json({
            errors: "file not support"
        })
    }

    if (req.file.size > 1024 * 1024) {
        fs.unlinkSync(req.file.path)
        return res.status(400).json({
            errors: "File is Too large"
        })
    }
    console.log(req.file)
    next()
}
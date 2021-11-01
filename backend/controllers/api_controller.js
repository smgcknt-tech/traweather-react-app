export const api_controller = {
    template: async (req, res, callback) => {
        await callback(req.body)
            .then((data) => {
                res.send(data)
            }).catch((err) => {
                res.send(err)
            })
    },
    template2: async (req, res, callback) => {
        await callback()
            .then((data) => {
                res.send(data)
            }).catch((err) => {
                res.send(err)
            })
    },
    template3: async (req, res, callback) => {
        await callback(req.query)
            .then((data) => {
                res.send(data)
            }).catch((err) => {
                res.send(err)
            })
    }
}

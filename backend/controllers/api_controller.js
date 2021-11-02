export const api_controller = {
    passBody: async (req, res, callback) => {
        await callback(req.body)
            .then((data) => {
                res.json(data);
            }).catch((err) => {
                res.send(err);
            });
    },
    passNothing: async (req, res, callback) => {
        await callback()
            .then((data) => {
                res.json(data);
            }).catch((err) => {
                res.send(err);
            });
    },
    passQuery: async (req, res, callback) => {
        await callback(req.query)
            .then((data) => {
                res.json(data);
            }).catch((err) => {
                res.send(err);
            });
    },
};

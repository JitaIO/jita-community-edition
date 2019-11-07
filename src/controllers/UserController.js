const UserController = {
    signup: (req, res, next) => {
        try{
            res.status(200).json({
                statusCode: 200,
                message: "I'm here to signup!",
            })
            .end();
        } catch (e) {
            console.error(e);
            return e;
        }
    },
    activate: (req, res, next) => {
        try{
            res.status(200).json({
                statusCode: 200,
                message: "I'm here to activate!",
            })
            .end();
        } catch (e) {
            console.error(e);
            return e;
        }
    },
    getUserById: (req, res, next) => {
        try{
            res.status(200).json({
                statusCode: 200,
                message: "I'm here to get user id ["+req.params.user_id+"]!",
            })
            .end();
        } catch (e) {
            console.error(e);
            return e;
        }
    },
}

export default UserController;
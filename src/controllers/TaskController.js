const TaskController = {
    getTaskById: (req, res, next) => {
        try{
            res.status(200).json({
                statusCode: 200,
                message: "I'm here to get Task id ["+req.params.Task_id+"]!",
            })
            .end();
        } catch (e) {
            console.error(e);
            return e;
        }
    },
}

export default TaskController;
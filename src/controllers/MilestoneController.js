const MilestoneController = {
    getMilestoneById: (req, res, next) => {
        try{
            res.status(200).json({
                statusCode: 200,
                message: "I'm here to get milestone id ["+req.params.milestone_id+"]!",
            })
            .end();
        } catch (e) {
            console.error(e);
            return e;
        }
    },
}

export default MilestoneController;
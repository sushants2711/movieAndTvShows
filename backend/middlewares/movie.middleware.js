import joi from "joi";

export const createMovieMiddleware = async (req, res, next) => {
    try {
        const schema = joi.object({
            title: joi.string().min(5).max(100).trim().required(),
            type: joi.string().valid("Movie", "TV Show").required(),
            director: joi.string().min(5).max(100).trim().required(),
            budget: joi.number().greater(0).invalid(0).positive().required(),
            location: joi.string().min(5).max(100).trim().required(),
            duration: joi.number().greater(0).invalid(0).positive().required(),
            year: joi.date().required()
        });

        const { error } = schema.validate(req.body);

        if (error) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: error?.details?.[0]?.message
                });
        };

        next();

    } catch (error) {
        return res
            .status(500)
            .json({
                success: false,
                message: "Internal Server Error",
                error: error.message
            });
    };
};

export const updateMovieMiddleware = async (req, res, next) => {
    try {
        const schema = joi.object({
            title: joi.string().min(5).max(100).trim().optional().empty(""),
            type: joi.string().valid("Movie", "TV Show").optional().empty(""),
            director: joi.string().min(5).max(100).trim().optional().empty(""),
            budget: joi.number().greater(0).invalid(0).positive().optional().empty(""),
            location: joi.string().min(5).max(100).trim().optional().empty(""),
            duration: joi.number().greater(0).invalid(0).positive().optional().empty(""),
            year: joi.date().optional().empty("")
        });

        const { error } = schema.validate(req.body);

        if (error) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: error?.details?.[0]?.message
                });
        };

        next();

    }
    catch (error) {
        return res
            .status(500)
            .json({
                success: false,
                message: "Internal Server Error",
                error: error.message
            });
    };
};
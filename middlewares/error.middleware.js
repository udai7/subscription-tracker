const errorMiddleware = (err, req, res, next) => {
    try {
        let error = {... err};
        error.message = err.message;
        console.error(err);

        // Mongoose bad ObjectId
        if(err.name === 'CastError') {
            const message = `Resource not found. Invalid: ${err.path}`;
            error = new Error(message, 404);
        }

        // Mongoose duplicate key
        if (err.code === 11000) {
            const field = Object.keys(err.keyValue)[0]; // Get the field name causing the duplicate
            const message = `Duplicate value for field: "${field}"`;
            error = new Error(message);
            error.statusCode = 400;
          }

        // Mongoose validation error
        if (err.name === 'ValidationError') {
            const message = Object.values(err.errors).map(val => val.message);
            error = new Error(message.join(','));
            error.statusCode = 400;
        }


      res.status(error.statusCode || 500).json({success: false, error: error.message || 'Server Error'});

    } catch (error) {

    }
};

export default errorMiddleware;

//create a subscription -> middleware (check for renewal date) ->middleware (check for errors) -> next -> controller
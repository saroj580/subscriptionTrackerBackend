//the actual logic of the middleware
//When the user have ability to create a new user
//it looks like this
//Create a Subscription --> middleware(Check for the renewal date) --> middleware(Check for error that's what we are doing in this file) --> next --> controller

const errorMiddleware = (err, req, res, next) => {
    try {
        let error = {...err};
        error.message = err.message;
        console.error(err);

        //Mongoose bad ObjectId
        if(err.name === 'CastError') {
            const message = 'Resource not found';

            error = new Error(message);
            error.statusCode = 404;
        }

        //Mongoose duplicate key
        if(err.code === 11000) {
             const message = 'Duplicate field value entered';
             error = new Error(message);
             error.statusCode = 400;
        }

        //Mongoose Validation Error
        if(err.name === 'ValidationError') {
            const message = Object.values(err.errors).map(val => val.message);
            error = new Error(message.join(', '));
            error.statusCode = 400;
        }

        res.status(err.statusCode || 500).json({
            success : false,
            error : error || 'Server error'
        });
    }catch (error){
        next(error)
    }
 }

 export default errorMiddleware;
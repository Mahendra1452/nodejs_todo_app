MVC (Model View Controller)

Making each folder for models, controller and routes(View)

hierarchy is app listen on port 5000 then url goes to users or tasks if request but at last the app.use((err,req,res,next)) api will be used for error handling if the next() is used.


app.use((err,req,res,next)) is middleware for error handling


Both 1 and 2 works the same
( 1 ) if(!user) return next(new ErrorHandler("Invalid email and password",404))
    
( 2 )
    // if(!user)
    // return res.status(404).json({
    //     success: false,
    //     message: "Invalid email and password",
    // })

( 1 ) if(!isMatch) return next(new ErrorHandler("Invalid email and password",404))
    
( 2 )
    if(!isMatch)
    return res.status(404).json({
        success: true,
        message: "Invalid email and password"
    })

( 1 ) await Task.create({
        title,
        description,
        user: req.user
    });

( 2 )    
const task = new Task({title});
await task.save()
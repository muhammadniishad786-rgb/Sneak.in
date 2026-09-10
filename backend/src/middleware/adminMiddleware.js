const adminMiddleware = (req, res, next) => {
    try{
         if(req.user.role !== "admin"){
        res.status(403).json({
            message: "Access denied. Admin only",
        })
    }

    next()
    }catch(err){
        res.status(500).json({
            message: "failed to access",
            error: err.message
        })
    }
   
}

export default adminMiddleware

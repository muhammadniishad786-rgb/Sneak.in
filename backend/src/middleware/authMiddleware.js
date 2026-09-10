import jwt from "jsonwebtoken";

const authMiddleware = async(req, res, next) => {
    try{
        const authHeader = req.headers.authorization

        if(!authHeader){
            res.status(400).json({
                message: "no token provided"
            })
        }

        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(
            token,
            process.env.JWT_TOKEN
        )

        req.user = decoded;

        next();
    }catch(error){
        return res.status(400).json({
            message: "invalid or expired token",
            error: error.message
        })
    }
}

export default authMiddleware
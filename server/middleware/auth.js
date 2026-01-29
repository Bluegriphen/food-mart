import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
    // 1. Check for token in headers (assuming the client sends it in a custom 'token' header)
    const { token } = req.headers; 

    if (!token) {
        // If no token is provided
        return res.json({ success: false, message: "Not Authorized, Login Again" });
    }
    
    try {
        // 2. Verify the token using the secret key
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        
        // 3. Attach the decoded user ID to req.body for subsequent controllers
        req.body.userId = token_decode.id;
        
        // 4. Continue to the next middleware or route handler
        next();
    } catch (error) {
        // Handle invalid, expired, or malformed tokens
        console.log("JWT Verification Error:", error.message);
        res.status(401).json({ success: false, message: "Invalid Token" }); // Using 401 status is standard
    }
}

export default authMiddleware;
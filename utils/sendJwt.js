import jwt from "jsonwebtoken";

export const sendJwt = (user, res, statusCode = 200) => {
    const value = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    res
        .status(statusCode)
        .json({
            'jwt': value,
            'role': user.role ? user.role : 'new'
        })
}
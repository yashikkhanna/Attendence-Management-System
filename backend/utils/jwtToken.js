export const generateToken = (user,message,statusCode,res)=>{
    const token = user.generateJsonWebToken();
    const cookieName = user.role === "Admin"? "adminToken" : "EmployeeToken";

    res.status(statusCode)
    .cookie(cookieName,token,{
        expires:new Date(
            Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        ),
        httpOnly:true,
        secure: true,
        sameSite: "None"
    })
    .json({
        sucess:true,
        message,
        user,
        token
    })
}

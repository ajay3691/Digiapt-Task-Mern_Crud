import jwt from 'jsonwebtoken'
function middleware(req, resp, next) {
    try {
        let token = req.header('x-token')
        if (!token) {
            return resp.status(400).send("Token Not found")
        }

        let decode = jwt.verify(token, 'AJR')

        req.userT = decode.userT
        next()
    }
    catch (err) {
        console.log(err)
        return resp.status(400).send("invalid token")
    }
}
export default middleware




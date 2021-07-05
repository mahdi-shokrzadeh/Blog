import  Jwt  from "jsonwebtoken";

export const decodeToken = (token) => {

    return Jwt.decode(token , { complete: true}) ;
    
}
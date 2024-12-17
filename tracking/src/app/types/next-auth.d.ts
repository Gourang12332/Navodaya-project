import 'next-auth'

declare module 'next-auth'{
    interface User{
        _id? : string,
        username? : string
    }
    interface Session{
     user : {
        id? : string,
        username? : string
     }& DefaultSession['user']
    } 
}
declare module 'next-auth/jwt'{      // this is one another way of the above same thing
    interface JWT {
        id? : string,
        username? : string
    }
}
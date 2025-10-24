    import {config} from "dotenv"
    config()
    export const BD_HOST=process.env.BD_HOST 
    export const BD_DATABASE=process.env.BD_DATABASE 
    export const BD_USER=process.env.BD_USER 
    export const BD_PASSWORD=process.env.BD_PASSWORD 
    export const BD_PORT=process.env.BD_PORT  
    export const PORT=process.env.PORT
    export const JWT_SECRET= process.env.JWT_SECRET
    export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN
    console.log("Valor crudo de PORT:", process.env.PORT);
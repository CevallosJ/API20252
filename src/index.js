import app from "./app.js"
import{PORT} from "./config.js"

app.listen(PORT);//puerto de la variable de entorno
console.log("El servidor está escuchando en el puerto",PORT);

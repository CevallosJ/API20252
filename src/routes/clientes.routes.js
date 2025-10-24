import { Router } from "express";
import { getCliente,getClientexid,postClientes,putClientes,patchClientes ,deleteCliente} from "../controllers/clientesCtrl.js";
const router = Router();


//armar las rutas "URL"

router.get("/clientes",getCliente);
router.get("/clientes/:id",getClientexid);
router.post("/clientes",postClientes);
router.put("/clientes/:id",putClientes)
router.patch("/clientes/:id",patchClientes)
router.delete("/clientes/:id",deleteCliente)
//router.get("/clientes/uwu",getClientexid)
export default router;
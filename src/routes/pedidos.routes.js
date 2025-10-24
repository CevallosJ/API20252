import { Router } from "express";
import { postPedidos, getPedidos, getPedidosById } from "../controllers/pedidosCtrl.js";

const router = Router();

router.post("/pedidos", postPedidos);       // Registrar pedido
router.get("/pedidos", getPedidos);         // Obtener todos los pedidos
router.get("/pedidos/:id", getPedidosById); // Obtener pedido por ID

export default router;

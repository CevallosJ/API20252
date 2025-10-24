// 📂 src/controllers/pedidosCtrl.js
import { conmysql } from "../bd.js";

// 📝 Crear un nuevo pedido
export const postPedidos = async (req, res) => {
    const connection = await conmysql.getConnection();
    try {
        const { cli_id, usr_id, detalles } = req.body;
        // detalles = [{ prod_id, det_cantidad, det_precio }, ...]

        await connection.beginTransaction();

        // 1️⃣ Insertar en tabla pedidos
        const [pedidoResult] = await connection.query(
            `INSERT INTO pedidos (cli_id, ped_fecha, usr_id, ped_estado) 
             VALUES (?, NOW(), ?, 0)`,
            [cli_id, usr_id]
        );
        const ped_id = pedidoResult.insertId;

        // 2️⃣ Insertar detalles
        for (const item of detalles) {
            const { prod_id, det_cantidad, det_precio } = item;
            await connection.query(
                `INSERT INTO pedidos_detalle (prod_id, ped_id, det_cantidad, det_precio) 
                 VALUES (?, ?, ?, ?)`,
                [prod_id, ped_id, det_cantidad, det_precio]
            );
        }

        await connection.commit();
        res.json({ ped_id, message: "Pedido registrado exitosamente ✅" });

    } catch (error) {
        await connection.rollback();
        console.error("❌ Error al registrar pedido:", error);
        res.status(500).json({ message: "Error en el servidor" });
    } finally {
        connection.release();
    }
};

// 📄 Obtener todos los pedidos
export const getPedidos = async (req, res) => {
    try {
        const [rows] = await conmysql.query(
            `SELECT p.ped_id, p.cli_id, c.cli_nombre, p.ped_fecha, p.usr_id, p.ped_estado
             FROM pedidos p
             LEFT JOIN clientes c ON p.cli_id = c.cli_id
             ORDER BY p.ped_fecha DESC`
        );
        res.json(rows);
    } catch (error) {
        console.error("❌ Error al obtener pedidos:", error);
        res.status(500).json({ message: "Error al obtener los pedidos" });
    }
};

// 📄 Obtener un pedido por ID con sus detalles
export const getPedidosById = async (req, res) => {
    try {
        const { id } = req.params;

        // Pedido
        const [pedido] = await conmysql.query(
            `SELECT p.ped_id, p.cli_id, c.cli_nombre, p.ped_fecha, p.usr_id, p.ped_estado
             FROM pedidos p
             LEFT JOIN clientes c ON p.cli_id = c.cli_id
             WHERE p.ped_id = ?`,
            [id]
        );

        if (pedido.length === 0) {
            return res.status(404).json({ message: "Pedido no encontrado" });
        }

        // Detalles
        const [detalles] = await conmysql.query(
            `SELECT d.det_id, d.prod_id, pr.prod_nombre, d.det_cantidad, d.det_precio
             FROM pedidos_detalle d
             LEFT JOIN productos pr ON d.prod_id = pr.prod_id
             WHERE d.ped_id = ?`,
            [id]
        );

        res.json({
            pedido: pedido[0],
            detalles
        });

    } catch (error) {
        console.error("❌ Error al obtener pedido por ID:", error);
        res.status(500).json({ message: "Error al obtener el pedido" });
    }
};

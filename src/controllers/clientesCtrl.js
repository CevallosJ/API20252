import { response } from "express";
import { conmysql } from "../bd.js";

export const obtenerClientes=(req,res)=>{
    res.send("lista de clientes");
}


export const getCliente = async (req, res) => {
    try {
        const [result] = await conmysql.query("select * from clientes");
        return res.json({
            cant: result.length,
            data: result
        });
    } catch (error) {
        return res.status(500).json({ message: "error en el servidor" });
    }
};

//obtener cliente por id
export const getClientexid = async (req, res) => {
  try {
    const [result] = await conmysql.query(
      "SELECT * FROM clientes WHERE cli_id = ?",
      [req.params.id]
    );

    if (result.length <= 0) {
      res.status(400).json({
        cli_id: 0,
        message: "Cliente no encontrado",
      });
      return; // <- muy importante
    }

    res.json(result[0]);
    return; // <- por claridad, aunque opcional aquí
  } catch (error) {
    console.error("Error en getClientexid:", error);

    // Solo enviamos respuesta si aún no se ha enviado
    if (!res.headersSent) {
      return res.status(500).json({ message: "Error en el servidor" });
    }
    // Si los headers ya fueron enviados, no hagas nada
  }
};


//funcion para insertar un cliente

export const postClientes= async (req,res)=>{

    try {
        const{cli_identificacion,cli_nombre,cli_telefono,cli_correo,cli_direccion,cli_pais,cli_ciudad} = req.body
        //res.send([req.body.cli_identificacion]);
        const [result] =await conmysql.query(
            "INSERT INTO clientes(cli_identificacion,cli_nombre,cli_telefono,cli_correo,cli_direccion,cli_pais,cli_ciudad) VALUES (?,?,?,?,?,?,?)"
            ,[cli_identificacion,cli_nombre,cli_telefono,cli_correo,cli_direccion,cli_pais,cli_ciudad]
        );
        res.send({
            cli_id:result.insertId,
            message:"Se logró"
        })
    } catch (error) {
        return res.status(500).json({message:"error en el servidor"})
    }
}

//funcion para actualizar
//funcion que permite modificar un cliente
export const putClientes=async(req,res,)=>{
    try {
        const{id}=req.params
        const {cli_identificacion, cli_nombre, cli_telefono, cli_correo, cli_direccion, cli_ciudad}=req.body
        //console.log(req.body)
        const [result] = await conmysql.query(
            '  UPDATE clientes SET cli_identificacion=?, cli_nombre=?, cli_telefono=?, cli_correo=?, cli_direccion=?, cli_ciudad=? WHERE cli_id=?', 
            [cli_identificacion, cli_nombre, cli_telefono, cli_correo, cli_direccion, cli_ciudad, id]
        )
        if(result.affectedRows<=0) return res.status(404).json({
            message:"cliente no encontrado"
        })
        const [row] = await conmysql.query(' select * from clientes where cli_id=? ', [id])
        res.json(row[0])

    } catch (error) {
        return res.status(500).json({ message: "error en el servidor"})
    }
}



export const patchClientes=async(req,res,)=>{
    try {
        const{id}=req.params
        const {cli_identificacion, cli_nombre, cli_telefono, cli_correo, cli_direccion, cli_ciudad, cli_estado}=req.body
        //console.log(req.body)
        const [result] = await conmysql.query(
            '  UPDATE clientes SET cli_identificacion=IFNULL(?,cli_identificacion), cli_nombre=IFNULL(?,cli_nombre), cli_telefono=IFNULL(?,cli_telefono), cli_correo=IFNULL(?,cli_correo), cli_direccion=IFNULL(?,cli_direccion), cli_ciudad=IFNULL(?,cli_ciudad),cli_estado=IFNULL(?,cli_estado) WHERE cli_id=?', 
            [cli_identificacion, cli_nombre, cli_telefono, cli_correo, cli_direccion, cli_ciudad,cli_estado, id]
        )
        if(result.affectedRows<=0) return res.status(404).json({
            message:"cliente no encontrado"
        })
        const [row] = await conmysql.query(' select * from clientes where cli_id=? ', [id])
        res.json(row[0])

    } catch (error) {
        return res.status(500).json({ message: "error en el servidor"})
    }
}


export const deleteCliente= async (req,res)=>{

    try{
        //const miDI=req.params.id
        const [result] =await conmysql.query("delete from clientes where cli_id=?",[req.params.id]);
        //const [result] =await conmysql.query("select * from clientes where cli_id=?",[req.query.id]);
        if(result.length<=0) return res.status(400).json({
            cli_id:0,
            message:"Cliente no encontrado"
        })
        res.sendStatus(204);
    }catch(error){
        return res.status(500).json({message:"error en el servidor"})
    }

   
}
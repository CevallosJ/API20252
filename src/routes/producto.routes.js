import { Router } from "express";
import multer from "multer";
import upload from '../middlewares/upload.js';
import { deleteProductosxid, getProductos, getProductoxid, patchProductos, postProductos, putProductos } from "../controllers/productosCtrl.js";

const storage= multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"uploads");
    },
    filename:(req,file,cb)=>{
        cb(null, `${Date.now()}-${file.originalname}`)
    }
});

const uploads = multer({storage});

const router=Router();

router.get('/productos',getProductos);
router.get('/productos/:id',getProductoxid);
router.post('/productos',upload.single("prod_imagen"),postProductos);
router.put('/productos',upload.single("prod_imagen"),putProductos);
router.patch('/productos/:id',patchProductos);
router.delete('/productos/:id',deleteProductosxid);

export default router
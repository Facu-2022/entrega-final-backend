import { Router } from 'express'
import CartManager from '../manager/cart.manager.js'

const router = Router()
const cartManager = new CartManager()

router.get('/', async(req,res)=>{
    const result = await cartManager.list()
    res.send(result)
})
router.get('/:cid/', async (req, res) => {
    try {
        const cid = parseInt(req.params.cid)
        const result = await cartManager.getById(cid)
        if (!result) {
            res.status(404).json({
                message: 'carrito no existe'
            })
        }

        res.send(result);
    } catch {
        res.status(500).json({
            message: error.message
        })
    }


});

router.post('/', async(req,res)=>{
    try{
        await cartManager.create();
        res.send({ status: "cart creado", result });
    }catch{
        res.status(500).json({
            message: error.message
        })
    }

})
router.post('/:cid/product/:pid', async (req, res) => {
    try {
        
        const cid = parseInt(req.params.cid)
        const pid = parseInt(req.params.pid)
    
        await cartManager.addProduct(cid, pid)
    
        res.status(201).json({message:'Producto agregado al carrito'})

    } catch (error) {
        
        res.status(500).json(error.message)

    }
  });
export default router
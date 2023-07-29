import { Router } from 'express'
import ProductManager from '../manager/product.manager.js'

const router = Router()
const productManager = new ProductManager()

router.get('/', async (req, res) => {
    const limit = req.query.limit;
    const result = await productManager.list(limit)
    if (!result) {
        res.status(400).json(`Product not found`);
    }
    res.json(result)

})

router.get('/:id', async (req, res) => {

    try{
        const productId = req.params.id;
        const product = await productManager.getById(productId);
        return res.json(product)
    }catch(error){
        res.status(404).json({
            message: error.message
        })
    }
});

router.post('/', async (req, res) => {
    const { title, description, code, price, status, stock, category, thumbnails } = req.body;

    if (!(title && description && code && price && stock && category && thumbnails)) {
        return res.status(404).json({ error: 'Faltan campos obligatorios' });
    }
    try {

        const data = {
            title,
            description,
            code,
            price,
            status: status ?? true,
            stock,
            category,
            thumbnails
        }
        await productManager.create(data);

        res.status(404).json({
      
         message: `producto creado `,
      
        });;

        
    }catch(error){
        res.status(500).json({
            message: error.message
        })
    }
})
router.put('/:pid', async (req, res) => {
    const productId = req.params.pid;
    const body = req.body;

    const updatedData = {
        title: body.title,
        description: body,          
        code: body.code,
        price: body.price,
        status: body.status ?? true,      
        stock: body.stock,     
        category: body.category,     
        thumbnails: body.thumbnails,
    }

    try {
        const updatedProduct = await productManager.updateProduct(updatedData, productId);
        if (!updatedProduct) {
            res.status(404).json({
                message: 'producto no actulizado'
            })
        }
        res.send({status: 'producto actualizado', updatedProduct});
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
  });
    
router.delete('/:pid', async (req, res) => {
    const productId = req.params.pid;

    try {
        await productManager.deleteProduct(productId);
        res.send({status: 'removed product', productManager});
    }catch(error){
        res.status(500).json({
            message: error.message
        })
    }
});
export default router
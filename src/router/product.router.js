import { Router } from 'express'
import ProductManager from '../manager/product.manager.js'

const router = Router()
const productManager = new ProductManager()

router.get('/', async (req, res) => {
    const limit = req.query.limit;
    const result = await productManager.list(limit)
    res.send(result)
})

router.get('/:id', async (req, res) => {
    const productId = req.params.id;

    try {
        const product = await productManager.getById(productId);
        if (product) {
            res.json(product);
            
        } else {
            res.status(404).json({ error: 'Producto no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el producto' });
    }
});

router.post('/', async (req, res) => {
    const { title, description, code, price, status, stock, category, thumbnails } = req.body;

    if (!(title && description && code && price && stock && category && thumbnails)) {
        return res.status(404).json({ error: 'Faltan campos obligatorios' });
    }

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
    const result = await productManager.create(data)
    res.send(result)
    res.status(201).send("producto creado exitosamente")
})
router.put('/:pid', async (req, res) => {
    const productId = req.params.pid;

    const updatedData = {
        title,
        description,
        code,
        price,
        status: status ?? true,
        stock,
        category,
        thumbnails
    }
     try {
        const updatedProduct = await productManager.updateProduct(updatedData, productId);
        res.send(updatedProduct);
    } catch (error) {
        const status = error.status || 404
        console.log(error.message);
        res.status(status).json(error.message);
    }
  });
    
router.delete('/:pid', async (req, res) => {
    const productId = req.params.pid;

    try {
        await productManager.deleteProduct(productId);
        res.send('Producto eliminado correctamente');
    } catch (error) {
        const status = error.status || 404;
        console.log(error.message);
        res.status(status).json(error.message);
    }
});
export default router
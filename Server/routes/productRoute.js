import express from 'express';
import Product from '../models/Product.js';

const router = express.Router();
router.get("/", (req, resp) => {
  resp.send("Hello")

})

router.post('/product', async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    if (error.code === 11000) {
      console.error('Duplicate key error:', error);
      return res.status(400).json({ error: 'Product with this ID already exists.' });
    }

    console.error('Error creating product:', error);
    res.status(500).json({ error: 'Error creating product' });
  }
});



router.get('/product/:id', async (req, res) => {
  try {
    const product = await Product.findOne({ p_id: req.params.id });
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ error: 'Error fetching product' });
  }
});


router.get('/products', async (req, res) => {
  try {
    const { page = 1, pageSize = 10, searchTerm } = req.query;

    const filter = {};
    if (searchTerm) {
      filter.$or = [
        { p_name: { $regex: new RegExp(searchTerm, 'i') } },
        { p_category: { $regex: new RegExp(searchTerm, 'i') } },
        { p_id: { $regex: new RegExp(searchTerm, 'i') } },
        { p_description: { $regex: new RegExp(searchTerm, 'i') } },
      ];
    }

    const products = await Product.find(filter)
      .skip((page - 1) * pageSize)
      .limit(Number(pageSize));

    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Error fetching products' });
  }
});

/* // Update a product by ID obj _id
router.put('/product/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}); */

router.put('/product/:id', async (req, res) => {
  try {
    const product = await Product.findOneAndUpdate({ p_id: req.params.id }, req.body, { new: true });
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/product/:id', async (req, res) => {
  try {
    const product = await Product.findOneAndDelete({ p_id: req.params.id });
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ error: 'Error deleting product' });
  }
});

export default router;

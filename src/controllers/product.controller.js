import ProductService from "../services/products.service.js";
const productService = new ProductService();


class ProductController {
    async addProduct(req, res) {
        const newProduct = req.body; 
        try {
            await productService.addProduct(newProduct);
            
            respuesta(res, 200, "Producto creado exitosamente!");
        } catch (error) {
            
            respuesta(res, 500, "Error al crear producto");
        }
    }

    async getProducts(req, res) {
        try {
            const products = await ProductService.getProducts();
                    res.json(products);
        } catch (error) {
            res.status(500).json("Error al obtener los productos");
        }
    }
}

export default ProductController;
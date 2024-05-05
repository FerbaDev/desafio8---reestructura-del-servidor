import ProductService from "../services/products.service.js";
const productService = new ProductService();


class ProductController {
    async crearJuguete(req, res) {
        const jugueteNuevo = req.body; 
        try {
            await jugueteService.crearJuguete(jugueteNuevo);
            //res.json(jugueteNuevo);
            respuesta(res, 200, "Producto creado exitosamente!");
        } catch (error) {
            //res.status(500).json("Error al crear un juguete nuevo")
            respuesta(res, 500, "Error al crear producto");
        }
    }

    async obtenerJuguetes(req, res) {
        try {
            const juguetes = await jugueteService.obtenerJuguetes();
                    res.json(juguetes);
        } catch (error) {
            res.status(500).json("Error al obtener los juguetes");
        }
    }
}

export default JugueteController;
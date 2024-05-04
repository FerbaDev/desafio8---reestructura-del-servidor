import express from "express";
const router = express.Router();
import ProductManager from "../controllers/productManager.js";
const productManager = new ProductManager();

router.get("/", (req, res) => {
    res.render("home", {title: "Home", user: req.session.user})
})

router.get("/register", (req, res) => {
    if (req.session.login) { //si ya existe usuario lo manda al perfil
        return res.redirect("/profile")
    }
    res.render("register", {title: "Registro"})
})

router.get("/login", (req, res) => {
    if (req.session.login) { //si ya logueado lo manda a productos
        return res.redirect("/products")
    }
    res.render("login", {title: "Login"})
})

router.get("/profile", (req, res) => {
    if (!req.session.login) { //sino está loguado lo manda al login
        return res.redirect("/login")
    }
    res.render("profile", {user: req.session.user})
})

router.get("/products", async (req, res) => {
    try {
      const { page = 1, limit = 5 } = req.query;
      const products = await productManager.getProducts({
        page: parseInt(page),
        limit: parseInt(limit),
      });
      const newArray = products.docs.map((producto) => {
        const { _id, ...rest } = producto.toObject();
        return rest;
      });
      res.render("products", {
        productos: newArray,
        hasPrevPage: products.hasPrevPage,
        hasNextPage: products.hasNextPage,
        prevPage: products.prevPage,
        nextPage: products.nextPage,
        currentPage: products.page,
        totalPages: products.totalPages,
      });
    } catch (error) {
      console.error("Error al obtener productos en views router", error);
      res.status(500).json({
        status: "error",
        error: "Error interno del servidor en views",
      });
    }
  })


export default router;
const express = require("express");
const router = express.Router();
const multer = require("multer");
const checkAuth = require("../middleware/check-auth");
const ProductsController = require("../controllers/products");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    const date = new Date();
    var dateString = `${date.getFullYear()}-${date.getDate()}-${date.getMonth()}_${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}-${date.getMilliseconds()}`;
    console.log(dateString);
    cb(null, dateString + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  //reject a file
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
    console.log("peut etre ajouté");
  } else {
    cb(null, false);
    console.log("ne peut pas etre ajouté");
  }
};

const upload = multer({
  storage: storage,
  limits: {
    filseSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});

const Product = require("../models/products");

//Récupere tous les produits
router.get("/", ProductsController.products_get_all);

//Ajoute un nouveau produit
router.post(
  "/",
  checkAuth,
  upload.single("productImage"),
  ProductsController.products_create_product
);

//Récupere un produit grace à un ID
router.get("/:productId", ProductsController.products_get_product);

//Met à jour un produit grace à un ID
router.patch(
  "/:productId",
  checkAuth,
  ProductsController.products_update_product
);

//Supprime un produit grace à son ID
router.delete(
  "/:productId",
  checkAuth,
  ProductsController.products_delete_product
);

module.exports = router;

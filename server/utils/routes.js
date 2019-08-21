const Products = require('../controllers/products');

module.exports = app => {
  app.get("/products", Products.getAll);
  app.get("/products/:_id", Products.getOne);
  app.post("/products", Products.create);
  app.put("/products/:_id", Products.update);
  app.delete("/products/:_id", Products.remove);
}
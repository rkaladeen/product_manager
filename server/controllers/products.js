const Product = require('mongoose').model('Product');

class ProductController {
    getAll(req, res){
      Product.find({})
            .then(data => res.json(data))
            .catch(err => res.json(err));
    }
    getOne(req, res){
      Product.findOne({_id: req.params._id})
            .then(data => res.json(data))
            .catch(err => res.json(err));
    }
    create(req, res){
        let prod = new Product(req.body);
        prod.save()
            .then(() => res.json({status: "Product created!"}))
            .catch(err => res.json(err));
    }
    update(req, res){
      Product.findOneAndUpdate({_id: req.params._id}, req.body, {runValidators: true})
            .then(() => res.json({status: "Update successful!"}))
            .catch(err => res.json(err));
    }
    remove(req, res){
      Product.findOneAndDelete({_id: req.params._id})
            .then(() => res.json({status: "Product removed!"}))
            .catch(err => res.json(err));
    }
}

module.exports = new ProductController();
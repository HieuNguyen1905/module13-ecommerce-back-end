const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({include:[{model:Product, as: 'products'}]}).then(categoryData=>{
    res.json(categoryData);
  }).catch(err =>{
    console.log(err);
    res.status(500).json({msg:err})
  })
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findByPk(req.params.id,{
    include: [Product]
  }).then(categoryData=>{
    if(!categoryData){
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }
    res.status(200).json(categoryData);
  }).catch(err =>{
    console.log(err);
    res.status(500).json({msg:err})
  })
});

router.post('/', (req, res) => {
  // create a new category
  Category.create({
    category_name: req.body.category_name
  }).then(categoryData=>{
    res.json(categoryData);
  }).catch(err =>{
    console.log(err);
    res.status(500).json({msg:err})
  })
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(
  {category_name: req.body.category_name},
  { where:{id: req.params.id }}).then(categoryData =>{
    res.json(categoryData);
  }).catch(err =>{
    console.log(err);
    res.status(500).json({msg:err})
  })
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where:{
      id: req.params.id
    }
  }).then(categoryData=>{
    if(!categoryData){
      res.status(404).json({ message: 'No such category' });
      return;
    }
    res.status(200).json(categoryData);
  }).catch(err =>{
    console.log(err);
    res.status(500).json({msg:err})
  })
});

module.exports = router;

const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll({
    include:[{model:Product, as: 'tags'}]}).then(tagData=>{
      res.json(tagData);
    }).catch(err =>{
      console.log(err);
      res.status(500).json({msg:err})
    })
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findByPk(req.params.id,{
    include:[{model:Product, as: 'tags'}]}).then(tagData=>{
      if(!tagData){
        res.status(404).json({ message: 'No tag found with this id!' });
        return;
      }
      res.status(200).json(tagData);
    }).catch(err =>{
      console.log(err);
      res.status(500).json({msg:err})
    })
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create(req.body).then(tagData=>{
    res.json(tagData);
  }).catch(err =>{
    console.log(err);
    res.status(500).json({msg:err})
  })
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(
    {tag_name: req.body.tag_name},
    { where:{id: req.params.id }}).then(tagData =>{
      res.json(tagData);
    }).catch(err =>{
      console.log(err);
      res.status(500).json({msg:err})
    })
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where:{
      id: req.params.id
    }
  }).then(tagData=>{
    if(!tagData){
      res.status(404).json({ message: 'No such tag' });
      return;
    }
    res.status(200).json(tagData);
  }).catch(err =>{
    console.log(err);
    res.status(500).json({msg:err})
  })
});

module.exports = router;

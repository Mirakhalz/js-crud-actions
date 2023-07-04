var express = require("express");
var router = express.Router();


//injection makes testing easier & focus on crud actions 
module.exports = function (db) {
  //use router.route to chain get/post functions (remove the first paramater from all the functions)
  router
  .route("/products")
  //the path we want to route to and it takes 2 paramenters first the path it should respond to second that gets called when someone acesses products
  .get((req, res) => { //2objects request respond
    //send is used to send the data to the url otherwise it will not work 
    res.send(db.get("products").value()); //load product collection from database value returns the data 
  })
  .post((req, res) => {
    const newProduct = req.body;
    res.send(db.get("products").insert(newProduct).write()); //must include write or won't be saved to db
  });

  router
  .route("/products/:id")
  //provide an update funtion pass in the id of the product to update 
  .patch( (req, res) => {
    res.send(
      //pass the object to find, params.id is stored in the request object function
      db.get("products").find({ id: req.params.id }).assign(req.body).write()
      ); 
  })

  .delete((req, res) => {
      //delete a product from the database 
      db.get("products").remove({ id: req.params.id }).write();
      res.status(204).send();//confirms item delete by returning 204 no content

  })

  //get a specific item by it's id
  .get((req, res) => {
    res.send(
      //value will get it from the database line 5 requests all products while this line requests the id specifically
      db.get("products").find({ id: req.params.id }).value()
      ); 

  });

  
  return router;
};

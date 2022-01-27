const express = require("express");
const route = express.Router();
const fs = require('fs');
const path = require('path');
route.get("/", (req, res) => {
    if(req.query.category){
        fs.readFile(path.join(__dirname, '../data/products.json'), (error, data)=>{
            if(error) throw error;
            let categories= [];
            
            JSON.parse(data.toString()).forEach(item=> !categories.includes(item.category) && categories.push(item.category));
            
            let products= JSON.parse(data.toString()).filter(item=>item.category===req.query.category);
            res.render("mainTemplate", {
                title: "Products Page",
                content:"products",
                data: products,
                category: categories,
              });
        })
    }else{
        fs.readFile(path.join(__dirname, '../data/products.json'), (error, data)=>{
            if(error) throw error;
            let categories= [];
      
            let categoryArray=JSON.parse(data.toString()).forEach(item=> !categories.includes(item.category) && categories.push(item.category));
            console.log(categoryArray)
            console.log(categories)
            res.render("mainTemplate", {
              title: "Products Page",
              content:"products",
              data: JSON.parse(data.toString()),
              category: categories,
            });
        })
    }

    
});

module.exports = route;

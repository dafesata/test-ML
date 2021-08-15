const express = require('express'); 
const app = express(); 
const port = process.env.PORT || 5000; 

app.listen(port, () => console.log(`Listening on port ${port}`)); 

function httpGet(theUrl){
  var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
  xmlHttp.send( null );
  return JSON.parse(xmlHttp.responseText);
}
// create a GET route
app.get('/express_backend', (req, res) => { 
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' }); 
}); 

app.get("/api/items/:id",(req,res) => {
  var id = req.params.id;
  const data = getItemInformation(id);
  res.send(data);

});

app.get('/api/items',(req,res)=> {
  var query = req.query.q;
  const data= getItemsQuery(query);
  res.send(data);
});

function getItemsQuery(search){
  let responseObj = {
    'author':{
      "name" : "Daniel",
      "lastname": "Salas"
    }
  };
  
  const response = httpGet('https://api.mercadolibre.com/sites/MLA/search?q='+search);

  let categories=[];
  if (response.available_filters.length>0 && response.available_filters.find(element => element.id == 'category') != null){
    categories.push(response.available_filters.find(element => element.id == 'category'));
    
  }else{
    if(response.filters.length>0){
      categories.push(response.filters.find(element => element.id == 'category'))
    }
  } 

  responseObj.categories = categories.length > 0 ? getCategories(categories[0]) : categories;
  responseObj.items = response.results.length > 0 ? getItems(response.results.slice(0,4)) : [];
  responseObj.breadcrumb= categories.length > 0 ? getBreadCrumb(categories[0]) : categories;

  return responseObj;
 
}


function getCategories(categories){
  let categoriesResponse = []
  categories.values.map((category)=>{
    categoriesResponse.push(category.name);
  });

  return categoriesResponse;
}

function getBreadCrumb(categories){
  let categoriesResponse = []
  
   if(categories.values[0].path_from_root){
    categories.values[0].path_from_root.map((category)=>{
      categoriesResponse.push(category.name);
    })
  }else{
    category = getCategory(categories.values[0].id)
    category.path_from_root.map((category) => {
      categoriesResponse.push(category.name);
    })
  }
   
  return categoriesResponse;

}

function getCategory(id){
  return httpGet('https://api.mercadolibre.com/categories/'+ id)
}

function getItems(items){
  let itemsResponse = []
  items.map((item) => {    
    let parsedItem= parseItem(item);
    parsedItem.state= item.address.state_name;
    itemsResponse.push(parsedItem);
  });
  return itemsResponse;
}

function parseItem(item){
 return {
  "id": item.id,
  "title": item.title,
  "price": {
  "currency": item.currency_id,
  "amount": Math.floor(item.price),
  "decimals": (item.price - Math.floor(item.price))
  },
  "picture": item.thumbnail,
  "condition": item.condition,
  "free_shipping": item.shipping.free_shipping
  }
}
function getItemInformation(id){
  let responseObj = {
    'author':{
      "name" : "Daniel",
      "lastname": "Salas"
    }
  };

  const item =  httpGet('https://api.mercadolibre.com/items/'+id);
  const description =  httpGet('https://api.mercadolibre.com/items/'+id+'/description'); 

  responseObj.item = parseItem(item);
  responseObj.item.description = description.plain_text;
  responseObj.item.address = item.seller_address.state.name;
  categories = getCategory(item.category_id);
  responseObj.breadcrumb = []
  categories.path_from_root.map((category) => {
    responseObj.breadcrumb.push(category.name);
  })

  return responseObj;

}
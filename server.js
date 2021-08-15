const express = require('express'); 
const app = express(); 
const port = process.env.PORT || 5000; 


app.listen(port, () => console.log(`Listening on port ${port}`)); 

// create a GET route
app.get('/express_backend', (req, res) => { 
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' }); 
}); 

app.get('/api/items',(req,res)=> {
  var query = req.query.query;
  const data= getItemsQuery(query);
  res.send(data);
});

function getItemsQuery(search){
  const request = require('request');
  let responseObj = {
    'author':{
      "name" : "Daniel",
      "lastname": "Salas"
    }
  };
  
  let bodyresponse;
  const response =request('https://api.mercadolibre.com/sites/MLA/search?q='+search, function (error, response, body) {
  if (!error && response.statusCode == 200) {
    return body; 
  }
})

  return response;
  let categories=[];
  
  if (response.available_filters.length>0){
    categories.push(response.available_filters.find(element => element.id == 'category'));
  }else{
    if(response.filters.length>0){
      categories.push(response.filters.find(element => element.id == 'category'))
    }
  } 
  
  responseObj.categories = categories.length > 0 ? getCategories(categories) : categories;
  //responseObj.items = response.results.length > 0 ? getItems(response.results.slice(0,4)) : [];

  return responseObj;
 
}
function httpGet(theUrl){
  
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

function getCategories(categories){
  let categoriesResponse = []
  categories.values.map((category)=>{
    categoriesResponse.push(category.name);
  })
  return categoriesResponse;
}

function getItems(items){
  let itemsResponse = []
  items.values.map((item) => {
    
    itemsResponse.push({
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
      })
  });
}
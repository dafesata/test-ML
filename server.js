const express = require('express'); 
const app = express(); 
const port = process.env.PORT || 5000; 


app.listen(port, () => console.log(`Listening on port ${port}`)); 

// create a GET route
app.get('/express_backend', (req, res) => { 
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' }); 
}); 

app.get('/api/items/:id',(req,res)=> {
  var id = req.params.id;
  const data= getItemInformation(id);
  console.log(data);
  res.send(data);
});

function getItemInformation(id){
  const request = require('request');
  const response= request('https://api.mercadolibre.com/items/'+id, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      return body; // Show the HTML for the Google homepage. 
    }
  });
  
  return response;
 
}
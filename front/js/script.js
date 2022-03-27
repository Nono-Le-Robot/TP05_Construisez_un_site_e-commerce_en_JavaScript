const url = `http://localhost:3000/api/products`

fetch(url).then(function(data) {
    if(response.ok) {
        console.log("connexion réussie");
        console.log(data);

    }
    else {
        console.log('Mauvaise réponse du réseau');
    }
})

    
.catch(function(error) {
    console.log('Il y a eu un problème avec l\'opération fetch: ' + error.message);
});
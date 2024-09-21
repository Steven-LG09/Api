fetch("https://fake-api-vq1l.onrender.com/posts", {
    method: "GET",
    headers: {
      "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjE1LCJlbWFpbCI6InN0ZXZlbi5sb3BlejJAdXRwLmVkdS5jbyIsImlhdCI6MTcyNjY4MTkzMiwiZXhwIjoxNzQzOTYxOTMyfQ.B4COfQ30uuvJjfW-t7nRCm6uSoFq_sVpEip5iy5S6rQ"
    }
})
  //pasarlo a json
  .then(response => response.json())
  //procesar la info
  .then(data => {

    const list = document.getElementById("list");


    data.forEach( product => {
      const il = document.createElement("li");
      const images = JSON.parse(product.images)
      const myhtml = ` 
        <div class="card " style="width: 18rem; border: 2px solid #F5E7B2;background-color: #F5E7B2;">
          <img src="${images[0]}" class="card-img-top image" alt="error en imagen">
          <div class="card-body card" style="border: 2px solid #E0A75E; background-color: #FFEEA9;">
            <h5 class="card-title" style="color: #E85C0D">${product.title}</h5>
            <p class="card-text">${product.description}</p>
            <p class="card-text">${product.value}</p>
            <div class="Buttons">
              <div class="Button1">
                <Button class="bEditar">
                  <img src="pen.png" class="iEliminar"/>
                </Button>
              </div>
              <div class="Button1">
                <Button onclick="deletePost(${product.id})" class="bEliminar">
                  <img src="delete.png" class="iEliminar"/>
                </Button>
              </div>
            </div>
          </div>
        </div>
      `; 
      il.innerHTML =  myhtml;
      list.appendChild(il); 
    })
  });


function sendForm(){
  const title = document.getElementById("title");
  const description = document.getElementById("description");
  const value = document.getElementById("value");
  const image = document.getElementById("image");
  const body ={
    title: title.value,
    description: description.value,
    value: value.value,
    images: [image.value] 
  }


  fetch("https://fake-api-vq1l.onrender.com/posts", {
    method: "POST", 
    headers: {
      "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjE1LCJlbWFpbCI6InN0ZXZlbi5sb3BlejJAdXRwLmVkdS5jbyIsImlhdCI6MTcyNjY4MTkzMiwiZXhwIjoxNzQzOTYxOTMyfQ.B4COfQ30uuvJjfW-t7nRCm6uSoFq_sVpEip5iy5S6rQ",
      "Content-type": "application/json"
    },
    body: JSON.stringify(body)
  })
  .then( res => res.json())
  .then( res => {
    console.log(
      "respuesta de la api", res
    )
    title.value = "";
    description.value = "";
    value.value = "";
    image.value = "";
    location.reload();
  })

}

function deletePost(id){
  fetch(`https://fake-api-vq1l.onrender.com/posts/${id}`, {
    method: "DELETE", 
    headers: {
      "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjE1LCJlbWFpbCI6InN0ZXZlbi5sb3BlejJAdXRwLmVkdS5jbyIsImlhdCI6MTcyNjY4MTkzMiwiZXhwIjoxNzQzOTYxOTMyfQ.B4COfQ30uuvJjfW-t7nRCm6uSoFq_sVpEip5iy5S6rQ",
    },
  })
  .then( res => res.json())
  .then( res => {
    console.log(
      "respuesta de la api", res
    )
    location.reload();
  })
}

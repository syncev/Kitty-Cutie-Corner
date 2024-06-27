const api = axios.create({
  baseURL: 'https://api.thecatapi.com/v1'
});
api.defaults.headers.common['X-API-KEY'] = 'live_ab06oxShyUTHukjpawTqjD4hUx6oO0dCfrnZmk0TiM3vuRHHHJS6nsMOJyFAzNgL'


const API_URL_RANDOM =
  "https://api.thecatapi.com/v1/images/search?limit=2&api_key=live_ab06oxShyUTHukjpawTqjD4hUx6oO0dCfrnZmk0TiM3vuRHHHJS6nsMOJyFAzNgL";
const API_URL_FAVORITES =
  "https://api.thecatapi.com/v1/favourites";
  const API_URL_FAVORITES_DELETE = (id) =>
  `https://api.thecatapi.com/v1/favourites/${id}`;
const API_URL_UPLOAD =
    "https://api.thecatapi.com/v1/images/upload";



const spanError = document.getElementById("error")

async function loadRandomMichis() {

  const {data, status} = await api.get('/images/search?limit=3')

  // const res = await fetch(API_URL_RANDOM);
  // const data = await res.json();

  if(status !== 200){
    spanError.innerHTML = "Algo malio sal" + status;
  } else {
    const img1 = document.getElementById("img1");
    const img2 = document.getElementById("img2");
    const img3 = document.getElementById("img3");
    const btn1 = document.getElementById("btn1");
    const btn2 = document.getElementById("btn2");
    const btn3 = document.getElementById("btn3");
  
    img1.src = data[0].url;
    img2.src = data[1].url;
    img3.src = data[2].url;

    const articles = document.getElementsByClassName("randomArt");

    for(let article of articles) {
      const button = article.querySelector("button");
      if(button){
        const img = button.querySelector("img");
        img.src = "./assets/unsaved no bg.png";
      }
    }

    btn1.onclick = () => {
      saveFavouriteMichi(data[0].id)
    
      const img = btn1.querySelector("img");
      if (img. src = "./assets/unsaved no bg.png"){
        img.src = "./assets/saved no bg.png"
      } 
    }
    btn2.onclick = () => {
      saveFavouriteMichi(data[1].id)
    
      const img = btn2.querySelector("img");
      if (img. src = "./assets/unsaved no bg.png"){
        img.src = "./assets/saved no bg.png"
      } 
    }
    btn3.onclick = () => {
      saveFavouriteMichi(data[2].id)
    
      const img = btn3.querySelector("img");
      if (img. src = "./assets/unsaved no bg.png"){
        img.src = "./assets/saved no bg.png"
      } 
    }
  }
}
async function loadFavoritesMichis() {
  const {data, status} = await api.get('/favourites')

    // const res = await fetch(API_URL_FAVORITES,{
    //   method: 'GET',
    //   headers:{
    //     'X-API-KEY': `live_ab06oxShyUTHukjpawTqjD4hUx6oO0dCfrnZmk0TiM3vuRHHHJS6nsMOJyFAzNgL`
    //   }
    // });
    // const data = await res.json();


    if(status !== 200){
      spanError.innerHTML = "Algo malio sal" + status + data.message;
    } else {
      const section = document.getElementById('favoriteMichis')
      section.innerHTML = ""

      data.forEach(michi =>{
        const article = document.createElement('article');
        const img = document.createElement('img');
        const btn = document.createElement('button');
        const btnImg = document.createElement("img");
       

        img.src = michi.image.url
        img.width = 350;
        img.className = "favImg"
        btn.appendChild(btnImg);
        btnImg.src = "./assets/saved no bg.png";
        btn.onclick = () => deleteFavouriteMichi(michi.id)

        article.appendChild(img)
        article.appendChild(btn);
        section.appendChild(article);
      })
    }
  }
async function saveFavouriteMichi(id){

  const {data, status} = await api.post('/favourites', {
    image_id: id,
  });


  // const res = await fetch(API_URL_FAVORITES, {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/JSON',
  //     'X-API-KEY': `live_ab06oxShyUTHukjpawTqjD4hUx6oO0dCfrnZmk0TiM3vuRHHHJS6nsMOJyFAzNgL`
      
  //   },
  //   body: JSON.stringify({
  //     image_id: id
  //   }),
  // });
  // const data = await res.json();


  if(status !== 200){
    spanError.innerHTML = "Algo malio sal" + status + data.message;
  } else {
    loadFavoritesMichis();
  }
}

async function deleteFavouriteMichi(id){
  const {data, status} = await api.delete(`/favourites/${id}`)
  // const res = await fetch(API_URL_FAVORITES_DELETE(id), {
  //   method: 'DELETE',
  //   headers: {'X-API-KEY': `live_ab06oxShyUTHukjpawTqjD4hUx6oO0dCfrnZmk0TiM3vuRHHHJS6nsMOJyFAzNgL`}
    
  // });
  // const data = await res.json();

  if(status !== 200){
    spanError.innerHTML = "Algo malio sal" + status + data.message;
  } else{
    loadFavoritesMichis();
  }
}

async function uploadMichiPhoto(){
  const form = document.getElementById('uploadingForm')
  const formData = new FormData(form);
  
  const {data, status} = await api.postForm('/images/upload', formData,
  );
  // const res = await fetch(API_URL_UPLOAD, {
  //   method: 'POST',
  //   headers:{
  //     'X-API-KEY': `live_ab06oxShyUTHukjpawTqjD4hUx6oO0dCfrnZmk0TiM3vuRHHHJS6nsMOJyFAzNgL`
  //   },
  //   body: formData,
  // })
  // const data = await res.json();

  if(status !== 201){
  spanError.innerHTML = "hubo un error: " + status ;
} else {
  saveFavouriteMichi(data.id);
}

}
const imageInput = document.getElementById('file');
const imagePreview = document.getElementById('uploadPreview');
const uploadBtn = document.getElementById("uploadBtn")

imageInput.addEventListener('change', function(){
  if(imageInput.files && imageInput.files[0]){
  const reader = new FileReader();
  reader.onload = function(e){
    imagePreview.src = e.target.result;
    imagePreview.style.display = 'block';
    imagePreview.width = '350';
    uploadBtn.style.display = "block";
    
  };
  reader.readAsDataURL(imageInput.files[0])
  }
})


loadRandomMichis();
loadFavoritesMichis()

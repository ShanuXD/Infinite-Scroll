const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let photosArray = []
let ready = false
let numberOfImageLoaded = 0
let totaImages = 0


//Unsplash Api
const count = 10
const apiKey = 'j7bOwMog6S_21zCCnHfaq1Cu-qDZ-TkMemoqNB5-ExY'
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`

//imAGE WERE LOADED
function imageLoaded(){
    numberOfImageLoaded++
    console.log('imageLoaded')
    if (numberOfImageLoaded === totaImages){
        loader.hidden = true
        ready=true
        console.log('ready',ready)
}
    }
    


// Helper Function to Set Attributes on DOM Elements
function setAttributes(element, attributes) {
    for (const key in attributes) {
      element.setAttribute(key, attributes[key]);
    }
  }

//Create elements for links and photos

function displayPhotos(){
    numberOfImageLoaded = 0
    totaImages = photosArray.length
    console.log('total image',totaImages)

    photosArray.forEach(photo=> {

        // craete <a> to link to Unsplash
        const item = document.createElement('a')
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
          });

        //create <img> for photos
        const img = document.createElement('img');
        setAttributes(img, {
          src: photo.urls.regular,
          alt: photo.alt_description,
          title: photo.alt_description,
        });

        //event listener, chek when each is finsihed
        img.addEventListener('load', imageLoaded)

        //put <img> inside <a> then --> thoese inside image-container
        item.appendChild(img);
        imageContainer.appendChild(item);
    })
}

//get photos from Unsplash Api
async function getPhotos(){
    try{
        const response = await fetch(apiUrl)
        photosArray = await response.json()
        displayPhotos()
    }catch(err){
        console.log('so thing when wrong',err)
    }
}

// check to see if scrolling near bottom of page
window.addEventListener('scroll', ()=>{
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
        ready = false
        getPhotos()
        

    }
})

//on load 
getPhotos()
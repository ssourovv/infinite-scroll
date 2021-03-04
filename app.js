// -----> Needed DOM element
const imageContainer = document.querySelector(`#image__container`);
const loader = document.querySelector(`#loader`);

// -----> Global variables
let photos = [];
// -----> This variable contain the total numbers of photos (response from the server)
let totalPhotos = 0;
// -----> This variable contain the total numbers of loaded photos
let loadedPhotos = 0;
// -----> When the ready boolean is true only then the getphotos function can call (inside of the scroll event)
let ready = false;

// -----> How many photos we want from the server (limit 30)
const photoCount = 30;
// -----> API key
const apiKey = ``; //-----> I need the API key
// -----> API location
const apiURL = `https://api.unsplash.com/photos/random/?count=${photoCount}&client_id=${apiKey}`;

const xyz = () => {
    loadedPhotos++;
}

// -----> This is a helper function, it'll help to set the attribute
const setAttribute = (element, attributes) => {
    for (key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
};

// -----> This function will create the elements and also manupulate the DOM
const displayPhotos = () => {
    totalPhotos = photos.length;
    photos.forEach(value => {
        // -----> Creating the a element
        const item = document.createElement(`a`);
        setAttribute(item, {
            href: value.links.html,
            class: `image__container__item`,
        });

        // -----> Creating the img element
        const image = document.createElement(`img`);
        setAttribute(image, {
            src: value.urls.regular,
            alt: value.alt_description,
            title: value.alt_description,
        });

        // -----> This event listener will trigger when the image element load
        image.addEventListener(`load`, () => {
            loadedPhotos++;
            if (loadedPhotos === totalPhotos) {
                ready = true;
                loadedPhotos = 0;
                loader.hidden = true;
            }
        });

        // -----> append the elements
        item.appendChild(image);
        imageContainer.appendChild(item);
    })
}

// -----> This function will make the http request and it'll push the data to the photos global array
const getPhotos = () => {
    fetch(apiURL)
        .then(response => {
            response.json()
                .then(data => {
                    photos = data;
                    displayPhotos();
                })
        })
};

// -----> Checking if the user scroll to the bottom of the page
window.addEventListener(`scroll`, () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready === true) {
        ready = false;
        getPhotos();
    }
});

getPhotos();
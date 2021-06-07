import '../sass/style.scss';

class Doggo {
  constructor() {
    this.API_URL = 'https://dog.ceo/api';
  }

  listBreeds() {
    return fetch(`${this.API_URL}/breeds/list/all`)
      .then((response) => response.json())
      .then((data) => data.message);
  }

  getRandomImage() {
    return fetch(`${this.API_URL}/breeds/image/random`)
      .then((response) => response.json())
      .then((data) => data.message);
  }

  getRandomImageByBreed(breed) {
    return fetch(`${this.API_URL}/breed/${breed}/images/random`)
      .then((resp) => resp.json())
      .then((data) => data.message);
  }
}

// getRandomImageByBreed('bulldog/french').then((imgSrc) => {
//   const imgTag = document.querySelector('img');
//   imgTag.setAttribute('src', imgSrc);
//   document.body.appendChild(imgTag);
// });

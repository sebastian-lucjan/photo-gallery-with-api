import '../sass/style.scss';

class Doggo {
  constructor() {
    this.API_URL = 'https://dog.ceo/api';
    this.imgEl = document.querySelector('.featured-dog img');
    this.backgroundEl = document.querySelector('.featured-dog__background');

    this.init();
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
  init() {
    this.getRandomImage().then((src) => {
      this.imgEl.setAttribute('src', src);
      this.backgroundEl.style.background = `url("${src}")`;
    });
    this.listBreeds().then((breeds) => console.log(breeds));
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new Doggo();
});

// const boxer = new Doggo();
// boxer.init();
// boxer.listBreeds();

// getRandomImageByBreed('bulldog/french').then((imgSrc) => {
//   const imgTag = document.querySelector('img');
//   imgTag.setAttribute('src', imgSrc);
//   document.body.appendChild(imgTag);
// });

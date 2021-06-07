import '../sass/style.scss';

class Doggo {
  constructor() {
    this.API_URL = 'https://dog.ceo/api';
    this.imgEl = document.querySelector('.featured-dog img');
    this.backgroundEl = document.querySelector('.featured-dog__background');
    this.tilesEl = document.querySelector('.tiles');
    this.spinnerEl = document.querySelector('.spinner');

    this.init();
  }

  showLoading() {
    this.spinnerEl.classList.add('spinner--visible');
  }

  hideLoading() {
    this.spinnerEl.classList.remove('spinner--visible');
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
    this.showLoading();
    this.getRandomImage().then((img) => this.showImageWhenReady(img));

    this.showAllBreeds();
  }

  showImageWhenReady(image) {
    this.imgEl.setAttribute('src', image);
    this.backgroundEl.style.background = `url("${image}")`;
    this.hideLoading();
  }

  addBread(breed, subBread) {
    let name;
    let type;
    if (typeof subBread === 'undefined') {
      name = breed;
      type = breed;
    } else {
      name = `${breed} ${subBread}`;
      type = `${breed}/${subBread}`;
    }

    const tile = document.createElement('div');
    tile.classList.add('tiles__tile');

    const tileContent = document.createElement('div');
    tileContent.classList.add('tiles__tile-content');
    tileContent.innerText = name;

    tileContent.addEventListener('click', () => {
      window.scrollTo(0, 0);
      this.showLoading();
      this.getRandomImageByBreed(type).then((img) => this.showImageWhenReady(img));
    });

    tile.appendChild(tileContent);
    this.tilesEl.appendChild(tile);
  }

  showAllBreeds() {
    this.listBreeds().then((breeds) => {
      for (const breed in breeds) {
        if (breeds[breed].length) {
          for (const subbreed of breeds[breed]) {
            this.addBread(breed, subbreed);
          }
        } else {
          this.addBread(breed);
        }
      }
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new Doggo();
});

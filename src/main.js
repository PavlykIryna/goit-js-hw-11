import { fetchImages } from './js/pixabay-api.js';
import { renderImages, renderErrorMessage } from './js/render-functions.js';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import './css/styles.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

let lightbox;

const loader = document.querySelector('#loader');

document
  .querySelector('#search-form')
  .addEventListener('submit', async function (event) {
    event.preventDefault();

    const searchInput = document.getElementById('search-input').value.trim();

    if (searchInput === '') {
      iziToast.error({
        title: 'Error',
        message: 'Search field cannot be empty.',
        position: 'topRight',
      });
      return;
    }

    showLoader();

    try {
      const images = await fetchImages(searchInput);
      if (images.length > 0) {
        renderImages(images);
        refreshLightbox();
      } else {
        renderErrorMessage(
          'Sorry, there are no images matching your search query. Please try again!'
        );
      }
    } catch (error) {
      renderErrorMessage(error.message);
    } finally {
      hideLoader();
    }
  });

function showLoader() {
  loader.style.display = 'block';
}

function hideLoader() {
  loader.style.display = 'none';
}

function refreshLightbox() {
  if (!lightbox) {
    lightbox = new SimpleLightbox('.gallery-item', {
      captionsData: 'alt',
      captionDelay: 250,
    });
  } else {
    lightbox.refresh();
  }
}

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

export function renderImages(images) {
  const gallery = document.getElementById('gallery');
  gallery.innerHTML = '';

  const markup = images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `
        <a href="${largeImageURL}" class="gallery-item">
            <img src="${webformatURL}" alt="${tags}" />
            <div class="info">
                <p> Likes ${likes}</p>
                <p> Views ${views}</p>
                <p> Comments ${comments}</p>
                <p> Downloads ${downloads}</p>
            </div>
        </a>`
    )
    .join('');

  gallery.insertAdjacentHTML('beforeend', markup);
}

export function renderErrorMessage(message) {
  console.error('Rendering error message:', message); // Додає повідомлення в консоль
  iziToast.error({
    title: 'Error',
    message: message,
    position: 'topRight',
  });
}

import { galleryItems } from './gallery-items.js';
// Change code below this line

const galleryContainerEl = document.querySelector(".gallery");
const imagesMarkup = createItemsMarkup(galleryItems);
galleryContainerEl.insertAdjacentHTML("beforeend", imagesMarkup);

function createItemsMarkup(item) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `<div class="gallery__item">
      <a class="gallery__link" href="${original.value}">
        <img
          class="gallery__image"
          src="${preview}"
          data-source="${original}"
          alt="${description}"
        />
      </a>
    </div>`;
    })
    .join("");
}

galleryContainerEl.addEventListener("click", onClickGalleryItems);

function onClickGalleryItems (e) {
  e.preventDefault();

  if (e.target.classList.value !== "gallery__image") {
    return;
  };

    const source = e.target.dataset.source;
    const instance = basicLightbox.create(`
    <img src="${source}"width="1200">`,
      {
      onShow: () => {
        window.addEventListener("keydown", onInstanceKeydown);
      },
      onClose: () => {
        window.removeEventListener("keydown", onInstanceKeydown);
      },
    }
    );

    function onInstanceKeydown(e) {
    if (e.keyCode !== 27) {
      return;
    }
    instance.close();
  }

  instance.show();
};


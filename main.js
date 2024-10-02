const openIconContainer = document.querySelector(".open-icon-container");
const closeIconContainer = document.querySelector(".close-icon-container");

const logo = document.querySelector(".logo-container");
const navLinks = document.querySelector(".nav-links");
const navLink = document.querySelectorAll(".nav-link");
const overlay = document.querySelector(".overlay");
const cartIcon = document.querySelector(".cart-icon-container");
const deleteIcon = document.querySelector(".delete-icon-container");
const cart = document.querySelector(".cart");
const cartCount = document.querySelector(".cart-count");
const cartEmpty = document.querySelector(".cart-empty-container");
const cartFull = document.querySelector(".cart-full-container");
const priceText = document.querySelector(".cart-content-unit__price");
const cartQuantityText = document.querySelector(".cart-content-quantity");
const totalText = document.querySelector(".cart-content-total__price");

const quantityText = document.querySelector(".quantity-text");

const minus = document.querySelector(".minus");
const addToCart = document.querySelector(".add-to-cart");
const plus = document.querySelector(".plus");

const previousContainer = document.querySelector(".previous-container");
const nextContainer = document.querySelector(".next-container");

const mainImage = document.querySelector(".main-image");
const thumbnailsContainer = document.querySelector(".thumbnails-container");
const thumbnails = document.querySelectorAll(".thumbnail");

const imagePath = "images/image-product-";
const imageExtension = ".jpg";

const lightbox = document.querySelector(".lightbox");
const lightboxCloseIcon = lightbox.querySelector(".close-icon-container");
const lightboxMainImage = lightbox.querySelector(".main-image");
const lightboxPrevious = lightbox.querySelector(".previous-container");
const lightboxNext = lightbox.querySelector(".next-container");
const lightboxThumbnails = lightbox.querySelectorAll(".thumbnail");

let quantity = 0;
let mainImageId = -1;
let price = 125;
let totalPrice = quantity * price;
let currentImage = 1;
let tempMainImage = 1;
let lightboxSelectedThumbnail = 1;

quantityText.textContent = quantity;

function closeLightbox() {
  lightbox.classList.remove("active");
  lightboxPrevious.removeEventListener("click", handleLightboxPrevious);
  lightboxNext.removeEventListener("click", handleLightboxNext);
}

window.addEventListener("resize", () => {
  if (window.innerWidth > 768) {
    overlay.style.display = "none";
    closeIconContainer.style.display = "none";
    openIconContainer.style.display = "none";
    navLinks.classList.remove("active");
    navLink.forEach((el) => {
      el.style.display = "block";
    });
    previousContainer.classList.remove("active-mobile");
    nextContainer.classList.remove("active-mobile");
  } else {
    openIconContainer.style.display = "block";
    navLinks.style.display = "flex";
    navLink.forEach((el) => {
      el.style.display = "none";
    });
    previousContainer.classList.add("active-mobile");
    nextContainer.classList.add("active-mobile");
    closeLightbox();
  }
});

openIconContainer.addEventListener("click", () => {
  overlay.style.display = "block";
  navLinks.classList.add("active");
  navLink.forEach((el) => {
    el.style.display = "block";
  });
  closeIconContainer.style.display = "block";
  logo.style.display = "hidden";
});

closeIconContainer.addEventListener("click", () => {
  overlay.style.display = "none";
  navLinks.classList.remove("active");
  navLink.forEach((el) => {
    el.style.display = "none";
  });
  closeIconContainer.style.display = "none";
  logo.style.visibility = "visible";
});

cartIcon.addEventListener("click", () => {
  if (!cart.classList.contains("active")) {
    cart.classList.add("active");
    if (quantity && totalPrice) {
      cartFull.classList.add("active");
      priceText.textContent = "$" + price + ".00";
      quantityText.textContent = quantity;
      totalText.textContent = "$" + totalPrice + ".00";
    } else {
      cartEmpty.classList.add("active");
    }
  } else cart.classList.remove("active");
});

deleteIcon.addEventListener("click", () => {
  quantity = 0;
  quantityText.textContent = quantity;
  cartFull.classList.remove("active");
  cartEmpty.classList.add("active");
  cartCount.classList.remove("active");
  cartCount.textContent = "";
});

minus.addEventListener("click", () => {
  if (quantity !== 0) {
    quantity--;
    quantityText.textContent = quantity;
  } else {
    cartCount.classList.remove("active");
    cartCount.textContent = "";
  }
});

plus.addEventListener("click", () => {
  quantity++;
  quantityText.textContent = quantity;
});

addToCart.addEventListener("click", () => {
  if (quantity > 0) {
    cartCount.classList.add("active");
    cartCount.textContent = quantity;
    cartEmpty.classList.remove("active");
    cartFull.classList.add("active");
    totalPrice = quantity * price;
    priceText.textContent = "$" + price + ".00";
    cartQuantityText.textContent = quantity;
    totalText.textContent = "$" + totalPrice + ".00";
    cartCount.textContent = quantity;
  } else {
    cartEmpty.classList.add("active");
    cartFull.classList.remove("active");
  }
});

thumbnailsContainer.addEventListener("click", (e) => {
  thumbnails.forEach((thumbnail) => {
    thumbnail.classList.remove("active");
  });
  if (e.target.classList.contains("thumbnail")) {
    const thumbnail = e.target;
    currentImage = thumbnail.id.slice(-1);
    mainImageId = parseInt(thumbnail.id.slice(-1)) * -1;
    mainImage.src = imagePath + currentImage + imageExtension;
    thumbnail.classList.add("active");
  }
});

previousContainer.addEventListener("click", () => {
  if (currentImage === 1) {
    currentImage = 4;
    mainImage.src = imagePath + currentImage + imageExtension;
  } else {
    currentImage--;
    mainImage.src = imagePath + currentImage + imageExtension;
  }
});

nextContainer.addEventListener("click", () => {
  if (currentImage === 4) {
    currentImage = 1;
    mainImage.src = imagePath + currentImage + imageExtension;
  } else {
    currentImage++;
    mainImage.src = imagePath + currentImage + imageExtension;
  }
});

mainImage.addEventListener("click", () => {
  if (window.innerWidth > 768) {
    tempMainImage = currentImage;
    lightboxSelectedThumbnail = currentImage;
    lightbox.classList.add("active");
    lightboxMainImage.src = mainImage.src;

    lightboxThumbnails.forEach((thumbnail) => {
      thumbnail.classList.remove("active");
      if (thumbnail.dataset.number == lightboxSelectedThumbnail) {
        thumbnail.classList.add("active");
      }
    });

    lightboxPrevious.addEventListener("click", handleLightboxPrevious);
    lightboxNext.addEventListener("click", handleLightboxNext);
  }
});

lightboxThumbnails.forEach((thumbnail) => {
  thumbnail.addEventListener("click", (e) => {
    lightboxThumbnails.forEach((thumb) => thumb.classList.remove("active"));
    thumbnail.classList.add("active");

    tempMainImage = parseInt(thumbnail.dataset.number);
    lightboxMainImage.src = thumbnail.src.replace("-thumbnail", "");
  });
});

function handleLightboxPrevious() {
  if (tempMainImage == 1) {
    tempMainImage = 4;
    lightboxMainImage.src = imagePath + tempMainImage + imageExtension;
  } else {
    tempMainImage--;
    lightboxMainImage.src = imagePath + tempMainImage + imageExtension;
  }

  lightboxThumbnails.forEach((thumbnail) => {
    thumbnail.classList.remove("active");
    if (thumbnail.dataset.number == tempMainImage) {
      thumbnail.classList.add("active");
    }
  });
}

function handleLightboxNext() {
  if (tempMainImage == 4) {
    tempMainImage = 1;
    lightboxMainImage.src = imagePath + tempMainImage + imageExtension;
  } else {
    tempMainImage++;
    lightboxMainImage.src = imagePath + tempMainImage + imageExtension;
  }

  lightboxThumbnails.forEach((thumbnail) => {
    thumbnail.classList.remove("active");
    if (thumbnail.dataset.number == tempMainImage) {
      thumbnail.classList.add("active");
    }
  });
}

lightboxCloseIcon.addEventListener("click", () => {
  lightbox.classList.remove("active");
  lightboxPrevious.removeEventListener("click", handleLightboxPrevious);
  lightboxNext.removeEventListener("click", handleLightboxNext);
});

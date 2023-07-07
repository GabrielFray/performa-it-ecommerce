import { database } from "../../main.js";

const sizeInputs = document.querySelectorAll(".size-input");
const colorInputs = document.querySelectorAll(".color-input");

sizeInputs.forEach((input) => {
  input.addEventListener("click", function () {
    sizeInputs.forEach((otherInput) => {
      if (otherInput !== input) {
        otherInput.checked = false;
      }
    });
  });
});

colorInputs.forEach((input) => {
  input.addEventListener("click", function () {
    colorInputs.forEach((otherInput) => {
      if (otherInput !== input) {
        otherInput.checked = false;
      }
    });
  });
});

const recommendedClothes = document.querySelector(".recommended-clothes");

database.forEach((elem) => {
  const contentClothes = document.createElement("div");

  const image = document.createElement("img");
  image.className = "clothes-img";
  image.src = elem.img;
  image.alt = elem.name;
  image.id = elem.id;

  const contentPrice = document.createElement("div");
  contentPrice.className = "content-price";

  const heading = document.createElement("h3");
  heading.innerHTML = `${elem.name} <span>${elem.id}</span>`;

  contentPrice.appendChild(heading);

  const clothesName = document.createElement("div");
  clothesName.className = "name";

  const paragraph = document.createElement("p");

  const priceSpan = document.createElement("span");
  priceSpan.className = "prices";
  priceSpan.innerHTML = `R$ ${elem.price.toFixed(2)}`;

  const strong = document.createElement("strong");
  strong.innerHTML = ` R$ ${elem.promotionPrice.toFixed(2)}`;

  paragraph.appendChild(priceSpan);
  paragraph.appendChild(strong);

  const division = `${(elem.price / 3).toFixed(2)}`;

  const installmentSpan = document.createElement("span");
  installmentSpan.innerHTML = `ou 3x de R$ ${division}`;

  clothesName.appendChild(paragraph);
  clothesName.appendChild(installmentSpan);

  contentClothes.appendChild(image);
  contentClothes.appendChild(contentPrice);
  contentClothes.appendChild(clothesName);

  recommendedClothes.appendChild(contentClothes);
});

const handleCart = () => {
  const cart = document.querySelector(".cart-sidebar");

  if (cart.classList.contains("cart-disable")) {
    cart.classList.remove("cart-disable");
    cart.classList.add("cart-enable");
  } else {
    cart.classList.add("cart-disable");
    cart.classList.remove("cart-enable");
  }
};

const cartIcon = document.querySelector(".icon-cart");
const clotheCount = document.querySelector(".header__clothes-count");
const closeIcon = document.querySelector(".icon-close");
const buttonBuy = document.querySelector(".button-buy");

clotheCount.addEventListener("click", handleCart);
cartIcon.addEventListener("click", handleCart);
closeIcon.addEventListener("click", handleCart);

const changeClothe = (id) => {
  const findClothes = database.find((elem) => elem.id == id);

  const mainClothe = document.querySelector(".main-clothe");
  const asideClothesList = document.querySelectorAll(".aside-clothes");

  const clotheName = document.querySelector(".title");
  const clotheId = document.querySelector(".clothe-id");

  const clotheOriginalPrice = document.querySelector(".original-price");
  const clothePromotionPrice = document.querySelector(".discount-price");
  const clotheDivisionPrice = document.querySelector(".division-price");

  mainClothe.src = findClothes.img;
  asideClothesList.src = findClothes.img;
  asideClothesList.forEach((asideClothes) => {
    asideClothes.src = findClothes.img;
  });

  clotheName.innerHTML = findClothes.name;
  clotheId.innerHTML = findClothes.id;
  buttonBuy.id = findClothes.id;

  const division = `${(findClothes.price / 3).toFixed(2)}`;

  clotheOriginalPrice.innerHTML = `R$ ${findClothes.price.toFixed(2)}`;
  clothePromotionPrice.innerHTML = `R$ ${findClothes.promotionPrice.toFixed(
    2
  )}`;
  clotheDivisionPrice.innerHTML = `R$ ${division}`;
};

recommendedClothes.addEventListener("click", (event) => {
  if (event.target) {
    changeClothe(event.target.id);
  }
});

const showRandomClothe = () => {
  const randomIndex = Math.floor(Math.random() * database.length);
  changeClothe(database[randomIndex].id);
};

window.addEventListener("load", showRandomClothe);

let items = [];

const contentClothes = document.querySelector(".content__list-clothes");

const addClotheCart = (items) => {
  const cartAside = document.querySelector(".cart-sidebar");
  const cartCount = document.querySelector(".clothes-count");
  const headerClothesCount = document.querySelector(".header__clothes-count");
  const cartFooter = document.querySelector(".cart-footer");

  headerClothesCount.innerHTML = items.length;
  cartCount.innerHTML = items.length;

  contentClothes.innerHTML = "";

  if (items.length > 0) {
    items.forEach((item) => {
      createClothesCard(item);
    });
    showCartFooter(items);
  } else {
    showEmptyCart();
    cartFooter.style.display = "none";
  }

  cartAside.appendChild(contentClothes);
};

const createClothesCard = (item) => {
  const clothesCard = document.createElement("li");
  clothesCard.dataset.id = item.id;

  const clotheImage = document.createElement("img");
  clotheImage.classList.add("clothe-image");
  clotheImage.src = item.img;
  clotheImage.alt = item.name;

  const contentClothesInformation = document.createElement("div");
  contentClothesInformation.classList.add("content__clothes-information");

  const clotheTitle = document.createElement("h3");
  clotheTitle.innerHTML = item.name;

  const contentPrices = document.createElement("div");
  contentPrices.classList.add("content-prices");

  const originalPrice = document.createElement("span");
  originalPrice.classList.add("original-price");
  originalPrice.innerHTML = `R$ ${item.price.toFixed(2)}`;

  const promotionalPrice = document.createElement("span");
  promotionalPrice.classList.add("promotional-price");
  promotionalPrice.innerHTML = `R$ ${item.promotionPrice.toFixed(2)}`;

  const contentQuantityClothes = document.createElement("div");
  contentQuantityClothes.classList.add("content__quantity-clothes");

  const buttonQuantityLess = document.createElement("button");
  buttonQuantityLess.classList.add("button-quantity");

  const imageLess = document.createElement("img");
  imageLess.src = "./src/assets/icon-menos-cart.svg";
  imageLess.alt = "Icone de menos";
  imageLess.classList.add("button-quantity-less");

  const quantityCount = document.createElement("span");
  quantityCount.classList.add("quantity-count");

  quantityCount.innerHTML = item.quantity;

  shoppingCart(contentQuantityClothes, quantityCount, item);

  const buttonQuantityMore = document.createElement("button");
  buttonQuantityMore.classList.add("button-quantity");

  const imageMore = document.createElement("img");
  imageMore.src = "./src/assets/icon-soma-cart.svg";
  imageMore.alt = "Icone de mais";
  imageMore.classList.add("button-quantity-more");

  const buttonDelete = document.createElement("button");
  buttonDelete.classList.add("button-delete");

  const imageDelete = document.createElement("img");
  imageDelete.src = "./src/assets/icon-delete-cart.svg";
  imageDelete.alt = "Icone de lixeira";
  imageDelete.classList.add("trash-icon");
  imageDelete.id = item.id;

  contentClothes.appendChild(clothesCard);
  clothesCard.append(clotheImage, contentClothesInformation);
  contentClothesInformation.append(
    clotheTitle,
    contentPrices,
    contentQuantityClothes
  );
  contentPrices.append(originalPrice, promotionalPrice);
  buttonQuantityLess.appendChild(imageLess);
  buttonQuantityMore.appendChild(imageMore);
  contentQuantityClothes.append(
    buttonQuantityLess,
    quantityCount,
    buttonQuantityMore
  );
  clothesCard.appendChild(buttonDelete);
  buttonDelete.appendChild(imageDelete);

  const clothesLine = document.createElement("div");
  clothesLine.classList.add("clothe-line");
  const divChildElement = document.createElement("div");
  clothesLine.appendChild(divChildElement);

  contentClothes.appendChild(clothesLine);
};

const showEmptyCart = () => {
  const emptyCart = document.querySelector(".empty-cart");
  emptyCart.innerHTML = "";
  emptyCart.style.display = "flex";

  const img = document.createElement("img");
  img.src = "./src/assets/icon-carrinho.svg";
  img.alt = "Icone de sacola vazia";

  const h3 = document.createElement("h3");
  h3.textContent = "Você não possui itens";

  const span = document.createElement("span");
  span.textContent = "Continue navegando para adicionar produtos aqui";

  const button = document.createElement("button");
  button.classList.add("keep-browsing");
  button.type = "button";
  button.textContent = "Continuar navegando";

  emptyCart.appendChild(img);
  emptyCart.appendChild(h3);
  emptyCart.appendChild(span);
  emptyCart.appendChild(button);

  const cartAside = document.querySelector(".cart-sidebar");
  cartAside.appendChild(emptyCart);
};

const showCartFooter = (items) => {
  const cartFooter = document.querySelector(".cart-footer");
  cartFooter.innerHTML = "";
  cartFooter.style.display = "flex";

  const subFooterCart = document.createElement("div");
  subFooterCart.classList.add("sub__footer-cart");

  const subtotalTitle = document.createElement("h4");
  subtotalTitle.innerHTML = "Subtotal:";

  const subtotalPrice = document.createElement("span");
  subtotalPrice.classList.add("subtotal");
  subtotalPrice.innerHTML = (0).toFixed(2);

  subtotalCart(items, subtotalPrice);

  subFooterCart.append(subtotalTitle, subtotalPrice);

  const subtotalLine = document.createElement("div");
  subtotalLine.classList.add("subtotal-line");
  const subtotalLineChild = document.createElement("div");
  subtotalLine.appendChild(subtotalLineChild);

  const contentSubtotalButtons = document.createElement("div");
  contentSubtotalButtons.classList.add("subtotal-buttons");

  const text = document.createElement("p");
  text.innerHTML = "Frete e descontos calculados no carrinho";

  const keepShopping = document.createElement("button");
  keepShopping.classList.add("cart-button");
  keepShopping.type = "button";
  keepShopping.innerHTML = "Continuar comprando";

  const buttonCheckout = document.createElement("button");
  buttonCheckout.classList.add("cart-button", "checkout");
  buttonCheckout.type = "button";
  buttonCheckout.innerHTML = "Finalizar compra";

  buttonCheckout.addEventListener("click", () => {
    alert(`Seu pedido: ${JSON.stringify(items)}`);
  });

  contentSubtotalButtons.append(text, keepShopping, buttonCheckout);

  cartFooter.append(subFooterCart, subtotalLine, contentSubtotalButtons);

  const cartAside = document.querySelector(".cart-sidebar");

  cartAside.appendChild(cartFooter);
};

addEventListener("click", (event) => {
  const emptyCart = document.querySelector(".empty-cart");

  const clickTarget = event.target;

  if (clickTarget.className === "button-buy") {
    const objVerify = {
      size: undefined,
      color: undefined,
    };

    // objVerify.size = variableSize;
    // objVerify.color = variableColor;

    // Object.values(objVerify).some((value) => value == undefined);

    emptyCart.style.display = "none";

    const verifyItem = items.some((elem) => elem.id == clickTarget.id);

    if (!verifyItem) {
      const selectedItem = database.find((item) => item.id == clickTarget.id);
      items.push(selectedItem);
      localStorage.setItem("@item:", JSON.stringify(items));
      addClotheCart(items);
    }
  }
  if (clickTarget.className === "trash-icon") {
    items = items.filter((elem) => elem.id != clickTarget.id);
    addClotheCart(items);
  }
});

const shoppingCart = (contentQuantityClothes, quantityCount, item) => {
  if (contentQuantityClothes) {
    contentQuantityClothes.addEventListener("click", (event) => {
      const subtotalPrice = document.querySelector(".subtotal");

      if (event.target.classList.value == "button-quantity-more") {
        item.quantity++;
        quantityCount.innerHTML = item.quantity;
        subtotalCart(items, subtotalPrice);
      }
      if (
        event.target.classList.value == "button-quantity-less" &&
        item.quantity > 1
      ) {
        item.quantity--;
        quantityCount.innerHTML = item.quantity;
        subtotalCart(items, subtotalPrice);
      }
    });
  }
};

const subtotalCart = (items, subtotalPrice) => {
  const cartItems = items.reduce((acc, currentValue) => {
    return acc + currentValue.promotionPrice * currentValue.quantity;
  }, 0);

  subtotalPrice.innerHTML = cartItems.toFixed(2);
};

addClotheCart([]);

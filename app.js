const wrapper = document.querySelector(".sliderWrapper");
const menuItems = document.querySelectorAll(".menuItem");

const products = [
  {
    id: 1,
    title: "Calvin Klein",
    price: 2000,
    sliderImg: "./img/calvin-klein1.png",
    detailImg: "./img/calvin-klein1red.png",
    colors: [
      {
        code: "red",
        img: "./img/calvin-klein1red.png",
      },
      {
        code: "black",
        img: "./img/calvin-klein1black.png",
      },
    ],
    sizes: [42, 43, 44],
  },
  {
    id: 2,
    title: "Tommy Hilfiger",
    price: 2000,
    sliderImg: "./img/tommy1.png",
    detailImg: "./img/tommy1red.png",
    colors: [
      {
        code: "red",
        img: "./img/tommy1red.png",
      },
    ],
    sizes: [42, 43, 44],
  },
  {
    id: 3,
    title: "Lacoste",
    price: 2000,
    sliderImg: "./img/lacoste1.png",
    detailImg: "./img/lacoste1red.png",
    colors: [
      {
        code: "red",
        img: "./img/lacoste1red.png",
      },
    ],
    sizes: [42, 43, 44],
  },
];

let choosenProduct = products[0];

const currentProductImg = document.querySelector(".productImg");
const currentProductTitle = document.querySelector(".productTitle");
const currentProductPrice = document.querySelector(".productPrice");
const currentProductColors = document.querySelectorAll(".color");
const currentProductSizes = document.querySelectorAll(".size");

menuItems.forEach((item, index) => {
  item.addEventListener("click", () => {
    // Change the current slide
    wrapper.style.transform = `translateX(${-100 * index}vw)`;

    // Change the chosen product
    choosenProduct = products[index];

    // Update product details
    updateProductDetails(choosenProduct);
  });
});

function updateProductDetails(product) {
  currentProductTitle.textContent = product.title;
  currentProductPrice.textContent = "MDL " + product.price;
  currentProductImg.src = product.detailImg; // Use detailImg here

  // Update color options
  const colorsContainer = document.querySelector('.colors');
    colorsContainer.innerHTML = ''; // Clear existing colors
    product.colors.forEach((color, index) => {
        const colorDiv = document.createElement('div');
        colorDiv.className = 'color';
        colorDiv.style.backgroundColor = color.code;
        colorDiv.addEventListener('click', () => {
            currentProductImg.src = color.img;
            currentProductColors.forEach(c => c.classList.remove('active'));
            colorDiv.classList.add('active');
        });
        colorsContainer.appendChild(colorDiv);

        // Set the first color as the default selected color
        if (index === 0) {
            colorDiv.classList.add('active');
            currentProductImg.src = color.img;
        }
    });

  // Update size options
  const sizesContainer = document.querySelector('.sizes');
    sizesContainer.innerHTML = ''; // Clear existing sizes
    product.sizes.forEach(size => {
        const sizeDiv = document.createElement('div');
        sizeDiv.className = 'size';
        sizeDiv.textContent = size;
        sizeDiv.addEventListener('click', () => {
            // Remove active class from all sizes
            document.querySelectorAll('.sizes .size').forEach(s => s.classList.remove('active-size'));

            // Add active class to the clicked size
            sizeDiv.classList.add('active-size');
        });
        sizesContainer.appendChild(sizeDiv);
  });
}
updateProductDetails(products[0]);
function updateSlider(filteredProducts) {
  // Clear the existing slider content
  wrapper.innerHTML = '';

  // Add filtered products to the slider
  filteredProducts.forEach((product, index) => {
    const sliderItem = document.createElement('div');
    sliderItem.className = 'sliderItem';
    sliderItem.innerHTML = `
      <img src="${product.sliderImg}" alt="" class="sliderImg">
      <div class="sliderBg"></div>
      <h1 class="sliderTitle">${product.title}</br> NEW</br> SEASON</h1>
      <h2 class="sliderPrice">MDL ${product.price}</h2>
      <a href="#product">
        <button class="buyButton">BUY NOW!</button>
      </a>
    `;
    wrapper.appendChild(sliderItem);
  });

  // Reattach event listeners for menu items
  attachMenuEventListeners();
}

function attachMenuEventListeners() {
  const menuItems = document.querySelectorAll('.menuItem');

  menuItems.forEach((item, index) => {
    item.addEventListener('click', () => {
      // Change the current slide
      wrapper.style.transform = `translateX(${-100 * index}vw)`;

      // Change the chosen product
      choosenProduct = products[index];

      // Change texts of currentProduct
      currentProductTitle.textContent = choosenProduct.title;
      currentProductPrice.textContent = 'MDL ' + choosenProduct.price;
      currentProductImg.src = choosenProduct.detailImg; // Use detailImg here

      // Assign new colors
      currentProductColors.forEach((color, index) => {
        color.style.backgroundColor = choosenProduct.colors[index].code;
      });
    });
  });
}

// Initial attachment of event listeners
attachMenuEventListeners();

// Update the slider with all products on initial load
updateSlider(products);

document.querySelectorAll('.productThumbnail').forEach(thumbnail => {
  thumbnail.addEventListener('click', function() {
    const productId = parseInt(this.dataset.productId);
    const product = products.find(p => p.id === productId);

    if (product) {
      // Update product details
      updateProductDetails(product);

      // Scroll to the product details section
      document.getElementById('product').scrollIntoView();
    }
  });
});

const productButton = document.querySelector(".productButton");
productButton.addEventListener("click", () => {
  const payment = document.querySelector(".payment");
  payment.style.display = "flex";
});

// Close the payment modal
const close = document.querySelector(".close");
close.addEventListener("click", () => {
  const payment = document.querySelector(".payment");
  payment.style.display = "none";
});

const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('.navLink');

const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.5,
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      const activeLink = document.querySelector(`.navbar a[href="#${id}"]`);

      navLinks.forEach(link => link.classList.remove('active'));
      if (activeLink) {
        activeLink.classList.add('active');
      }
    }
  });
}, observerOptions);

sections.forEach(section => observer.observe(section));
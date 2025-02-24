document.addEventListener('DOMContentLoaded', function() {
  const addToCartButtons = document.querySelectorAll('.add-to-cart');
  const cartCountSpan = document.getElementById('cart-count');
  let cartCount = 0;

  addToCartButtons.forEach(button => {
    button.addEventListener('click', function() {
      cartCount++;
      cartCountSpan.textContent = cartCount;

      const productItem = button.closest('.product-item');
      const productName = productItem.dataset.name;
      const productPrice = productItem.dataset.price;

      // You can further process the product details here,
      // such as storing them in local storage or updating a cart array.
      console.log(`Adicionado ao carrinho: ${productName} - R$ ${productPrice}`);
    });
  });

  // Get the modal
  var loginModal = document.getElementById("login-modal");
  var signupModal = document.getElementById("signup-modal");

  // Get the link that opens the modal
  var loginLink = document.getElementById("login-link");
  var signupLink = document.getElementById("signup-link");

  // Get the <span> element that closes the modal
  var loginCloseButton = (loginModal) ? loginModal.querySelector(".close-button") : null;
  var signupCloseButton = (signupModal) ? signupModal.querySelector(".close-button") : null;

  let isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  let isAdmin = localStorage.getItem('isAdmin') === 'true';
  let loggedInUserName = localStorage.getItem('loggedInUserName') || null;

  const updateUIOnLogin = () => {
    const logoutLink = document.getElementById('logout-link');

    if (isLoggedIn) {
      // Hide login and signup links
      if (loginLink) loginLink.style.display = 'none';
      if (signupLink) signupLink.style.display = 'none';

      // Show logout link
      if (!logoutLink) {
        const logoutLi = document.createElement('li');
        logoutLi.innerHTML = '<a href="#" id="logout-link">Sair</a>';
        document.querySelector('nav ul').appendChild(logoutLi);

        document.getElementById('logout-link').addEventListener('click', function(event) {
          event.preventDefault();
          // Clear login status from local storage
          localStorage.removeItem('isLoggedIn');
          localStorage.removeItem('isAdmin');
          localStorage.removeItem('loggedInUserName');
          isLoggedIn = false;
          isAdmin = false;
          loggedInUserName = null;
          updateUIOnLogin();
          // Reload the page to reflect the changes (or manually update the UI)
          window.location.reload();
        });
      }
      else {
        logoutLink.style.display = 'inline';
      }

      if (isAdmin) {
        document.getElementById('admin-panel').style.display = 'block';
        document.getElementById('admin-link').style.display = 'inline';
      } else {
        document.getElementById('admin-panel').style.display = 'none';
        document.getElementById('admin-link').style.display = 'none';
      }

      document.getElementById('welcome-message').textContent = `Bem-vindo, ${loggedInUserName}!`;
      document.getElementById('welcome-message').style.display = 'inline';
    } else {
      // Show login and signup links
      if (loginLink) loginLink.style.display = 'inline';
      if (signupLink) signupLink.style.display = 'inline';
      if (logoutLink) logoutLink.style.display = 'none';
      document.getElementById('admin-panel').style.display = 'none';
      document.getElementById('admin-link').style.display = 'none';
      document.getElementById('welcome-message').style.display = 'none';
    }
  };

  // When the user clicks on the link, open the modal
  if (loginLink) {
    loginLink.onclick = function(event) {
      event.preventDefault(); // Prevent the default action
      loginModal.style.display = "block";
    }
  }

  if (signupLink) {
    signupLink.onclick = function(event) {
      event.preventDefault(); // Prevent the default action
      signupModal.style.display = "block";
    }
  }


  // When the user clicks on <span> (x), close the modal
  if (loginCloseButton) {
    loginCloseButton.onclick = function() {
      loginModal.style.display = "none";
    }
  }

  if (signupCloseButton) {
    signupCloseButton.onclick = function() {
      signupModal.style.display = "none";
    }
  }


  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == loginModal) {
      loginModal.style.display = "none";
    }
    if (event.target == signupModal) {
      signupModal.style.display = "none";
    }
  }


  // Handle form submissions (basic example)
  const loginForm = document.getElementById('login-form');
  const signupForm = document.getElementById('signup-form');
  const adminLink = document.getElementById('admin-link');

  // Admin user credentials
  const adminEmail = 'admin@loginhablox.com';
  const adminPassword = 'admin123';

  function showAdminPanel() {
    document.getElementById('admin-panel').style.display = 'block';
  }

  if (loginForm) {
    loginForm.addEventListener('submit', function(event) {
      event.preventDefault(); // Prevent form from submitting

      const name = document.getElementById('login-name').value;
      const password = document.getElementById('login-password').value;

      let loginSuccessful = false;

      // Check for admin login
      if (name === adminEmail && password === adminPassword) {
        isAdmin = true;
        loginSuccessful = true;
        loggedInUserName = 'Admin';
      }
      else if (name === 'Ryan0777' && password === '19283747') {
          isAdmin = true;
          loginSuccessful = true;
          loggedInUserName = 'Ryan0777';
      } else {
        // You would typically send this data to a server for authentication
        console.log('Login attempt:', name, password);
        Swal.fire({
          title: 'Erro!',
          text: 'Usuário ou senha incorretos.',
          icon: 'error',
          confirmButtonText: 'Tentar novamente'
        });
      }

      if (loginSuccessful) {
        isLoggedIn = true; // Set login status to true

        // Store login status in local storage
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('isAdmin', 'true');
        localStorage.setItem('loggedInUserName', loggedInUserName);

        Swal.fire({
          title: 'Login Successful',
          text: `Welcome, ${name}!`,
          icon: 'success',
          confirmButtonText: 'Ok'
        });

        loginModal.style.display = "none"; // Close the modal after submission
        updateUIOnLogin();
        document.getElementById('welcome-message').textContent = `Bem-vindo, ${loggedInUserName}!`;
        document.getElementById('welcome-message').style.display = 'inline';
      }

    });
  }

  if (signupForm) {
    signupForm.addEventListener('submit', function(event) {
      event.preventDefault(); // Prevent form from submitting

      const name = document.getElementById('signup-name').value;
      const password = document.getElementById('signup-password').value;
      loggedInUserName = name;

      // You would typically send this data to a server for user creation
      console.log('Signup attempt:', name, password);
      Swal.fire({
        title: 'Conta Criada!',
        text: 'Sua conta foi criada com sucesso.',
        icon: 'success',
        confirmButtonText: 'Ok'
      });

      isLoggedIn = true; // Set login status to true

      // Store login status in local storage
      localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('loggedInUserName', loggedInUserName);

      signupModal.style.display = "none"; // Close the modal after submission
      updateUIOnLogin();
      document.getElementById('welcome-message').textContent = `Bem-vindo, ${loggedInUserName}!`;
      document.getElementById('welcome-message').style.display = 'inline';
    });
  }

  // Function to get products from local storage (or initialize if empty)
    function getProducts() {
        try {
            const storedProducts = localStorage.getItem('products');
            return storedProducts ? JSON.parse(storedProducts) : getDefaultProducts();
        } catch (error) {
            console.error("Error fetching or parsing products from localStorage:", error);
            return getDefaultProducts();
        }
    }


  function getDefaultProducts() {
    const initialProducts = [
      { name: 'ShadowFruit', price: 20.00, stock: 5, image: 'ShadowFruit.webp' },
      { name: 'BarrierFruit', price: 35.50, stock: 3, image: 'BarrierFruit.webp' },
      { name: 'RocketFruit', price: 25.00, stock: 7, image: 'RocketFruit.webp' },
      { name: 'LoveFruit', price: 40.00, stock: 2, image: 'LoveFruit.webp' },
      { name: 'PhoenixFruit', price: 30.00, stock: 4, image: 'PhoenixFruit.webp' },
      { name: 'DarkFruit', price: 45.50, stock: 1, image: 'DarkFruit.webp' },
      { name: 'SpringFruit', price: 22.00, stock: 6, image: 'SpringFruit.webp' },
      { name: 'GasFruit', price: 38.00, stock: 3, image: 'GasFruit.webp' },
      { name: 'YetiFruit', price: 28.50, stock: 5, image: 'YetiFruit.webp' },
      { name: 'BuddhaFruit', price: 33.00, stock: 4, image: 'BuddhaFruit.webp' },
      { name: 'PainFruit', price: 27.00, stock: 8, image: 'PainFruit.webp' },
      { name: 'RubberFruit', price: 42.50, stock: 2, image: 'RubberFruit.webp' },
      { name: 'VenomFruit', price: 31.00, stock: 3, image: 'VenomFruit.webp' },
      { name: 'FalconFruit', price: 36.50, stock: 6, image: 'FalconFruit.webp' },
      { name: 'SpinFruit', price: 24.00, stock: 7, image: 'SpinFruit.webp' },
      { name: 'SpiritFruit', price: 39.00, stock: 1, image: 'SpiritFruit.webp' },
      { name: 'T-RexFruit', price: 29.00, stock: 4, image: 'T-RexFruit.webp' },
      { name: 'GravityFruit', price: 34.50, stock: 3, image: 'GravityFruit.webp' },
      { name: 'ControlFruit', price: 41.00, stock: 2, image: 'ControlFruit.webp' },
      { name: 'BladeFruit', price: 26.00, stock: 9, image: 'BladeFruit.webp' },
      { name: 'QuakeFruit', price: 37.50, stock: 5, image: 'QuakeFruit.webp' },
      { name: 'LightFruit', price: 32.00, stock: 4, image: 'LightFruit.webp' },
      { name: 'DiamondFruit', price: 43.00, stock: 1, image: 'DiamondFruit.webp' },
      { name: 'SandFruit', price: 23.50, stock: 7, image: 'SandFruit.webp' },
      { name: 'BlizzardFruit', price: 35.00, stock: 6, image: 'BlizzardFruit.webp' },
      { name: 'IceFruit', price: 44.50, stock: 3, image: 'IceFruit.webp' },
      { name: 'SpikeFruit', price: 30.50, stock: 5, image: 'SpikeFruit.webp' },
      { name: 'RumbleFruit', price: 21.00, stock: 8, image: 'RumbleFruit.webp' },
      { name: 'MagmaFruit', price: 46.00, stock: 2, image: 'MagmaFruit.webp' },
      { name: 'FlameFruit', price: 25.50, stock: 6, image: 'FlameFruit.webp' },
      { name: 'DoughFruit', price: 33.50, stock: 4, image: 'DoughFruit.webp' },
      { name: 'PortalFruit', price: 47.50, stock: 1, image: 'PortalFruit.webp' },
      { name: 'SoundFruit', price: 27.50, stock: 7, image: 'SoundFruit.webp' },
      { name: 'MammothFruit', price: 38.50, stock: 3, image: 'MammothFruit.webp' },
      { name: 'DragonFruit', price: 31.50, stock: 5, image: 'DragonFruit.webp' },
      { name: 'LeopardFruit', price: 48.00, stock: 2, image: 'LeopardFruit.webp' },
      { name: 'KitsuneFruit', price: 49.00, stock: 2, image: 'KitsuneFruit.webp' },
      { name: 'SpiderFruit', price: 50.00, stock: 2, image: 'SpiderFruit.webp' },
      { name: 'GhostFruit', price: 51.00, stock: 2, image: 'GhostFruit.webp' },
      { name: 'SmokeFruit', price: 52.00, stock: 2, image: 'SmokeFruit.webp' },
      { name: 'BombFruit', price: 53.00, stock: 2, image: 'BombFruit.webp' }
    ];
    return initialProducts;
  }

  // Initialize the products array from local storage
  let products = getProducts();
  displayProductsInGrid();
  displayProductsInTable();


  function saveProductsToLocalStorage() {
    localStorage.setItem('products', JSON.stringify(products));
  }

  // Function to display products in the grid
  function displayProductsInGrid() {
    const productGrid = document.querySelector('.product-grid');
    productGrid.innerHTML = ''; // Clear existing products

    products.forEach((product, index) => {
      const productItem = document.createElement('div');
      productItem.classList.add('product-item');
      productItem.dataset.name = product.name;
      productItem.dataset.price = product.price;
      productItem.dataset.stock = product.stock;
      productItem.dataset.image = product.image;
      productItem.dataset.index = index;

      const img = document.createElement('img');
      img.src = product.image;
      img.alt = product.name;
      productItem.appendChild(img);

      const productName = document.createElement('h3');
      productName.textContent = product.name;
      productItem.appendChild(productName);

      const productDetails = document.createElement('div');
      productDetails.classList.add('product-details'); // Adiciona a classe para o flex container

      const productPrice = document.createElement('span');
      productPrice.classList.add('price');
      productPrice.textContent = `R$ ${product.price.toFixed(2)} `; // Ensure 2 decimal places
      productDetails.appendChild(productPrice);

      const productStock = document.createElement('span');
      productStock.classList.add('stock');
      productStock.textContent = `Estoque: ${product.stock}`;
      productDetails.appendChild(productStock);

      productItem.appendChild(productDetails);

      const addButton = document.createElement('button');
      addButton.classList.add('add-to-cart');
      addButton.textContent = 'Adicionar ao Carrinho';
      productItem.appendChild(addButton);

      productGrid.appendChild(productItem);

      // Re-attach event listeners to "Add to Cart" buttons
      const addToCartButtons = document.querySelectorAll('.add-to-cart');
      addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
          cartCount++;
          cartCountSpan.textContent = cartCount;

          const productItem = button.closest('.product-item');
          const productName = productItem.dataset.name;
          const productPrice = productItem.dataset.price;

          // You can further process the product details here,
          // such as storing them in local storage or updating a cart array.
          console.log(`Adicionado ao carrinho: ${productName} - R$ ${productPrice}`);
        });
      });
    });
  }


  // Function to display products in the admin table
  function displayProductsInTable() {
    const productTable = document.getElementById('product-table');
    productTable.innerHTML = '';
    products.forEach((product, index) => {
      const newRow = productTable.insertRow();

      const imageCell = newRow.insertCell(0);
      const nameCell = newRow.insertCell(1);
      const priceCell = newRow.insertCell(2);
      const stockCell = newRow.insertCell(3);
      const actionsCell = newRow.insertCell(4);

      const img = document.createElement('img');
      img.src = product.image;
      img.alt = product.name;
      img.style.maxWidth = '50px';
      img.style.maxHeight = '50px';
      img.style.objectFit = 'cover';
      imageCell.appendChild(img);

      nameCell.textContent = product.name;
      priceCell.textContent = `R$ ${product.price.toFixed(2)}`; // Ensure 2 decimal places
      stockCell.textContent = `Estoque: ${product.stock}`;

      // Edit button
      const editButton = document.createElement('button');
      editButton.textContent = 'Editar';
      editButton.onclick = function() {
        // Populate the add product form with the product details
        document.getElementById('product-name').value = product.name;
        document.getElementById('product-price').value = product.price;
        document.getElementById('product-stock').value = product.stock;
        document.getElementById('product-image').value = product.image;

        // Change the add product button to an update button
        const addButton = document.querySelector('#add-product-form button[type="submit"]');
        addButton.textContent = 'Atualizar Produto';
        addButton.dataset.index = index; // Store the index of the product being edited

        // Remove the old onclick event listener
        addButton.onclick = null;

        addButton.addEventListener('click', function(event) {
            event.preventDefault();
            updateProduct(index);
        });
      };
      actionsCell.appendChild(editButton);

      // Delete button
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Excluir';
      deleteButton.onclick = function() {
        products.splice(index, 1); // Delete the product from the array
        saveProductsToLocalStorage(); // Save updated products to local storage
        displayProductsInTable(); // Refresh the table
        displayProductsInGrid(); // Refresh the grid
      };
      actionsCell.appendChild(deleteButton);
    });
  }

  // Admin Panel Functionality
  const addProductForm = document.getElementById('add-product-form');

  if (addProductForm) {
    addProductForm.addEventListener('submit', function(event) {
      event.preventDefault();

      const addButton = document.querySelector('#add-product-form button[type="submit"]');
      const index = addButton.dataset.index;

      const productName = document.getElementById('product-name').value;
      const productPrice = document.getElementById('product-price').value;
      const productStock = document.getElementById('product-stock').value;
      const productImage = document.getElementById('product-image').value;

        if (index !== undefined) {
            // Update existing product
            products[index] = {
                name: productName,
                price: parseFloat(productPrice),
                stock: parseInt(productStock),
                image: productImage
            };
        } else {
            // Create new product
            const newProduct = {
                name: productName,
                price: parseFloat(productPrice),
                stock: parseInt(productStock),
                image: productImage
            };
            products.push(newProduct);
        }

      saveProductsToLocalStorage(); // Save updated products to local storage

      displayProductsInTable(); // Refresh the table
      displayProductsInGrid(); // Refresh the grid

      // Clear the form
      document.getElementById('product-name').value = '';
      document.getElementById('product-price').value = '';
      document.getElementById('product-stock').value = '';
      document.getElementById('product-image').value = '';

      // Reset the add product button
        addButton.textContent = 'Adicionar Produto';
        delete addButton.dataset.index;
        addButton.onclick = function(event) {
            addProductForm.dispatchEvent(new Event('submit'));
        };
    });
  }

  // Function to update a product
  function updateProduct(index) {
    const productName = document.getElementById('product-name').value;
    const productPrice = document.getElementById('product-price').value;
    const productStock = document.getElementById('product-stock').value;
    const productImage = document.getElementById('product-image').value;

    products[index] = {
      name: productName,
      price: parseFloat(productPrice),
      stock: parseInt(productStock),
      image: productImage
    };

    saveProductsToLocalStorage();
    displayProductsInTable();
    displayProductsInGrid();

    // Clear the form
    document.getElementById('product-name').value = '';
    document.getElementById('product-price').value = '';
    document.getElementById('product-stock').value = '';
    document.getElementById('product-image').value = '';

    // Reset the add product button
    const addButton = document.querySelector('#add-product-form button[type="submit"]');
    addButton.textContent = 'Adicionar Produto';
    delete addButton.dataset.index;
    addButton.onclick = function(event) {
        addProductForm.dispatchEvent(new Event('submit'));
    };
  }

  function setAdminLinkVisibility() {
    if (isAdmin) {
      document.getElementById('admin-link').style.display = 'inline';
    } else {
      document.getElementById('admin-link').style.display = 'none';
    }
  }

  // Function to scroll to the admin panel
  window.scrollToAdminPanel = function() {
    const adminPanel = document.getElementById('admin-panel');
    if (adminPanel) {
      adminPanel.scrollIntoView({ behavior: 'smooth' });
    }
  };

  updateUIOnLogin();
});
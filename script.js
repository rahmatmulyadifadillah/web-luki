document.addEventListener('DOMContentLoaded', () => {
    // 1. Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 2. Mobile Menu Toggle
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.className = 'fa-solid fa-xmark';
            } else {
                icon.className = 'fa-solid fa-bars';
            }
        });
    }

    // 3. Cart Logic
    let cart = JSON.parse(localStorage.getItem('knotte_cart')) || [];

    const cartToggle = document.getElementById('cartToggle');
    const cartSidebar = document.getElementById('cartSidebar');
    const closeCart = document.getElementById('closeCart');
    const cartOverlay = document.getElementById('cartOverlay');
    const cartItemsContainer = document.getElementById('cartItems');
    const cartCount = document.getElementById('cartCount');
    const cartTotalPrice = document.getElementById('cartTotalPrice');

    function updateCartUI() {
        // Save to localStorage
        localStorage.setItem('knotte_cart', JSON.stringify(cart));
        
        // Update Count
        cartCount.textContent = cart.length;
        
        // Render Items
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<div class="empty-cart-msg">Keranjang masih kosong...</div>';
            cartTotalPrice.textContent = 'Rp0';
        } else {
            cartItemsContainer.innerHTML = '';
            let total = 0;
            cart.forEach((item, index) => {
                total += item.price;
                const cartItem = document.createElement('div');
                cartItem.className = 'cart-item';
                cartItem.innerHTML = `
                    <img src="${item.image}" class="cart-item-img" alt="${item.name}">
                    <div class="cart-item-info">
                        <h4>${item.name}</h4>
                        <p class="price">Rp${item.price.toLocaleString('id-ID')}</p>
                    </div>
                    <button class="remove-item" onclick="removeFromCart(${index})">
                        <i class="fa-solid fa-trash-can"></i>
                    </button>
                `;
                cartItemsContainer.appendChild(cartItem);
            });
            cartTotalPrice.textContent = `Rp${total.toLocaleString('id-ID')}`;
        }
    }

    window.addToCart = function(name, price, image) {
        cart.push({ name, price, image });
        updateCartUI();
        
        // Open cart sidebar after adding
        cartSidebar.classList.add('open');
        cartOverlay.classList.add('open');
    };

    window.removeFromCart = function(index) {
        cart.splice(index, 1);
        updateCartUI();
    };

    window.checkoutCart = function() {
        if (cart.length === 0) {
            alert('Keranjang kamu masih kosong!');
            return;
        }

        const phone = "6287801005291";
        let message = "Halo Knotté, saya ingin memesan produk berikut:\n\n";
        let total = 0;
        
        cart.forEach((item, index) => {
            message += `${index + 1}. ${item.name} - Rp${item.price.toLocaleString('id-ID')}\n`;
            total += item.price;
        });
        
        message += `\n*Total Order: Rp${total.toLocaleString('id-ID')}*`;
        message += "\n\nMohon informasi pembayarannya. Terima kasih!";
        
        const encodedMessage = encodeURIComponent(message);
        const url = `https://wa.me/${phone}?text=${encodedMessage}`;
        
        window.open(url, '_blank');
        
        // Optional: clear cart after checkout
        // cart = [];
        // updateCartUI();
    };

    if (cartToggle) {
        cartToggle.addEventListener('click', () => {
            cartSidebar.classList.add('open');
            cartOverlay.classList.add('open');
        });
    }

    if (closeCart) {
        closeCart.addEventListener('click', () => {
            cartSidebar.classList.remove('open');
            cartOverlay.classList.remove('open');
        });
    }

    if (cartOverlay) {
        cartOverlay.addEventListener('click', () => {
            cartSidebar.classList.remove('open');
            cartOverlay.classList.remove('open');
        });
    }

    // Initial render
    updateCartUI();

    // Help Modals Logic
    const sizeGuideLink = document.getElementById('sizeGuideLink');
    const orderGuideLink = document.getElementById('orderGuideLink');
    const shippingGuideLink = document.getElementById('shippingGuideLink');
    const returnPolicyLink = document.getElementById('returnPolicyLink');
    const faqLink = document.getElementById('faqLink');

    const sizeGuideModal = document.getElementById('sizeGuideModal');
    const orderGuideModal = document.getElementById('orderGuideModal');
    const shippingModal = document.getElementById('shippingModal');
    const returnPolicyModal = document.getElementById('returnPolicyModal');
    const faqModal = document.getElementById('faqModal');

    const closeSizeModal = document.getElementById('closeSizeModal');
    const closeOrderModal = document.getElementById('closeOrderModal');
    const closeShippingModal = document.getElementById('closeShippingModal');
    const closeReturnModal = document.getElementById('closeReturnModal');
    const closeFaqModal = document.getElementById('closeFaqModal');

    if (sizeGuideLink) {
        sizeGuideLink.addEventListener('click', (e) => {
            e.preventDefault();
            sizeGuideModal.classList.add('open');
        });
    }

    if (orderGuideLink) {
        orderGuideLink.addEventListener('click', (e) => {
            e.preventDefault();
            orderGuideModal.classList.add('open');
        });
    }

    if (shippingGuideLink) {
        shippingGuideLink.addEventListener('click', (e) => {
            e.preventDefault();
            shippingModal.classList.add('open');
        });
    }

    if (returnPolicyLink) {
        returnPolicyLink.addEventListener('click', (e) => {
            e.preventDefault();
            returnPolicyModal.classList.add('open');
        });
    }

    if (faqLink) {
        faqLink.addEventListener('click', (e) => {
            e.preventDefault();
            faqModal.classList.add('open');
        });
    }

    if (closeSizeModal) {
        closeSizeModal.addEventListener('click', () => sizeGuideModal.classList.remove('open'));
    }

    if (closeOrderModal) {
        closeOrderModal.addEventListener('click', () => orderGuideModal.classList.remove('open'));
    }

    if (closeShippingModal) {
        closeShippingModal.addEventListener('click', () => shippingModal.classList.remove('open'));
    }

    if (closeReturnModal) {
        closeReturnModal.addEventListener('click', () => returnPolicyModal.classList.remove('open'));
    }

    if (closeFaqModal) {
        closeFaqModal.addEventListener('click', () => faqModal.classList.remove('open'));
    }

    // Close modals on overlay click
    window.addEventListener('click', (e) => {
        if (e.target === sizeGuideModal) sizeGuideModal.classList.remove('open');
        if (e.target === orderGuideModal) orderGuideModal.classList.remove('open');
        if (e.target === shippingModal) shippingModal.classList.remove('open');
        if (e.target === returnPolicyModal) returnPolicyModal.classList.remove('open');
        if (e.target === faqModal) faqModal.classList.remove('open');
    });

    // 4. FAQ Accordion Logic
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            const icon = question.querySelector('i');
            
            // Toggle answer visibility
            const isOpen = answer.style.display === 'block';
            
            // Close all other answers first (optional)
            document.querySelectorAll('.faq-answer').forEach(ans => ans.style.display = 'none');
            document.querySelectorAll('.faq-question i').forEach(ic => {
                ic.style.transform = 'rotate(0deg)';
            });

            if (!isOpen) {
                answer.style.display = 'block';
                icon.style.transform = 'rotate(180deg)';
            } else {
                answer.style.display = 'none';
                icon.style.transform = 'rotate(0deg)';
            }
        });
    });

    // 4. Smooth Scrolling for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Hide mobile menu after clicking
                if (window.innerWidth <= 768) {
                    navLinks.classList.remove('active');
                }
            }
        });
    });
});

// 5. WhatsApp Order Function
function orderWhatsApp(productName) {
    const phone = "6287801005291";
    const message = `Halo Knotté, saya tertarik untuk memesan ${productName}. Mohon informasi lebih lanjut.`;
    const encodedMessage = encodeURIComponent(message);
    const url = `https://wa.me/${phone}?text=${encodedMessage}`;
    
    window.open(url, '_blank');
}

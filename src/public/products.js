(async () => {
  // Get Cart
  const cartResponse = await fetch("/api/carts");
  let [cart] = await cartResponse.json();

  // If Cart doesn't exist, create it
  if (!cart) {
    const createCartResponse = await fetch("/api/carts", { method: "POST" });
    cart = await createCartResponse.json();
  }

  // Get buttons
  const addToCartButtons = document.querySelectorAll(".addToCart");

  // Add event listeners
  addToCartButtons.forEach((button) => {
    button.addEventListener("click", async (event) => {
      const { id: productId } = event.target.dataset;

      // Add product to cart
      try {
        const response = await fetch(
          `/api/carts/${cart._id}/product/${productId}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        cart = await response.json();

        // Show success toast
        if (cart) {
          Toastify({
            text: `Product added to cart, click to go to cart`,
            destination: `/carts/${cart._id}`,
            duration: 10000,
            gravity: "top",
            position: "right",
            backgroundColor: "#4CAF50",
            stopOnFocus: true,
          }).showToast();
        }
      } catch (error) {
        // Show error toast
        Toastify({
          text: `Error: ${error}`,
          duration: 10000,
          gravity: "top",
          position: "right",
          backgroundColor: "#F44336",
          stopOnFocus: true,
        });
      }
    });
  });
})();

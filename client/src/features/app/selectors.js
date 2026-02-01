export const selectCartArray = (state) => {
  const { products, cartItems } = state.app;
  return Object.keys(cartItems).map(id => {
    const product = products.find(p => p._id === id);
    return { ...product, quantity: cartItems[id] };
  });
};

export const selectCartCount = (state) =>
  Object.values(state.app.cartItems).reduce((a, b) => a + b, 0);

export const selectCartAmount = (state) =>
  Object.keys(state.app.cartItems).reduce((total, id) => {
    const product = state.app.products.find(p => p._id === id);
    return total + product.offerPrice * state.app.cartItems[id];
  }, 0);

export const Cart = ({ quantity = 0, handleBasketshow = Function.prototype }) => {
  return (
    <div className="cart  light-blue darken-4 white-text" onClick={() => handleBasketshow()}>
      <i className="material-icons">shopping_cart</i>
      {quantity ? <span className="cart-quantity">{quantity}</span> : null}
    </div>
  );
};

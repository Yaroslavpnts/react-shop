import { BasketItem } from './BasketItem';

export const BasketList = ({
  order = [],
  handleBasketshow = Function.prototype,
  removeFromBasket,
  incQuantity,
  decQuantity,
}) => {
  const totalPrice = order.reduce((sum, el) => {
    return sum + el.price * el.quantity;
  }, 0);

  return (
    <ul className="collection basket-list">
      <li className="collection-item  active">Cart</li>
      {order.length ? (
        order.map(item => {
          return (
            <BasketItem
              key={item.id}
              {...item}
              removeFromBasket={removeFromBasket}
              incQuantity={incQuantity}
              decQuantity={decQuantity}
            />
          );
        })
      ) : (
        <li className="collection-item">Cart is empty</li>
      )}
      <li className="collection-item  active">Total cost: {totalPrice} UAH</li>
      <li className="collection-item ">
        <button className="btn-small">To order</button>
      </li>
      <i className="material-icons basket-close" onClick={handleBasketshow}>
        close
      </i>
    </ul>
  );
};

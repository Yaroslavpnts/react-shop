export const BasketItem = ({
  id,
  name,
  price,
  quantity,
  removeFromBasket = Function.prototype,
  incQuantity = Function.prototype,
  decQuantity = Function.prototype,
}) => {
  return (
    <li className="collection-item">
      {name}{' '}
      <i className="material-icons basket-quantity" onClick={() => decQuantity(id)}>
        remove
      </i>
      x{quantity}{' '}
      <i className="material-icons basket-quantity" onClick={() => incQuantity(id)}>
        add
      </i>{' '}
      = {price * quantity} UAH
      <span href="#!" className="secondary-content">
        <i className="material-icons basket-delete" onClick={() => removeFromBasket(id)}>
          clear
        </i>
      </span>
    </li>
  );
};

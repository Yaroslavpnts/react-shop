export const GoodsItem = ({
  mainId: id,
  displayName: name,
  displayDescription: description,
  price: { finalPrice: price },
  displayAssets: [{ background }],
  addToBasket = Function.prototype,
}) => {
  return (
    <div className="card" id={id}>
      <div className="card-image">
        <img src={background} alt={name} />
        <span className="card-title">{name}</span>
      </div>
      <div className="card-content">
        <p>{description ? description : 'Has no description'}</p>
      </div>
      <div className="card-action">
        <button onClick={() => addToBasket({ id, name, price })} className="btn">
          Buy
        </button>
        <span className="right" style={{ fontSize: '1.8rem' }}>
          {price} UAH
        </span>
      </div>
    </div>
  );
};

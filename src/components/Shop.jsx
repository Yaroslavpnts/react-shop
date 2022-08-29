import { useState, useEffect } from 'react';
import { API_KEY, API_URL } from '../config';

import { Preloader } from './Preloader';
import { GoodsList } from './Goods/GoodsList';
import { Cart } from './Basket/Cart';
import { BasketList } from './Basket/BasketList';
import { Alert } from './common/Alert';

export const Shop = () => {
  const [goods, setGoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState([]);
  const [isBasketShow, setBasketShow] = useState(false);
  const [alertName, setAlertName] = useState('');

  const addToBasket = item => {
    const itemIndex = order.findIndex(orderItem => orderItem.id === item.id);

    if (itemIndex < 0) {
      const newItem = {
        ...item,
        quantity: 1,
      };
      setOrder([...order, newItem]);
    } else {
      const newOrder = order.map((orderItem, index) => {
        if (index === itemIndex) {
          return {
            ...orderItem,
            quantity: orderItem.quantity + 1,
          };
        } else {
          return orderItem;
        }
      });

      setOrder(newOrder);
    }

    setAlertName(item.name);
  };

  const removeFromBasket = itemId => {
    setOrder(order.filter(item => item.id !== itemId));
  };

  const incQuantity = itemId => {
    const newOrder = order.map(item => {
      if (item.id !== itemId) {
        return item;
      } else {
        return {
          ...item,
          quantity: item.quantity + 1,
        };
      }
    });

    setOrder(newOrder);
  };

  const decQuantity = itemId => {
    const newOrder = order.map(item => {
      if (item.id !== itemId) {
        return item;
      } else {
        const newQuantity = item.quantity - 1;

        return {
          ...item,
          quantity: newQuantity >= 0 ? newQuantity : 0,
        };
      }
    });

    setOrder(newOrder);
  };

  const handleBasketshow = () => {
    setBasketShow(!isBasketShow);
  };

  const closeAlert = () => {
    setAlertName('');
  };

  useEffect(function getGoods() {
    fetch(API_URL, {
      headers: {
        Authorization: API_KEY,
      },
    })
      .then(response => response.json())
      .then(data => {
        data.shop && setGoods(data.shop);
        setLoading(false);
      });
  }, []);

  return (
    <main className="container content">
      <Cart quantity={order.length} handleBasketshow={handleBasketshow} />
      {loading ? <Preloader /> : <GoodsList goods={goods} addToBasket={addToBasket} />}
      {isBasketShow && (
        <BasketList
          order={order}
          handleBasketshow={handleBasketshow}
          removeFromBasket={removeFromBasket}
          incQuantity={incQuantity}
          decQuantity={decQuantity}
        />
      )}
      {alertName && <Alert name={alertName} closeAlert={closeAlert} />}
    </main>
  );
};

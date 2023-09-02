import React, { useCallback, useEffect, useState } from 'react';
import { Alert, Button } from 'react-native';
import { Work } from '../interfaces/OpenLibraryInterface';
import { useNavigation } from '@react-navigation/native';

function useCart() {
  const navigation = useNavigation();
  const [cart, setCart] = useState<Work[]>([]);
  const [showModalCart, setShowModalCart] = useState(false);
  const addToCart = useCallback((item: Work) => {
    setCart(prevCart => [...prevCart, item]);
  }, []);
  const removeToCart = useCallback((item: Work) => {
    setCart(prevCart => prevCart.filter(itemCart => itemCart.key !== item.key));
  }, []);
  const handleCheckout = useCallback(() => {
    setShowModalCart(false);
    setCart([]);

    setTimeout(() => Alert.alert('Success'), 500);
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          onPress={() => setShowModalCart(true)}
          title={cart.length >= 1 ? `Cart(${cart.length})` : 'Cart'}
        />
      ),
    });
  }, [cart, navigation]);

  return {
    cart,
    addToCart,
    removeToCart,
    handleCheckout,
    showModalCart,
    setShowModalCart,
  };
}

export default useCart;

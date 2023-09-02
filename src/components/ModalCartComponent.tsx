import React, { memo, useCallback, useState } from 'react';
import {
  Button,
  FlatList,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import { Work } from '../interfaces/OpenLibraryInterface';
import CartItemComponent from './CartItemComponent';
import DatePicker from 'react-native-date-picker';

interface IModalCartComponent {
  visible: boolean;
  cart: Work[];
  onRequestClose: () => void;
  removeToCart: (item: Work) => void;
  handleCheckout: () => void;
}

function ModalCartComponent({
  visible,
  cart,
  onRequestClose,
  removeToCart,
  handleCheckout,
}: IModalCartComponent): JSX.Element {
  const [date, setDate] = useState<Date>();
  const [open, setOpen] = useState(false);

  const onCheckout = useCallback(() => {
    if (!date) {
      return Alert.alert('Please select pickup date!');
    }

    Alert.alert('Confirmation', 'Are you sure?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => {
          setDate(undefined);
          handleCheckout();
        },
      },
    ]);
  }, [date, handleCheckout]);

  return (
    <Modal
      visible={visible}
      onRequestClose={onRequestClose}
      animationType="slide">
      <SafeAreaView style={styles.list}>
        <View style={styles.header}>
          <Text style={styles.title}>Cart</Text>
          <Button title={'X'} onPress={onRequestClose} />
        </View>
        {cart.length >= 1 ? (
          <>
            <FlatList
              style={styles.list}
              data={cart}
              renderItem={({ item }) => (
                <CartItemComponent item={item} onRemove={removeToCart} />
              )}
            />
            <View style={styles.footer}>
              <View style={styles.selectDate}>
                <Text style={styles.pickupText}>Pickup at</Text>
                <Button
                  title={date ? date.toLocaleString() : 'Select date >'}
                  onPress={() => setOpen(true)}
                />
              </View>
              <TouchableOpacity style={styles.checkout} onPress={onCheckout}>
                <Text>Check out</Text>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <Text>Not Found</Text>
        )}
      </SafeAreaView>
      <DatePicker
        modal
        open={open}
        date={date || new Date()}
        onConfirm={date => {
          setOpen(false);
          setDate(date);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </Modal>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  title: {
    flex: 1,
    fontSize: 24,
    fontWeight: 'bold',
  },
  list: {
    flex: 1,
  },
  footer: {
    borderTopWidth: 1,
    flexDirection: 'row',
  },
  pickupText: {
    paddingHorizontal: 8,
  },
  selectDate: {
    flex: 1,
    padding: 10,
    borderRightWidth: 1,
    alignItems: 'flex-start',
  },
  checkout: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
});

export default memo(ModalCartComponent);

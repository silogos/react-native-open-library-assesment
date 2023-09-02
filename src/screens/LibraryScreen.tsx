import React, { useCallback, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { subjects } from '../constants/data';
import useSWRInfinite, { SWRInfiniteKeyLoader } from 'swr/infinite';
import { Work } from '../interfaces/OpenLibraryInterface';
import BookComponent from '../components/BookComponent';
import { checkBookBorrowed, mergeBookList } from '../helpers/OpenLibraryHelper';
import useCart from '../hooks/useCart';
import useScrollToTop from '../hooks/useScrollToTop';
import ModalCartComponent from '../components/ModalCartComponent';

const LIMIT = 4;

function LibraryScreen({}): JSX.Element {
  const {
    cart,
    addToCart,
    removeToCart,
    handleCheckout,
    showModalCart,
    setShowModalCart,
  } = useCart();
  const [selected, setSelected] = useState(subjects[0].key);
  const { flatListRef } = useScrollToTop(selected);
  const getKey: SWRInfiniteKeyLoader = useCallback(
    (index, previousPageData) => {
      if (previousPageData && !previousPageData.length) {
        return null;
      }
      const offset = index * LIMIT;
      const key = `subjects/${selected}.json?ebooks=true&offset=${offset}&limit=${LIMIT}`;

      return key;
    },
    [selected],
  );
  const { data, error, size, setSize } = useSWRInfinite(
    getKey,
    async argument => {
      const url = `http://openlibrary.org/${argument}`;
      const res = await fetch(url).then(res => res.json());

      return res.works as Work[];
    },
  );
  const handleEndReached = useCallback(
    () => setSize(size + 1),
    [setSize, size],
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'dark-content'} />
      <View style={styles.subject}>
        <Text style={[styles.subjectItemTitle]}>Genre:</Text>
        <ScrollView horizontal={true}>
          {subjects.map(subject => (
            <TouchableOpacity
              key={subject.key}
              style={styles.subjectItem}
              onPress={() => setSelected(subject.key)}>
              <Text
                style={[
                  styles.subjectItemTitle,
                  subject.key === selected ? styles.subjectItemActive : null,
                ]}>
                #{subject.title}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      {error ? <Text style={styles.error}>Error fetching data</Text> : null}
      {data ? (
        <FlatList
          ref={flatListRef}
          data={mergeBookList(data)}
          renderItem={({ item }) => (
            <BookComponent
              work={item}
              isAdded={checkBookBorrowed(cart, item)}
              onAddToCart={addToCart}
              onRemoveToCart={removeToCart}
            />
          )}
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.1}
          ListFooterComponent={
            <ActivityIndicator size="large" color={'#000'} />
          }
        />
      ) : (
        <ActivityIndicator style={styles.loading} size="large" />
      )}

      <ModalCartComponent
        visible={showModalCart}
        cart={cart}
        onRequestClose={() => setShowModalCart(false)}
        removeToCart={removeToCart}
        handleCheckout={handleCheckout}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  subject: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    gap: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#000',
  },
  subjectItem: {
    marginRight: 10,
  },
  subjectItemTitle: {
    color: 'blue',
  },
  subjectItemActive: {
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  loading: {
    padding: 15,
  },
  error: {
    padding: 15,
  },
});

export default LibraryScreen;

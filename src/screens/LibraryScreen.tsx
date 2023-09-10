import React, { useCallback, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
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
      <View style={styles.subject}>
        {/* <Text style={[styles.subjectItemTitle]}>Genre:</Text> */}
        <FlatList
          horizontal
          data={subjects}
          keyExtractor={item => item.key}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.subjectItem}
              onPress={() => setSelected(item.key)}>
              <Text
                style={[
                  styles.subjectItemTitle,
                  item.key === selected && styles.subjectItemActive,
                ]}>
                {item.title}
              </Text>
              {item.key === selected ? <View style={styles.underline} /> : null}
            </TouchableOpacity>
          )}
        />
      </View>
      {error ? <Text style={styles.error}>Error fetching data</Text> : null}
      {data ? (
        <FlatList
          ref={flatListRef}
          style={styles.list}
          keyExtractor={item => item.key}
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
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    gap: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF52A2',
  },
  subjectItem: {
    marginRight: 10,
  },
  subjectItemTitle: {
    color: '#FF52A2',
  },
  subjectItemActive: {
    fontWeight: 'bold',
    color: '#F31559',
  },
  underline: {
    backgroundColor: '#F31559',
    height: 3,
    width: 20,
    borderRadius: 3,
    alignSelf: 'center',
    marginTop: 2,
  },
  list: {
    paddingTop: 10,
  },
  loading: {
    padding: 15,
  },
  error: {
    padding: 15,
  },
});

export default LibraryScreen;

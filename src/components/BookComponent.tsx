import React, { memo } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';
import { Work } from '../interfaces/OpenLibraryInterface';
import { getCoverBook } from '../helpers/OpenLibraryHelper';

interface IBookComponent {
  work: Work;
  isAdded: boolean;
  onAddToCart: (item: Work) => void;
  onRemoveToCart: (item: Work) => void;
}

function BookComponent({
  work,
  isAdded,
  onAddToCart,
  onRemoveToCart,
}: IBookComponent): JSX.Element {
  const coverBook = getCoverBook(work, 'M');

  return (
    <View style={[styles.container, styles.shadowContainer]}>
      <Image
        source={{ uri: coverBook }}
        resizeMode="cover"
        style={styles.image}
      />
      <View style={styles.content}>
        <Text style={styles.title} lineBreakMode="tail" numberOfLines={1}>
          {work.title}
        </Text>
        <Text style={styles.desc} lineBreakMode="tail" numberOfLines={1}>
          Author: {work.authors.map(author => author.name).join(', ')}
        </Text>
        <Text style={styles.desc} lineBreakMode="tail" numberOfLines={1}>
          Edition: {work.edition_count}
        </Text>
        <Text style={styles.desc}>
          Publication Year: {work.first_publish_year}
        </Text>
        <TouchableHighlight
          style={styles.button}
          underlayColor={'#FEF'}
          onPress={() => (isAdded ? onRemoveToCart(work) : onAddToCart(work))}>
          <Text style={styles.text}>
            {isAdded ? 'Remove from cart' : 'Add to cart'}
          </Text>
        </TouchableHighlight>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
    marginHorizontal: 15,
    flexDirection: 'row',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#CCC',
    alignItems: 'stretch',
    backgroundColor: '#FFF',
  },
  shadowContainer: {
    elevation: 3,
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  image: {
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    overflow: 'hidden',
    width: 120,
    height: '100%',
  },
  content: {
    flex: 1,
    alignItems: 'flex-start',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  title: { fontSize: 15, fontWeight: 'bold', marginBottom: 5 },
  desc: {
    fontSize: 12,
    marginBottom: 3,
  },
  button: {
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#F31559',
  },
  text: {
    fontSize: 12,
    lineHeight: 12,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: '#F31559',
  },
});

export default memo(BookComponent);

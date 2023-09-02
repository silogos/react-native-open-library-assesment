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
    <View style={styles.container}>
      <Image
        source={{ uri: coverBook }}
        width={120}
        height={150}
        resizeMode="cover"
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
    flexDirection: 'row',
    marginBottom: 10,
    elevation: 1,
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  content: {
    flex: 1,
    alignItems: 'flex-start',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 5 },
  desc: {
    fontSize: 15,
    marginBottom: 3,
  },
  button: {
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'blue',
  },
  text: {
    fontSize: 14,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'blue',
  },
});

export default memo(BookComponent);

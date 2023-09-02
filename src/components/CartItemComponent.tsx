import React, { memo } from 'react';
import { StyleSheet, Text, View, Image, Button } from 'react-native';
import { Work } from '../interfaces/OpenLibraryInterface';
import { getCoverBook } from '../helpers/OpenLibraryHelper';

interface ICartItemComponent {
  item: Work;
  onRemove: (item: Work) => void;
}

function CartItemComponent({
  item,
  onRemove,
}: ICartItemComponent): JSX.Element {
  const coverBook = getCoverBook(item, 'S');

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: coverBook }}
        width={60}
        height={60}
        resizeMode="cover"
      />
      <View style={styles.content}>
        <Text style={styles.title} lineBreakMode="tail" numberOfLines={1}>
          {item.title}
        </Text>
      </View>
      <Button title={'Remove'} onPress={() => onRemove(item)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    marginBottom: 5,
    paddingRight: 15,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 10,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default memo(CartItemComponent);

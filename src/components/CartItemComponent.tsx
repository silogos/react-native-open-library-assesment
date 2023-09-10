import React, { memo } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { Work } from '../interfaces/OpenLibraryInterface';
import { getCoverBook } from '../helpers/OpenLibraryHelper';
import Icon from 'react-native-vector-icons/AntDesign';

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
        resizeMode="cover"
        style={styles.image}
      />
      <View style={styles.content}>
        <Text style={styles.title} lineBreakMode="tail" numberOfLines={1}>
          {item.title + ' - ' + item.authors[0].name}
        </Text>
      </View>

      <TouchableOpacity onPress={() => onRemove(item)} testID="remove">
        <Icon name="close" size={20} color={'#F31559'} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 80,
    marginVertical: 5,
    marginHorizontal: 15,
    flexDirection: 'row',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#CCC',
    alignItems: 'center',
    backgroundColor: '#FFF',
    paddingRight: 10,
  },
  shadowContainer: {
    elevation: 3,
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  image: {
    width: 80,
    height: '100%',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    overflow: 'hidden',
  },
  content: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default memo(CartItemComponent);

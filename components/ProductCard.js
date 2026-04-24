import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const ProductCard = ({ item, isGrid }) => (
  <View style={[styles.card, isGrid && styles.gridCard]}>
    <View style={[styles.imageContainer, isGrid && styles.gridImageContainer]}>
      <Text style={[styles.image, isGrid && {fontSize: 30}]}>{item.image}</Text>
    </View>
    <View style={styles.content}>
      <Text style={styles.category}>{item.category.toUpperCase()}</Text>
      <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
      <View style={styles.priceRow}>
         <Text style={styles.price}>Rp {item.price.toLocaleString('id-ID')}</Text>
         <Text style={styles.rating}>⭐ {item.rating}</Text>
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  card: { backgroundColor: '#fff', borderRadius: 20, padding: 12, marginBottom: 12, flexDirection: 'row', alignItems: 'center', elevation: 3, shadowColor: '#FFB6C1', shadowOpacity: 0.2, marginHorizontal: 4 },
  gridCard: { flexDirection: 'column', width: (width / 2) - 25, margin: 5, alignItems: 'center' },
  imageContainer: { backgroundColor: '#FFF0F5', width: 75, height: 75, borderRadius: 18, justifyContent: 'center', alignItems: 'center' },
  gridImageContainer: { width: 100, height: 100, marginBottom: 10 },
  image: { fontSize: 38 },
  content: { flex: 1, marginLeft: 15, width: '100%' },
  category: { fontSize: 9, fontWeight: '900', color: '#DB7093', letterSpacing: 1 },
  name: { fontSize: 15, fontWeight: '700', color: '#444' },
  priceRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 4 },
  price: { fontSize: 13, fontWeight: 'bold', color: '#C71585' },
  rating: { fontSize: 11, fontWeight: '600', color: '#D2691E' }
});

export default ProductCard;
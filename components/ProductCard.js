import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ProductCard = ({ item }) => {
  return (
    <View style={styles.card}>
      <View style={styles.imageContainer}>
        <Text style={styles.image}>{item.image}</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.category}>{item.category}</Text>
        <Text style={styles.name}>{item.name}</Text>
        <View style={styles.row}>
          <Text style={styles.price}>Rp {item.price.toLocaleString('id-ID')}</Text>
          <View style={styles.ratingBadge}>
            <Text style={styles.ratingText}>⭐ {item.rating}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 25,
    padding: 12,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#27ae60',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    marginHorizontal: 4,
  },
  imageContainer: {
    backgroundColor: '#f0f9f4',
    width: 80,
    height: 80,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: { fontSize: 40 },
  content: { flex: 1, marginLeft: 15 },
  category: { fontSize: 10, fontWeight: 'bold', color: '#27ae60', letterSpacing: 1, marginBottom: 2 },
  name: { fontSize: 17, fontWeight: '700', color: '#2c3e50' },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 },
  price: { fontSize: 15, fontWeight: '800', color: '#e67e22' },
  ratingBadge: { backgroundColor: '#fef9e7', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 10 },
  ratingText: { fontSize: 12, fontWeight: 'bold', color: '#f1c40f' },
});

export default ProductCard;
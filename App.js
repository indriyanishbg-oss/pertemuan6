import React, { useState } from 'react';
import { 
  SafeAreaView, FlatList, TextInput, View, Text, 
  StyleSheet, RefreshControl, TouchableOpacity, ScrollView, StatusBar 
} from 'react-native';

// Import data dan komponen
import { PRODUCTS } from './data/products';
import ProductCard from './components/ProductCard';

const CATEGORIES = ['Semua', 'Berry', 'Lokal', 'Import'];

export default function App() {
  const [search, setSearch] = useState('');
  const [activeCat, setActiveCat] = useState('Semua');
  const [refreshing, setRefreshing] = useState(false);

  // R5: Filter Logika
  const filteredData = PRODUCTS.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());
    const matchesCat = activeCat === 'Semua' || item.category === activeCat;
    return matchesSearch && matchesCat;
  });

  // R6: Pull to Refresh
  const onRefresh = () => {
    setRefreshing(true);
    setSearch('');
    setActiveCat('Semua');
    setTimeout(() => setRefreshing(false), 1500);
  };

  // R4: Empty State
  const renderEmpty = () => (
    <View style={styles.emptyBox}>
      <Text style={styles.emptyImg}>🌸</Text>
      <Text style={styles.emptyText}>Duh, buahnya nggak ketemu, Sis!</Text>
      <Text style={styles.emptyHint}>Coba cari nama buah lain atau tarik ke bawah ya ✨</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.header}>
        <View>
          <Text style={styles.welcomeText}>BerryFresh ✨</Text>
          <Text style={styles.subWelcome}>Cari buah manis favoritmu</Text>
        </View>
        <View style={styles.profileCircle}>
          <Text style={styles.profileEmoji}>🎀</Text>
        </View>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchBox}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Mau buah segar apa?"
            placeholderTextColor="#DB7093"
            value={search}
            onChangeText={setSearch}
          />
        </View>
      </View>

      <View style={{ marginBottom: 15 }}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.catScroll}>
          {CATEGORIES.map(cat => (
            <TouchableOpacity 
              key={cat} 
              style={[styles.catChip, activeCat === cat && styles.catChipActive]}
              onPress={() => setActiveCat(cat)}
            >
              <Text style={[styles.catText, activeCat === cat && styles.catTextActive]}>{cat}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <FlatList
        data={filteredData}
        renderItem={({ item }) => <ProductCard item={item} />}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={renderEmpty}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#FF69B4" />
        }
      />

      <View style={styles.footer}>
        <Text style={styles.footerName}>Indriani Shbg</Text>
        <Text style={styles.footerNim}>NIM: 243303611294</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF5F7' },
  header: { 
    paddingHorizontal: 25, 
    paddingTop: 45, 
    paddingBottom: 20, 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    backgroundColor: '#fff',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    elevation: 5,
    shadowColor: '#FFB6C1',
  },
  welcomeText: { fontSize: 26, fontWeight: '900', color: '#C71585', fontStyle: 'italic' },
  subWelcome: { fontSize: 13, color: '#DB7093', fontWeight: '500' },
  profileCircle: { width: 45, height: 45, borderRadius: 23, backgroundColor: '#FFF0F5', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#FFB6C1' },
  profileEmoji: { fontSize: 20 },
  searchContainer: { paddingHorizontal: 20, marginVertical: 15 },
  searchBox: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#fff', 
    borderRadius: 20, 
    paddingHorizontal: 15, 
    height: 50, 
    borderWidth: 1.5, 
    borderColor: '#FFB6C1',
    elevation: 3,
    shadowColor: '#FFB6C1',
  },
  searchIcon: { marginRight: 10, fontSize: 16 },
  searchInput: { flex: 1, fontSize: 15, color: '#C71585' },
  catScroll: { paddingHorizontal: 20 },
  catChip: { paddingHorizontal: 22, paddingVertical: 10, borderRadius: 20, backgroundColor: '#fff', marginRight: 10, borderWidth: 1, borderColor: '#FFB6C1' },
  catChipActive: { backgroundColor: '#DB7093', borderColor: '#DB7093' },
  catText: { fontSize: 14, fontWeight: '600', color: '#DB7093' },
  catTextActive: { color: '#fff' },
  listContainer: { paddingHorizontal: 20, paddingBottom: 110 },
  emptyBox: { alignItems: 'center', marginTop: 80, paddingHorizontal: 40 },
  emptyImg: { fontSize: 70, marginBottom: 15 },
  emptyText: { fontSize: 18, fontWeight: '800', color: '#C71585', textAlign: 'center' },
  emptyHint: { fontSize: 14, color: '#DB7093', textAlign: 'center', marginTop: 10 },
  footer: { 
    position: 'absolute', 
    bottom: 0, 
    width: '100%', 
    backgroundColor: '#fff', 
    padding: 15, 
    alignItems: 'center', 
    borderTopWidth: 2, 
    borderTopColor: '#FFF0F5'
  },
  footerName: { fontSize: 14, fontWeight: 'bold', color: '#C71585' },
  footerNim: { fontSize: 12, color: '#DB7093' }
});
import React, { useState } from 'react';
import { 
  SafeAreaView, FlatList, SectionList, TextInput, View, Text, 
  StyleSheet, RefreshControl, TouchableOpacity, ScrollView, StatusBar 
} from 'react-native';
import { PRODUCTS } from './data/products';
import ProductCard from './components/ProductCard';

const CATEGORIES = ['Semua', 'Berry', 'Lokal', 'Import'];

export default function App() {
  const [search, setSearch] = useState('');
  const [activeCat, setActiveCat] = useState('Semua');
  const [refreshing, setRefreshing] = useState(false);
  const [isGridView, setIsGridView] = useState(false);
  const [isSectionMode, setIsSectionMode] = useState(false);
  const [sortBy, setSortBy] = useState(null);

  const getProcessedData = () => {
    let data = [...PRODUCTS];
    data = data.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());
      const matchesCat = activeCat === 'Semua' || item.category === activeCat;
      return matchesSearch && matchesCat;
    });

    if (sortBy === 'price_low') data.sort((a, b) => a.price - b.price);
    if (sortBy === 'price_high') data.sort((a, b) => b.price - a.price);
    if (sortBy === 'rating') data.sort((a, b) => b.rating - a.rating);
    
    return data;
  };

  const processedData = getProcessedData();

  const getSectionData = () => {
    return CATEGORIES.filter(cat => cat !== 'Semua').map(cat => ({
      title: cat,
      data: processedData.filter(item => item.category === cat)
    })).filter(section => section.data.length > 0);
  };

  const onRefresh = () => {
    setRefreshing(true);
    setSearch('');
    setActiveCat('Semua');
    setSortBy(null);
    setTimeout(() => setRefreshing(false), 1500);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.header}>
        <View>
          <Text style={styles.welcomeText}>BerryFresh ✨</Text>
          <Text style={styles.subWelcome}>{isSectionMode ? 'Mode Kategori' : 'Fresh Market'}</Text>
        </View>
        <View style={styles.idBadge}>
          <Text style={styles.nimText}>243303611294</Text>
        </View>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchBox}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput style={styles.searchInput} placeholder="Cari buah..." placeholderTextColor="#DB7093" value={search} onChangeText={setSearch} />
        </View>
      </View>

      <View style={styles.controlPanel}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <TouchableOpacity style={[styles.miniBtn, isSectionMode && styles.activeMini]} onPress={() => {setIsSectionMode(!isSectionMode); setIsGridView(false)}}>
            <Text style={[styles.miniBtnText, isSectionMode && styles.activeText]}>{isSectionMode ? '📋 Normal' : '🗂️ Section'}</Text>
          </TouchableOpacity>
          {!isSectionMode && (
            <TouchableOpacity style={[styles.miniBtn, isGridView && styles.activeMini]} onPress={() => setIsGridView(!isGridView)}>
              <Text style={[styles.miniBtnText, isGridView && styles.activeText]}>{isGridView ? '📱 List' : '🖼️ Grid'}</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity style={[styles.miniBtn, sortBy === 'price_low' && styles.activeMini]} onPress={() => setSortBy(sortBy === 'price_low' ? null : 'price_low')}><Text style={[styles.miniBtnText, sortBy === 'price_low' && styles.activeText]}>💰 Murah</Text></TouchableOpacity>
          <TouchableOpacity style={[styles.miniBtn, sortBy === 'price_high' && styles.activeMini]} onPress={() => setSortBy(sortBy === 'price_high' ? null : 'price_high')}><Text style={[styles.miniBtnText, sortBy === 'price_high' && styles.activeText]}>💎 Mahal</Text></TouchableOpacity>
          <TouchableOpacity style={[styles.miniBtn, sortBy === 'rating' && styles.activeMini]} onPress={() => setSortBy(sortBy === 'rating' ? null : 'rating')}><Text style={[styles.miniBtnText, sortBy === 'rating' && styles.activeText]}>⭐ Rating</Text></TouchableOpacity>
        </ScrollView>
      </View>

      {!isSectionMode && (
        <View style={{ marginBottom: 10 }}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.catScroll}>
            {CATEGORIES.map(cat => (
              <TouchableOpacity key={cat} style={[styles.catChip, activeCat === cat && styles.catChipActive]} onPress={() => setActiveCat(cat)}>
                <Text style={[styles.catText, activeCat === cat && styles.catTextActive]}>{cat}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}

      {isSectionMode ? (
        <SectionList sections={getSectionData()} keyExtractor={(item) => item.id} renderItem={({ item }) => <ProductCard item={item} isGrid={false} />} renderSectionHeader={({ section: { title } }) => (
          <View style={styles.sectionHeader}><Text style={styles.sectionTitle}>{title}</Text></View>
        )} contentContainerStyle={styles.listContainer} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#FF69B4" />} />
      ) : (
        <FlatList key={isGridView ? 'G' : 'L'} data={processedData} numColumns={isGridView ? 2 : 1} renderItem={({ item }) => <ProductCard item={item} isGrid={isGridView} />} keyExtractor={item => item.id} contentContainerStyle={styles.listContainer} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#FF69B4" />} ListEmptyComponent={<View style={styles.emptyContainer}><Text style={styles.emptyIcon}>🌸</Text><Text style={styles.emptyText}>Buahnya nggak ketemu, Sis!</Text></View>} />
      )}

      <View style={styles.footer}>
        <Text style={styles.footerName}>Indriani Shbg</Text>
        <Text style={styles.footerNim}>NIM: 243303611294</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF5F7' },
  header: { paddingHorizontal: 25, paddingTop: 45, paddingBottom: 20, backgroundColor: '#fff', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottomLeftRadius: 30, borderBottomRightRadius: 30, elevation: 5, shadowColor: '#FFB6C1' },
  welcomeText: { fontSize: 24, fontWeight: '900', color: '#C71585', fontStyle: 'italic' },
  subWelcome: { fontSize: 12, color: '#DB7093', fontWeight: '500' },
  idBadge: { backgroundColor: '#FFF0F5', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 15, borderWidth: 1, borderColor: '#FFB6C1' },
  nimText: { fontSize: 11, color: '#C71585', fontWeight: 'bold' },
  searchContainer: { paddingHorizontal: 20, marginVertical: 15 },
  searchBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 20, paddingHorizontal: 15, height: 50, borderWidth: 1.5, borderColor: '#FFB6C1', elevation: 3 },
  searchInput: { flex: 1, color: '#C71585', fontSize: 15 },
  controlPanel: { paddingHorizontal: 20, marginBottom: 15 },
  miniBtn: { paddingHorizontal: 15, paddingVertical: 8, borderRadius: 12, backgroundColor: '#fff', marginRight: 10, borderWidth: 1, borderColor: '#FFB6C1' },
  activeMini: { backgroundColor: '#C71585', borderColor: '#C71585' },
  miniBtnText: { fontSize: 12, color: '#C71585', fontWeight: 'bold' },
  activeText: { color: '#fff' },
  catScroll: { paddingHorizontal: 20 },
  catChip: { paddingHorizontal: 20, paddingVertical: 10, borderRadius: 20, backgroundColor: '#fff', marginRight: 10, borderWidth: 1, borderColor: '#FFB6C1' },
  catChipActive: { backgroundColor: '#DB7093', borderColor: '#DB7093' },
  catText: { fontSize: 13, color: '#DB7093', fontWeight: '600' },
  catTextActive: { color: '#fff' },
  listContainer: { paddingHorizontal: 15, paddingBottom: 110 },
  sectionHeader: { backgroundColor: '#FFF0F5', padding: 10, borderRadius: 15, marginVertical: 10, borderLeftWidth: 5, borderLeftColor: '#C71585' },
  sectionTitle: { fontSize: 15, fontWeight: '900', color: '#C71585', letterSpacing: 1 },
  emptyContainer: { alignItems: 'center', marginTop: 100 },
  emptyIcon: { fontSize: 60, marginBottom: 15 },
  emptyText: { fontSize: 16, color: '#DB7093', fontWeight: '600' },
  footer: { position: 'absolute', bottom: 0, width: '100%', backgroundColor: '#fff', padding: 15, alignItems: 'center', borderTopWidth: 2, borderTopColor: '#FFF0F5' },
  footerName: { fontSize: 14, fontWeight: 'bold', color: '#C71585' },
  footerNim: { fontSize: 12, color: '#DB7093' }
});
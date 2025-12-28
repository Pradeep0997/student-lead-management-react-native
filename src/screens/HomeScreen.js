// src/screens/HomeScreen.js
import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import LeadCard from '../components/LeadCard';

export default function HomeScreen({ navigation }) {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  // Reload data whenever screen is focused
  useFocusEffect(
    useCallback(() => {
      loadLeads();
    }, [])
  );

  const loadLeads = async () => {
    try {
      setLoading(true);
      const storedLeads = await AsyncStorage.getItem('leads');
      if (storedLeads) {
        setLeads(JSON.parse(storedLeads));
      }
    } catch (error) {
      console.error('Failed to load leads', error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ FIXED: Only render the LeadCard component, no extra wrapper
  const renderItem = ({ item }) => (
    <LeadCard 
      item={item} 
      onPress={() => navigation.navigate('LeadDetails', { lead: item })} 
    />
  );

  // Header Component for the List
  const ListHeader = () => (
    <View style={styles.headerContainer}>
      <Text style={styles.headerTitle}>All Students</Text>
      <View style={styles.countBadge}>
        <Text style={styles.countText}>{leads.length}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.primary} />
      
      {loading ? (
        <ActivityIndicator size="large" color={colors.primary} style={{ marginTop: 50 }} />
      ) : leads.length === 0 ? (
        <View style={styles.emptyState}>
          <View style={styles.emptyIconBg}>
            <Ionicons name="school-outline" size={60} color={colors.primary} />
          </View>
          <Text style={styles.emptyText}>No Students Yet</Text>
          <Text style={styles.emptySubText}>Tap the "+" button to add your first lead.</Text>
        </View>
      ) : (
        <FlatList
          data={leads}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          ListHeaderComponent={ListHeader} // Added Header
        />
      )}

      {/* Floating Action Button */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('AddLead')}
        activeOpacity={0.8}
      >
        <Ionicons name="add" size={32} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' }, // Lighter gray background
  listContent: { padding: 16, paddingBottom: 100 },
  
  // Header Styles
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
    paddingHorizontal: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#111827', // Darker text
  },
  countBadge: {
    backgroundColor: '#E0E7FF',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  countText: {
    color: colors.primary,
    fontWeight: 'bold',
    fontSize: 14,
  },

  // Empty State Styles
  emptyState: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  emptyIconBg: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#EEF2FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  emptyText: { fontSize: 22, fontWeight: 'bold', color: '#374151' },
  emptySubText: { fontSize: 16, color: '#6B7280', textAlign: 'center', marginTop: 8 },

  // FAB Styles
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: colors.primary,
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
  },
});

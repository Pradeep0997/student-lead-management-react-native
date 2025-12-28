// src/screens/LeadDetailsScreen.js
import React from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';

export default function LeadDetailsScreen({ route, navigation }) {
  const { lead } = route.params;

  const confirmDelete = () => {
    Alert.alert(
      'Delete Lead',
      'Are you sure you want to remove this lead?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: deleteLead },
      ]
    );
  };

  const deleteLead = async () => {
    try {
      const storedLeads = await AsyncStorage.getItem('leads');
      let leads = storedLeads ? JSON.parse(storedLeads) : [];
      const newLeads = leads.filter((item) => item.id !== lead.id);
      
      await AsyncStorage.setItem('leads', JSON.stringify(newLeads));
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Could not delete lead');
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        
        {/* Header Profile Section */}
        <View style={styles.headerCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{lead.name.charAt(0).toUpperCase()}</Text>
          </View>
          <Text style={styles.name}>{lead.name}</Text>
          <Text style={styles.program}>{lead.course}</Text>
        </View>

        {/* Details Section */}
        <View style={styles.detailsCard}>
          <DetailRow icon="mail-outline" label="Email" value={lead.email || 'N/A'} />
          <DetailRow icon="call-outline" label="Phone" value={lead.phone || 'N/A'} />
          <DetailRow icon="document-text-outline" label="Notes" value={lead.notes || 'No notes added.'} />
        </View>

      </ScrollView>

      {/* Delete Button */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.deleteButton} onPress={confirmDelete}>
          <Ionicons name="trash-outline" size={20} color="#fff" />
          <Text style={styles.deleteText}>Delete Lead</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// Helper Component for Rows
const DetailRow = ({ icon, label, value }) => (
  <View style={styles.row}>
    <View style={styles.iconBox}>
      <Ionicons name={icon} size={20} color={colors.primary} />
    </View>
    <View style={{ flex: 1 }}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1 },
  headerCard: {
    backgroundColor: colors.card,
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#EEF2FF', // Indigo-50
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatarText: { fontSize: 32, color: colors.primary, fontWeight: 'bold' },
  name: { fontSize: 24, fontWeight: 'bold', color: colors.text },
  program: { fontSize: 16, color: colors.secondary, marginTop: 4, fontWeight: '600' },
  
  detailsCard: {
    backgroundColor: colors.card,
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  row: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 20 },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  label: { fontSize: 12, color: colors.subText, marginBottom: 2, textTransform: 'uppercase', letterSpacing: 0.5 },
  value: { fontSize: 16, color: colors.text, fontWeight: '500' },

  footer: { padding: 16, backgroundColor: 'transparent' },
  deleteButton: {
    backgroundColor: colors.danger,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    shadowColor: colors.danger,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  deleteText: { color: '#fff', fontSize: 16, fontWeight: 'bold', marginLeft: 8 },
});

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';

const LeadCard = ({ item, onPress }) => {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.cardRow}>
        {/* Avatar / Initial Circle */}
        <View style={styles.iconContainer}>
          <Text style={styles.avatarText}>
            {item.name ? item.name.charAt(0).toUpperCase() : '?'}
          </Text>
        </View>

        {/* Lead Info */}
        <View style={styles.infoContainer}>
          <Text style={styles.name} numberOfLines={1}>
            {item.name}
          </Text>
          <Text style={styles.course} numberOfLines={1}>
            {item.course}
          </Text>
          
          {/* Status Badge */}
          <View style={styles.badgeContainer}>
            <Ionicons 
              name={item.email ? "mail-outline" : "call-outline"} 
              size={12} 
              color={colors.secondary} 
            />
            <Text style={styles.status}>
              {item.email ? ' Email' : ' Phone'}
            </Text>
          </View>
        </View>

        {/* Arrow Icon */}
        <Ionicons name="chevron-forward" size={24} color={colors.subText} />
      </View>
    </TouchableOpacity>
  );
};

export default LeadCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    // iOS Shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    // Android Shadow
    elevation: 3,
    borderWidth: 1,
    borderColor: 'rgba(229, 231, 235, 0.5)', // Subtle border like Tailwind gray-200
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#EEF2FF', // Indigo-50
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    borderWidth: 1,
    borderColor: '#E0E7FF',
  },
  avatarText: {
    color: colors.primary,
    fontSize: 20,
    fontWeight: 'bold',
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 2,
  },
  course: {
    fontSize: 13,
    color: colors.subText,
    marginBottom: 6,
  },
  badgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5', // Emerald-50
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  status: {
    fontSize: 11,
    color: colors.secondary,
    fontWeight: '600',
    marginLeft: 2,
  },
});

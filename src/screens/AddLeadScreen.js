// src/screens/AddLeadScreen.js
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  ScrollView, 
  Alert, 
  StyleSheet, 
  KeyboardAvoidingView, 
  Platform, 
  Modal, 
  FlatList,
  Keyboard 
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';

// 🎓 List of Courses for Dropdown
const COURSES = [
  "React Native Masterclass",
  "Full Stack Web Development",
  "Data Science & AI",
  "UI/UX Design Certification",
  "Digital Marketing Pro",
  "Cloud Computing (AWS/Azure)"
];

export default function AddLeadScreen({ navigation }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', course: '', notes: '' });
  const [errors, setErrors] = useState({});
  const [modalVisible, setModalVisible] = useState(false);

  const validate = () => {
    let valid = true;
    let newErrors = {};

    // 1. Name Validation
    if (!form.name.trim()) {
      newErrors.name = 'Student Name is required';
      valid = false;
    }

    // 2. Course Validation
    if (!form.course.trim()) {
      newErrors.course = 'Please select a program';
      valid = false;
    }

    // 3. Contact Validation
    if (!form.email.trim() && !form.phone.trim()) {
      Alert.alert('Missing Contact', 'Please enter at least an Email OR a Phone Number.');
      return false;
    }

    // 4. Email Format Validation
    // This Regex allows capitals (e.g. User@Example.com is valid)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (form.email && !emailRegex.test(form.email)) {
      newErrors.email = 'Please enter a valid email address';
      valid = false;
    }

    // 5. Strict Phone Validation
    if (form.phone) {
      // Check for 10 digits
      if (!/^\d{10}$/.test(form.phone)) {
        newErrors.phone = 'Phone number must be exactly 10 digits';
        valid = false;
      } 
      // Check for blocked patterns (000... or 123...)
      else if (
        /^0+$/.test(form.phone) ||      // 0000000000
        form.phone === '1234567890' ||  // 1234567890
        form.phone === '9876543210' ||  // 9876543210
        /^(\d)\1{9}$/.test(form.phone)  // 1111111111, 2222222222, etc.
      ) {
        newErrors.phone = 'Please enter a valid, real phone number';
        valid = false;
      }
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSave = async () => {
    if (!validate()) return;

    const newLead = {
      id: Date.now().toString(),
      ...form,
      // ✅ UPDATE: Force email to lowercase when saving
      email: form.email.trim().toLowerCase(),
    };

    try {
      const storedLeads = await AsyncStorage.getItem('leads');
      const leads = storedLeads ? JSON.parse(storedLeads) : [];
      leads.unshift(newLead);
      await AsyncStorage.setItem('leads', JSON.stringify(leads));
      
      Alert.alert('Success', 'Student lead added successfully!');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Failed to save lead.');
    }
  };

  const selectCourse = (course) => {
    setForm({ ...form, course: course });
    setModalVisible(false);
    setErrors({ ...errors, course: null }); // Clear error if any
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1, backgroundColor: '#fff' }}
    >
      <ScrollView contentContainerStyle={styles.container}>
        
        <Text style={styles.header}>New Student Details</Text>

        {/* Name Input */}
        <InputGroup 
          label="Full Name *" 
          placeholder="e.g. Rahul Kumar" 
          value={form.name} 
          onChangeText={(t) => setForm({ ...form, name: t })}
          error={errors.name}
        />

        {/* --- CUSTOM DROPDOWN FOR COURSE --- */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Interested Program *</Text>
          <TouchableOpacity 
            style={[styles.input, styles.dropdownSelector, errors.course && styles.inputError]}
            onPress={() => {
              Keyboard.dismiss();
              setModalVisible(true);
            }}
          >
            <Text style={[styles.inputText, !form.course && { color: '#9CA3AF' }]}>
              {form.course || "Select a Course..."}
            </Text>
            <Ionicons name="chevron-down" size={20} color="#6B7280" />
          </TouchableOpacity>
          {errors.course && <Text style={styles.errorText}>{errors.course}</Text>}
        </View>

        {/* Email Input */}
        <InputGroup 
          label="Email Address" 
          placeholder="student@example.com" 
          value={form.email} 
          onChangeText={(t) => setForm({ ...form, email: t })}
          error={errors.email}
          keyboardType="email-address"
          // ✅ UPDATE: Stop auto-capitalizing the first letter
          autoCapitalize="none"
        />

        {/* Phone Input */}
        <InputGroup 
          label="Phone Number" 
          placeholder="9876543210" 
          value={form.phone} 
          onChangeText={(t) => setForm({ ...form, phone: t })}
          error={errors.phone}
          keyboardType="numeric"
          maxLength={10}
        />

        {/* Notes Input */}
        <Text style={styles.label}>Additional Notes</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Any specific requirements or comments..."
          multiline
          numberOfLines={4}
          value={form.notes}
          onChangeText={(t) => setForm({ ...form, notes: t })}
        />

        {/* Submit Button */}
        <TouchableOpacity style={styles.submitButton} onPress={handleSave}>
          <Text style={styles.submitButtonText}>Save Student Lead</Text>
        </TouchableOpacity>

      </ScrollView>

      {/* --- MODAL FOR DROPDOWN --- */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Course</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Ionicons name="close" size={24} color="#374151" />
              </TouchableOpacity>
            </View>
            
            <FlatList
              data={COURSES}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity 
                  style={styles.modalItem} 
                  onPress={() => selectCourse(item)}
                >
                  <Text style={[
                    styles.modalItemText, 
                    form.course === item && styles.selectedItemText
                  ]}>
                    {item}
                  </Text>
                  {form.course === item && (
                    <Ionicons name="checkmark-circle" size={24} color={colors.primary} />
                  )}
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>

    </KeyboardAvoidingView>
  );
}

// Reusable Input Component
// ✅ UPDATE: Added 'autoCapitalize' prop support
const InputGroup = ({ label, placeholder, value, onChangeText, error, keyboardType, maxLength, autoCapitalize }) => (
  <View style={styles.inputContainer}>
    <Text style={styles.label}>{label}</Text>
    <TextInput
      style={[styles.input, error && styles.inputError]}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      keyboardType={keyboardType}
      maxLength={maxLength}
      placeholderTextColor="#9CA3AF"
      autoCapitalize={autoCapitalize} // Pass it here
    />
    {error && <Text style={styles.errorText}>{error}</Text>}
  </View>
);

const styles = StyleSheet.create({
  container: { padding: 24, paddingBottom: 50 },
  header: { fontSize: 24, fontWeight: 'bold', color: '#111827', marginBottom: 24 },
  inputContainer: { marginBottom: 16 },
  label: { fontSize: 14, fontWeight: '600', color: '#374151', marginBottom: 6 },
  
  // Input Styles
  input: {
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    color: '#1F2937',
  },
  inputText: { fontSize: 16, color: '#1F2937' },
  inputError: { borderColor: colors.danger, borderWidth: 1 },
  textArea: { height: 100, textAlignVertical: 'top', marginTop: 6 },
  errorText: { color: colors.danger, fontSize: 12, marginTop: 4, marginLeft: 4 },
  
  // Dropdown Specific Styles
  dropdownSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  // Button Styles
  submitButton: {
    backgroundColor: colors.primary,
    paddingVertical: 18,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 24,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  submitButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },

  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)', // Dim background
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '60%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
    paddingBottom: 10,
  },
  modalTitle: { fontSize: 18, fontWeight: 'bold', color: '#111827' },
  modalItem: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F9FAFB',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalItemText: { fontSize: 16, color: '#374151' },
  selectedItemText: { color: colors.primary, fontWeight: 'bold' },
});

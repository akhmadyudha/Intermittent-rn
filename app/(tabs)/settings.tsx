import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Switch,
} from 'react-native';
import { Bell, Smartphone, Info, ChevronRight } from 'lucide-react-native';

export default function SettingsScreen() {
  const [notifications, setNotifications] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      <View style={styles.header}>
        <Text style={styles.title}>Settings</Text>
        <Text style={styles.subtitle}>Customize your fasting experience</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notifications</Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <View style={[styles.settingIcon, { backgroundColor: '#EEF2FF' }]}>
                <Bell size={20} color="#2563EB" />
              </View>
              <View style={styles.settingInfo}>
                <Text style={styles.settingTitle}>Push Notifications</Text>
                <Text style={styles.settingDescription}>
                  Get reminded when to start or end fasting
                </Text>
              </View>
            </View>
            <Switch
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{ false: '#F3F4F6', true: '#DBEAFE' }}
              thumbColor={notifications ? '#2563EB' : '#9CA3AF'}
            />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <View style={[styles.settingIcon, { backgroundColor: '#F0FDF4' }]}>
                <Smartphone size={20} color="#10B981" />
              </View>
              <View style={styles.settingInfo}>
                <Text style={styles.settingTitle}>Sound Alerts</Text>
                <Text style={styles.settingDescription}>
                  Play sound when timer completes
                </Text>
              </View>
            </View>
            <Switch
              value={soundEnabled}
              onValueChange={setSoundEnabled}
              trackColor={{ false: '#F3F4F6', true: '#D1FAE5' }}
              thumbColor={soundEnabled ? '#10B981' : '#9CA3AF'}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Fasting Goals</Text>
          
          <TouchableOpacity style={styles.settingButton}>
            <View style={styles.settingLeft}>
              <View style={[styles.settingIcon, { backgroundColor: '#FEF3C7' }]}>
                <Text style={styles.goalEmoji}>🎯</Text>
              </View>
              <View style={styles.settingInfo}>
                <Text style={styles.settingTitle}>Weekly Goal</Text>
                <Text style={styles.settingDescription}>5 days per week</Text>
              </View>
            </View>
            <ChevronRight size={20} color="#9CA3AF" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingButton}>
            <View style={styles.settingLeft}>
              <View style={[styles.settingIcon, { backgroundColor: '#FEE2E2' }]}>
                <Text style={styles.goalEmoji}>🔥</Text>
              </View>
              <View style={styles.settingInfo}>
                <Text style={styles.settingTitle}>Streak Goal</Text>
                <Text style={styles.settingDescription}>30 days</Text>
              </View>
            </View>
            <ChevronRight size={20} color="#9CA3AF" />
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          
          <TouchableOpacity style={styles.settingButton}>
            <View style={styles.settingLeft}>
              <View style={[styles.settingIcon, { backgroundColor: '#F3F4F6' }]}>
                <Info size={20} color="#6B7280" />
              </View>
              <View style={styles.settingInfo}>
                <Text style={styles.settingTitle}>App Version</Text>
                <Text style={styles.settingDescription}>1.0.0</Text>
              </View>
            </View>
            <ChevronRight size={20} color="#9CA3AF" />
          </TouchableOpacity>
        </View>

        <View style={styles.tips}>
          <Text style={styles.tipsTitle}>💡 Fasting Tips</Text>
          <Text style={styles.tipsText}>
            • Stay hydrated during fasting periods{'\n'}
            • Start with shorter fasts and gradually increase{'\n'}
            • Listen to your body and adjust as needed{'\n'}
            • Consult your doctor before starting any fasting regimen
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    fontWeight: '400',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#F3F4F6',
    marginBottom: 8,
  },
  settingButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#F3F4F6',
    marginBottom: 8,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  goalEmoji: {
    fontSize: 20,
  },
  settingInfo: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 2,
  },
  settingDescription: {
    fontSize: 14,
    color: '#6B7280',
  },
  tips: {
    backgroundColor: '#F9FAFB',
    padding: 20,
    borderRadius: 12,
    marginTop: 20,
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 12,
  },
  tipsText: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
});
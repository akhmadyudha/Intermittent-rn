import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Calendar, Clock, Flame } from 'lucide-react-native';

const SAMPLE_HISTORY = [
  {
    id: 1,
    date: '2024-01-15',
    protocol: '16:8',
    duration: '16h 2m',
    completed: true,
  },
  {
    id: 2,
    date: '2024-01-14',
    protocol: '16:8',
    duration: '15h 45m',
    completed: false,
  },
  {
    id: 3,
    date: '2024-01-13',
    protocol: '18:6',
    duration: '18h 15m',
    completed: true,
  },
  {
    id: 4,
    date: '2024-01-12',
    protocol: '16:8',
    duration: '16h 30m',
    completed: true,
  },
  {
    id: 5,
    date: '2024-01-11',
    protocol: '16:8',
    duration: '16h 8m',
    completed: true,
  },
];

export default function HistoryScreen() {
  const completedSessions = SAMPLE_HISTORY.filter(session => session.completed).length;
  const currentStreak = 3; // This would be calculated based on consecutive completed sessions
  
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      <View style={styles.header}>
        <Text style={styles.title}>Fasting History</Text>
        <Text style={styles.subtitle}>Track your progress</Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <View style={styles.statIcon}>
            <Calendar size={24} color="#2563EB" />
          </View>
          <Text style={styles.statNumber}>{completedSessions}</Text>
          <Text style={styles.statLabel}>Completed</Text>
        </View>
        
        <View style={styles.statCard}>
          <View style={styles.statIcon}>
            <Flame size={24} color="#EF4444" />
          </View>
          <Text style={styles.statNumber}>{currentStreak}</Text>
          <Text style={styles.statLabel}>Day Streak</Text>
        </View>
        
        <View style={styles.statCard}>
          <View style={styles.statIcon}>
            <Clock size={24} color="#10B981" />
          </View>
          <Text style={styles.statNumber}>16:8</Text>
          <Text style={styles.statLabel}>Favorite</Text>
        </View>
      </View>

      <ScrollView style={styles.historyList} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>Recent Sessions</Text>
        
        {SAMPLE_HISTORY.map((session) => (
          <View key={session.id} style={styles.historyItem}>
            <View style={styles.historyLeft}>
              <View style={[
                styles.statusIndicator,
                { backgroundColor: session.completed ? '#10B981' : '#F59E0B' }
              ]} />
              <View>
                <Text style={styles.historyDate}>
                  {new Date(session.date).toLocaleDateString('en-US', {
                    weekday: 'short',
                    month: 'short',
                    day: 'numeric'
                  })}
                </Text>
                <Text style={styles.historyProtocol}>{session.protocol}</Text>
              </View>
            </View>
            
            <View style={styles.historyRight}>
              <Text style={styles.historyDuration}>{session.duration}</Text>
              <Text style={[
                styles.historyStatus,
                { color: session.completed ? '#10B981' : '#F59E0B' }
              ]}>
                {session.completed ? 'Completed' : 'Incomplete'}
              </Text>
            </View>
          </View>
        ))}
        
        {SAMPLE_HISTORY.length === 0 && (
          <View style={styles.emptyState}>
            <Calendar size={48} color="#D1D5DB" />
            <Text style={styles.emptyTitle}>No history yet</Text>
            <Text style={styles.emptySubtitle}>
              Start your first fasting session to see your progress here
            </Text>
          </View>
        )}
      </ScrollView>
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
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 32,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
  },
  statIcon: {
    marginBottom: 12,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  historyList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 16,
  },
  historyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  historyLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  statusIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 16,
  },
  historyDate: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 2,
  },
  historyProtocol: {
    fontSize: 14,
    color: '#6B7280',
  },
  historyRight: {
    alignItems: 'flex-end',
  },
  historyDuration: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 2,
  },
  historyStatus: {
    fontSize: 14,
    fontWeight: '500',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#9CA3AF',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#D1D5DB',
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 32,
  },
});
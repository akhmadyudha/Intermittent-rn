import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';

interface Protocol {
  name: string;
  fast: number;
  eat: number;
}

interface FastingProtocolProps {
  protocols: Protocol[];
  selected: Protocol;
  onSelect: (protocol: Protocol) => void;
  disabled?: boolean;
}

export function FastingProtocol({
  protocols,
  selected,
  onSelect,
  disabled = false,
}: FastingProtocolProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose Your Protocol</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {protocols.map((protocol) => (
          <TouchableOpacity
            key={protocol.name}
            style={[
              styles.protocolCard,
              selected.name === protocol.name && styles.selectedCard,
              disabled && styles.disabledCard,
            ]}
            onPress={() => !disabled && onSelect(protocol)}
            disabled={disabled}
          >
            <Text style={[
              styles.protocolName,
              selected.name === protocol.name && styles.selectedText,
              disabled && styles.disabledText,
            ]}>
              {protocol.name}
            </Text>
            <Text style={[
              styles.protocolDescription,
              selected.name === protocol.name && styles.selectedDescriptionText,
              disabled && styles.disabledText,
            ]}>
              {protocol.fast}h fast
            </Text>
            {protocol.eat > 0 && (
              <Text style={[
                styles.protocolDescription,
                selected.name === protocol.name && styles.selectedDescriptionText,
                disabled && styles.disabledText,
              ]}>
                {protocol.eat}h eat
              </Text>
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 16,
    textAlign: 'center',
  },
  scrollContent: {
    paddingHorizontal: 4,
    gap: 12,
  },
  protocolCard: {
    backgroundColor: '#F9FAFB',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'transparent',
    alignItems: 'center',
    minWidth: 80,
  },
  selectedCard: {
    backgroundColor: '#EEF2FF',
    borderColor: '#2563EB',
  },
  disabledCard: {
    opacity: 0.5,
  },
  protocolName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
  },
  selectedText: {
    color: '#2563EB',
  },
  protocolDescription: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  selectedDescriptionText: {
    color: '#3B82F6',
  },
  disabledText: {
    color: '#9CA3AF',
  },
});
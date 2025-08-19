import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Play, Pause, Square } from 'lucide-react-native';
import { CircularProgress } from '@/components/CircularProgress';
import { FastingProtocol } from '@/components/FastingProtocol';

const FASTING_PROTOCOLS = [
  { name: '16:8', fast: 16, eat: 8 },
  { name: '18:6', fast: 18, eat: 6 },
  { name: '20:4', fast: 20, eat: 4 },
  { name: '24:0', fast: 24, eat: 0 },
];

export default function HomeScreen() {
  const [selectedProtocol, setSelectedProtocol] = useState(FASTING_PROTOCOLS[0]);
  const [isActive, setIsActive] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [startTime, setStartTime] = useState<Date | null>(null);

  const totalSeconds = selectedProtocol.fast * 60 * 60;
  const progress = Math.min(seconds / totalSeconds, 1);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    if (isActive) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds + 1);
      }, 1000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive]);

  const handleStart = () => {
    setIsActive(true);
    if (!startTime) {
      setStartTime(new Date());
    }
  };

  const handlePause = () => {
    setIsActive(false);
  };

  const handleStop = () => {
    setIsActive(false);
    setSeconds(0);
    setStartTime(null);
  };

  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getRemainingTime = () => {
    const remaining = totalSeconds - seconds;
    return remaining > 0 ? remaining : 0;
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      <View style={styles.header}>
        <Text style={styles.title}>Intermittent Fasting</Text>
        <Text style={styles.subtitle}>Stay focused, stay healthy</Text>
      </View>

      <FastingProtocol
        protocols={FASTING_PROTOCOLS}
        selected={selectedProtocol}
        onSelect={setSelectedProtocol}
        disabled={isActive || seconds > 0}
      />

      <View style={styles.timerContainer}>
        <CircularProgress
          size={280}
          progress={progress}
          strokeWidth={8}
          color="#2563EB"
          backgroundColor="#F3F4F6"
        />
        
        <View style={styles.timerContent}>
          <Text style={styles.timeText}>
            {formatTime(seconds)}
          </Text>
          <Text style={styles.remainingText}>
            {getRemainingTime() > 0 
              ? `${formatTime(getRemainingTime())} remaining`
              : progress >= 1 
                ? 'Fasting Complete!'
                : 'Ready to start'
            }
          </Text>
          
          {progress >= 1 && (
            <Text style={styles.congratsText}>
              🎉 Well done!
            </Text>
          )}
        </View>
      </View>

      <View style={styles.controls}>
        {!isActive && seconds === 0 && (
          <TouchableOpacity style={styles.startButton} onPress={handleStart}>
            <Play size={24} color="#FFFFFF" />
            <Text style={styles.startButtonText}>Start Fasting</Text>
          </TouchableOpacity>
        )}
        
        {!isActive && seconds > 0 && progress < 1 && (
          <TouchableOpacity style={styles.resumeButton} onPress={handleStart}>
            <Play size={24} color="#FFFFFF" />
            <Text style={styles.resumeButtonText}>Resume</Text>
          </TouchableOpacity>
        )}
        
        {isActive && (
          <TouchableOpacity style={styles.pauseButton} onPress={handlePause}>
            <Pause size={24} color="#FFFFFF" />
            <Text style={styles.pauseButtonText}>Pause</Text>
          </TouchableOpacity>
        )}
        
        {(isActive || seconds > 0) && (
          <TouchableOpacity style={styles.stopButton} onPress={handleStop}>
            <Square size={20} color="#EF4444" />
            <Text style={styles.stopButtonText}>Stop</Text>
          </TouchableOpacity>
        )}
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
  timerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    position: 'relative',
  },
  timerContent: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeText: {
    fontSize: 36,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 8,
    fontFamily: 'monospace',
  },
  remainingText: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 4,
  },
  congratsText: {
    fontSize: 18,
    color: '#10B981',
    fontWeight: '600',
    marginTop: 8,
  },
  controls: {
    paddingHorizontal: 32,
    paddingBottom: 40,
    alignItems: 'center',
    gap: 16,
  },
  startButton: {
    backgroundColor: '#2563EB',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 50,
    width: '100%',
    gap: 8,
  },
  startButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  resumeButton: {
    backgroundColor: '#10B981',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 50,
    width: '100%',
    gap: 8,
  },
  resumeButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  pauseButton: {
    backgroundColor: '#F59E0B',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 50,
    width: '100%',
    gap: 8,
  },
  pauseButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  stopButton: {
    backgroundColor: '#FFFFFF',
    borderColor: '#EF4444',
    borderWidth: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    gap: 6,
  },
  stopButtonText: {
    color: '#EF4444',
    fontSize: 16,
    fontWeight: '600',
  },
});
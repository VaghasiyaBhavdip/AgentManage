import React from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';

interface WrapperViewProps {
  children: React.ReactNode;
}

const WrapperView: React.FC<WrapperViewProps> = ({ children }) => {
  return (
    <SafeAreaView style={styles.container}>
      {children}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default WrapperView;

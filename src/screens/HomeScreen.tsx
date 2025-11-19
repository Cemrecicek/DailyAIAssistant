import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const HomeScreen = () => {
  const [text, setText] = useState('');

  const handleAnalyze = () => {
    // Şimdilik sadece konsola yazdıralım
    console.log("Kullanıcı metni:", text);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>AI Günlük Asistanım</Text>

      <TextInput
        style={styles.input}
        placeholder="Bugün kendini nasıl hissediyorsun?"
        value={text}
        onChangeText={setText}
        multiline
      />

      <Button title="Analiz Et" onPress={handleAnalyze} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 8,
    padding: 10,
    height: 120,
    marginBottom: 20,
    textAlignVertical: 'top',
  },
});

export default HomeScreen;

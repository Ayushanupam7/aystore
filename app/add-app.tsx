
import React, { useState } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text, ScrollView, Alert } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function AddAppScreen() {
  const [appName, setAppName] = useState('');
  const [version, setVersion] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [iconUrl, setIconUrl] = useState('');

  const handleSubmit = () => {
    // In a real app, you'd handle the data submission here
    // For example, sending it to a server or storing it locally.
    Alert.alert(
      'App Details Submitted',
      `Name: ${appName}\nVersion: ${version}\nDescription: ${description}\nCategory: ${category}\nIcon URL: ${iconUrl}`
    );
  };

  return (
    <ScrollView style={styles.container}>
      <ThemedView style={styles.innerContainer}>
        <ThemedText type="title">Add a New App</ThemedText>

        <TextInput
          style={styles.input}
          placeholder="App Name"
          value={appName}
          onChangeText={setAppName}
        />
        <TextInput
          style={styles.input}
          placeholder="Version"
          value={version}
          onChangeText={setVersion}
        />
        <TextInput
          style={styles.input}
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
          multiline
        />
        <TextInput
          style={styles.input}
          placeholder="Category"
          value={category}
          onChangeText={setCategory}
        />
        <TextInput
          style={styles.input}
          placeholder="Icon URL"
          value={iconUrl}
          onChangeText={setIconUrl}
        />

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  innerContainer: {
    padding: 16,
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 16,
    marginBottom: 10,
    fontSize: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  button: {
    backgroundColor: '#007BFF',
    borderRadius: 10,
    padding: 16,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

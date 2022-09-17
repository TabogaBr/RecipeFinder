import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList, Alert, Image } from 'react-native';

export default function App() {

  const [keyword, setKeyword] = useState('');
  const [meals, setMeals] = useState([]);

  const getMeals = () => {
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${keyword}`)
      .then(response => response.json())
      .then(data => setMeals(data.meals))
      .catch(error => {
        Alert.alert('Error', error);
      });
  }

  const listSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "80%",
          backgroundColor: "#CED0CE",
          marginLeft: "10%"
        }}
      />
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.marginTop}
        renderItem={({ item }) =>
          <View>
            <Text style={styles.text}>{item.strMeal}</Text>
            <Image
              style={styles.image}
              source={{ uri: item.strMealThumb }}
            />
          </View>}
        ItemSeparatorComponent={listSeparator}
        data={meals} />
      <TextInput
        style={styles.inputs}
        placeholder='keyword'
        onChangeText={text => setKeyword(text)} />
      <Button title="FIND" onPress={getMeals} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputs: {
    fontSize: 18,
    width: 200,
  },
  text: {
    fontSize: 16,
  },
  marginTop: {
    marginTop: 50,
    width: 280,
  },
  image: {
    width: 60,
    height: 60,
  },
});

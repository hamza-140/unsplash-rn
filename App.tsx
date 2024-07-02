import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';

const App = () => {
  const [imgUrl, setImgUrl] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchImg = async () => {
    try {
      const response = await axios.get(
        'https://api.unsplash.com/photos/random',
        {
          params: {
            count: 1,
            client_id: 'LQMTmSb890vKHXyFnI1A6pDPsGAKpQN1uEhPS7PWN9Y',
          },
        },
      );
      setTimeout(() => {
        setImgUrl(response.data[0].urls.regular);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error(error);
      setLoading(true);
    }
  };

  const shuffle = () => {
    fetchImg();
  };

  useEffect(() => {
    fetchImg();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large"></ActivityIndicator>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image source={{uri: imgUrl}} width={400} height={400}></Image>
      <Button onPress={shuffle} title="Shuffle"></Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;

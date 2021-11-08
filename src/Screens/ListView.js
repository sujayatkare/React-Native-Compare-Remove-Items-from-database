import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import {firebase} from '@react-native-firebase/database';

import {windowHeight, windowWidth} from '../Utils/Dimensions/Dimensions';

const ListView = ({navigation, index}) => {
  const [data, setData] = useState([]);
  const [compare, setCompare] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const results = await fetch(
          'https://jsonplaceholder.typicode.com/photos/?_limit=50',
          {
            params: {
              limit: 50,
            },
          },
        )
          .then(response => response.json())
          .then(json => setData(json));
        console.log(results);
      } catch (err) {
        throw err;
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const addToCompare = item => {
    const id = '_' + item.id;
    const insertKey = id;
    const contactsDbRef = firebase
      .app()
      .database()
      .ref('compare/' + insertKey);
    contactsDbRef
      .set({
        title: item.title,
        id: item.id,
        url: item.url,
      })
      .catch(e => console.log(e));
    setCompare([...compare, item]);
    console.log('data added', compare);
  };

  const removeFromCompare = async item => {
    const ref = await firebase
      .database()
      .ref('compare/' + '_' + item.id)
      .remove();
    setCompare([...compare, ref]);
    console.log('data removed', compare);
  };
  React.useEffect(() => {}, [compare]);
  return (
    <>
      <View style={styles.mainContainer}>
        <Text style={{color: 'white'}}>List View</Text>
        <FlatList
          data={data}
          keyExtractor={item => item.id}
          renderItem={({item, index}) => (
            <View key={index} style={styles.outerContainer}>
              <Image source={{uri: item.url}} style={styles.image} />
              <View style={styles.innerContainer}>
                <View style={styles.titleContainer}>
                  <View style={{flex: 1}}>
                    <Text style={styles.titleText}>Title</Text>
                  </View>
                  <View style={{flex: 1}}>
                    <Text style={styles.subText}>{item.title}</Text>
                  </View>
                </View>
                <View style={styles.titleContainer}>
                  <View style={{flex: 1}}>
                    <Text style={styles.titleText}>ID</Text>
                  </View>
                  <View style={{flex: 1}}>
                    <Text style={[styles.subText, {textAlign: 'center'}]}>
                      {item.id}
                    </Text>
                  </View>
                </View>
              </View>
              <Text style={styles.titleText}>URL</Text>
              <Text style={styles.subText2}>{item.url}</Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  width: windowWidth * 0.9,
                }}>
                <TouchableOpacity onPress={() => addToCompare(item)}>
                  <View style={styles.btnContainer}>
                    <Text style={styles.btnText}>Compare</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => removeFromCompare(item)}>
                  <View style={styles.btnContainer}>
                    <Text style={styles.btnText}>Remove</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  outerContainer: {
    borderWidth: 1,
    backgroundColor: 'white',
    width: windowWidth * 0.9,
    marginRight: 5,
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 5,
    padding: 5,
  },
  image: {
    width: 200,
    height: 100,
    resizeMode: 'contain',
    borderRadius: 10,
    marginBottom: 5,
  },
  innerContainer: {
    flexDirection: 'row',
    width: windowWidth * 0.9,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderBottomWidth: 1,
    paddingBottom: 5,
  },
  titleContainer: {
    width: windowWidth * 0.4,
    flexDirection: 'column',
  },
  titleText: {
    color: 'black',
    textAlign: 'center',
    paddingHorizontal: 10,
    paddingBottom: 5,
    fontSize: 18,
    fontWeight: 'bold',
  },
  subText: {
    color: 'black',
    textAlign: 'justify',
    paddingHorizontal: 10,
  },
  subText2: {
    color: 'black',
    textAlign: 'center',
    width: '100%',
    paddingBottom: 5,
  },
  btnContainer: {
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 10,
  },
  btnText: {
    color: 'white',
    fontWeight: 'bold',
    textAlignVertical: 'center',
  },
});

export default ListView;

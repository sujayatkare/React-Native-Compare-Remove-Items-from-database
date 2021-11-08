import React, {useState} from 'react';
import {View, Text, StyleSheet, Image, FlatList} from 'react-native';
import database from '@react-native-firebase/database';
import {windowWidth} from '../Utils/Dimensions/Dimensions';

const DetailView = () => {
  const [list, setList] = useState([]);

  React.useEffect(() => {
    let deRef = database().ref('compare/');
    deRef.on('value', datasnap => {
      console.log(datasnap.val());
      let data = datasnap.val();
      const items = Object.values(data);
      setList(items);
    });
  }, []);

  React.useEffect(() => {
    console.log(list);
  }, [list]);
  return (
    <>
      <View style={styles.mainContainer}>
        <>
          <View>
            <View style={styles.headingContainer}>
              <Text style={styles.headingText}>COMPARISON TABLE</Text>
            </View>
            <View style={styles.subHeadingContainer}>
              <View style={styles.imageTextContainer}>
                <Text style={styles.subText}>Image</Text>
              </View>
              <View style={styles.idTextContainer}>
                <Text style={styles.subText}>Id</Text>
              </View>
              <View style={styles.titleTextContainer}>
                <Text style={styles.subText}>Title</Text>
              </View>
              <View style={styles.urlTextContainer}>
                <Text style={styles.subText}>URL</Text>
              </View>
            </View>
            <View>
              <FlatList
                data={list}
                keyExtractor={item => item.id}
                renderItem={({item, index}) => (
                  <View style={styles.flatListContainer}>
                    <View style={styles.imageTextContainer}>
                      <Image source={{uri: item.url}} style={styles.image} />
                    </View>
                    <View style={[styles.idTextContainer, {padding: 5}]}>
                      <Text style={styles.text}>{item.id}</Text>
                    </View>
                    <View style={[styles.titleTextContainer, {padding: 5}]}>
                      <Text style={styles.text}>{item.title}</Text>
                    </View>
                    <View style={[styles.urlTextContainer, {padding: 5}]}>
                      <Text style={styles.text}>{item.url}</Text>
                    </View>
                  </View>
                )}
              />
            </View>
          </View>
        </>
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
  headingContainer: {
    width: windowWidth * 1,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: 'white',
    marginTop: 10,
  },
  headingText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
  subHeadingContainer: {
    flexDirection: 'row',
    width: windowWidth * 1,
    padding: 5,
    borderBottomWidth: 1,
    borderColor: 'white',
    alignSelf: 'center',
  },
  imageTextContainer: {
    width: windowWidth * 0.3,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 1,
    borderRightColor: 'white',
  },
  subText: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
  idTextContainer: {
    width: windowWidth * 0.1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 1,
    borderRightColor: 'white',
  },
  titleTextContainer: {
    width: windowWidth * 0.3,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 1,
    borderRightColor: 'white',
  },
  urlTextContainer: {
    width: windowWidth * 0.3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flatListContainer: {
    flexDirection: 'row',
    width: windowWidth * 1,
    padding: 5,
    borderBottomWidth: 1,
    borderColor: 'white',
    alignSelf: 'center',
  },
  image: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },
  text: {
    textAlign: 'justify',
    color: 'white',
    fontSize: 13,
  },
});

export default DetailView;

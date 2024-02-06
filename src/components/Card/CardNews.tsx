import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import R from '../../assets/R';

interface Props {
  title: string;
  content: string;
  date: string;
  author: string;
  imageUrl: string;
}

const CardNews = ({title, content, date, author, imageUrl}: Props) => {
  return (
    <View style={styles.container}>
      <Image source={{uri: imageUrl}} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.content}>{content}</Text>
        <Text style={styles.date}>Date: {date}</Text>
        <Text style={styles.author}>Author: {author}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 20,
    backgroundColor: R.colors.color_tone_5,
    borderRadius: 10,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  textContainer: {
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  content: {
    fontSize: 18,
    marginBottom: 10,
  },
  date: {
    fontSize: 14,
    color: R.colors.color_tone_2,
  },
  author: {
    fontSize: 14,
    color: R.colors.color_tone_2,
  },
});

export default CardNews;

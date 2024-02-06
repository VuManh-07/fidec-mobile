import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import CardNews from '../../components/Card/CardNews';
import newsDate from '../../constant/newsData';
import {getFont} from '../../utils/functions';

const News = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>News</Text>
      {newsDate.map(item => {
        return (
          <CardNews
            key={item.id}
            title={item.title}
            content={item.content}
            date={item.date}
            author={item.author}
            imageUrl={item.imageUrl}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 20,
  },
  text: {
    color: 'white',
    fontSize: getFont(30),
    fontWeight: 'bold',
  },
});

export default News;

import {FlatList} from 'native-base';
import React from 'react';
import {StyleSheet} from 'react-native';

const VList = ({style, props, data, ListHeaderComponent, renderItem}) => {
  return (
    <FlatList
      style={[styles.container, {...style}]}
      data={data}
      renderItem={renderItem}
      keyExtractor={item => item.id.toString()}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={ListHeaderComponent}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default React.memo(VList);

import {FlatList} from 'native-base';
import React from 'react';
import {StyleSheet} from 'react-native';
import {AppActivityIndicator, EmptyView} from '.';

const VList = ({
  style,
  props,
  data,
  ListHeaderComponent,
  renderItem,
  refreshing,
  onRefresh,
  loading,
}) => {
  if (loading) {
    return <AppActivityIndicator />;
  }

  return (
    <FlatList
      refreshing={refreshing}
      onRefresh={onRefresh}
      style={[styles.container, {...style}]}
      data={data}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={
        data.length === 0 && !loading ? <EmptyView /> : ListHeaderComponent
      }
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default React.memo(VList);

import {Box, Text, FlatList, Icon} from 'native-base';
import React from 'react';
import {StyleSheet} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {AppActivityIndicator} from '.';

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
  const EmptyView = () => (
    <Box p={5} alignItems="center" flex={1}>
      <Icon as={MaterialCommunityIcons} name="database-search" size={16} />
      <Text m={2}>Não há registros ...</Text>
    </Box>
  );

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
      keyExtractor={item => item.id.toString()}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={
        data.length === 0 ? <EmptyView /> : ListHeaderComponent
      }
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default React.memo(VList);

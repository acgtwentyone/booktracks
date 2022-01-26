import {Box, Text} from 'native-base';
import React from 'react';
import {StyleSheet} from 'react-native';
import {FONT_SIZE} from '../Utils';

const ListTitle = ({style, props, title}) => {
  return (
    <Box style={[styles.container, {...style}]} {...props} m={4}>
      <Text fontSize={FONT_SIZE.font_16} fontWeight="bold">
        {title}
      </Text>
    </Box>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default ListTitle;

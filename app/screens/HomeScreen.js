import React from 'react';
import {ListBookItems, Screen} from '../components';

const HomeScreen = () => {
  return (
    <Screen>
      <ListBookItems subtitle="Recent books" recent={true} />
      {/* <RecentPage props={{mt: 4}} />
        <RecentBook
          data={favourities}
          title="favourities"
          props={{mt: 4, mb: 8}}
        /> */}
    </Screen>
  );
};

export default HomeScreen;

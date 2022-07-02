import React from 'react';
import {Menu, Pressable, ThreeDotsIcon} from 'native-base';

const AppBadge = ({
  children,
  position = 'auto',
  shouldOverlapWithTrigger = false,
}) => {
  return (
    <Menu
      shouldOverlapWithTrigger={shouldOverlapWithTrigger}
      placement={position === 'auto' ? undefined : position}
      trigger={triggerProps => {
        return (
          <Pressable accessibilityLabel="Book options" {...triggerProps}>
            <ThreeDotsIcon size="sm" />
          </Pressable>
        );
      }}>
      {children}
    </Menu>
  );
};

export default React.memo(AppBadge);

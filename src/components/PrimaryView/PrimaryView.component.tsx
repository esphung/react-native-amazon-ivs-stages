import * as React from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  type ScrollViewProps,
  type ViewProps,
} from 'react-native';
import PrimaryText from '../PrimaryText/PrimaryText.component';

interface Props extends ViewProps, ScrollViewProps {
  title?: string;
  scrollEnabled?: boolean;
}

export default function PrimaryView(props: Props) {
  const { scrollEnabled = false, style, title, children, ...rest } = props;

  const memoizedBody = React.useMemo(() => {
    if (!children) {
      if (title) {
        return <PrimaryText style={styles.text}>{title}</PrimaryText>;
      }
      return null;
    }
    return children;
  }, [children, title]);

  if (scrollEnabled) {
    return (
      <ScrollView
        contentContainerStyle={style ? style : styles.container}
        {...rest}
      >
        {memoizedBody}
      </ScrollView>
    );
  }

  return (
    <View
      style={style ? style : [styles.container, styles.centeredView]}
      {...rest}
    >
      {memoizedBody}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centeredView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
  },
});

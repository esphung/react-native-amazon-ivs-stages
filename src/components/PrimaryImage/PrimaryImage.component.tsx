import React from 'react';
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  type ImageProps,
} from 'react-native';

interface Props extends ImageProps {
  type?: 'base' | 'circle';
  onPress?: () => void;
  selected?: boolean;
}

export default function PrimaryImage(props: Props) {
  const { type = 'base', onPress, selected = false, ...rest } = props;

  const memoizedBody = React.useMemo(
    () => (
      <Image
        style={[
          type === 'circle' ? styles.imageCircle : styles.image,
          selected && styles.selected,
        ]}
        source={{
          uri: 'https://reactnative.dev/img/tiny_logo.png',
        }}
        resizeMode="contain"
        {...rest}
      />
    ),
    [rest, selected, type]
  );

  return (
    <TouchableOpacity
      disabled={!onPress}
      style={[
        styles.imageBtnContainer,
        type === 'circle' && styles.imageBtnContainerCircle,
      ]}
      onPress={onPress}
    >
      {memoizedBody}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  image: {
    height: '100%',
  },
  imageCircle: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
  },
  imageBtnContainer: {
    width: '100%',
    height: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageBtnContainerCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selected: {
    borderWidth: 2,
    borderColor: '#FAC140',
  },
});

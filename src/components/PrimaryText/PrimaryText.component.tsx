import { StyleSheet, Text, type TextProps } from 'react-native';
import * as React from 'react';

interface Props extends TextProps {
  type?: keyof typeof styles;
}

const baseStyle = {
  fontSize: 14,
  color: 'white',
};

export default function PrimaryText(props: Props) {
  const { type = 'base', style, children, ...rest } = props;

  const memoizedStyle = React.useMemo(() => {
    return [styles[type], style];
  }, [type, style]);

  return (
    <Text style={memoizedStyle} {...rest}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  base: {
    ...baseStyle,
  },
  header: {
    ...baseStyle,
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
  },
  paragraph: {
    ...baseStyle,
    fontSize: 14,
    color: 'white',
  },
  primaryBtnTitle: {
    ...baseStyle,
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
  },
  secondaryBtnTitle: {
    ...baseStyle,
    fontSize: 16,
    color: '#FAC140',
  },
  textInputLabel: {
    ...baseStyle,
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
});

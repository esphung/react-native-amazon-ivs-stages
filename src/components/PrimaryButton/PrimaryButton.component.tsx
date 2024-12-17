import * as React from 'react';
import {
  type ButtonProps,
  type TouchableOpacityProps,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import PrimaryText from '../PrimaryText/PrimaryText.component';

interface Props extends TouchableOpacityProps, ButtonProps {
  type?: keyof typeof styles;
}

const baseStyle: TouchableOpacityProps['style'] = {
  width: '100%',
  backgroundColor: '#FAC140',
  padding: 10,
  borderRadius: 5,
  alignItems: 'center',
  alignSelf: 'center',
  justifyContent: 'center',
  maxWidth: 300,
  height: 50,
};

export default function PrimaryButton(props: Props) {
  const {
    disabled = false,
    type = 'primary',
    title,
    style,
    children,
    ...rest
  } = props;

  const memoizedStyle = React.useMemo(() => {
    return [
      styles[type],
      style,
      disabled && styles.disabled,
    ] as TouchableOpacityProps['style'];
  }, [disabled, style, type]);

  const memoizedTitleType = React.useMemo(() => {
    switch (type) {
      case 'secondary':
        return 'secondaryBtnTitle';
      default:
        return 'primaryBtnTitle';
    }
  }, [type]);

  return (
    <TouchableOpacity disabled={disabled} style={memoizedStyle} {...rest}>
      {title ? (
        <PrimaryText
          style={[disabled && styles.disabledBtnTitle]}
          type={memoizedTitleType}
        >
          {title}
        </PrimaryText>
      ) : (
        children
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  primary: {
    ...baseStyle,
  },
  secondary: {
    ...baseStyle,
    backgroundColor: 'transparent',
  },
  disabled: {
    ...baseStyle,
    backgroundColor: 'lightgray',
    opacity: 0.5,
  },
  disabledBtnTitle: {
    color: 'white',
  },
});

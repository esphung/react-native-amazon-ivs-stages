import { StyleSheet, TextInput, type TextInputProps } from 'react-native';

interface Props extends TextInputProps {}

export default function PrimaryTextInput(props: Props) {
  return (
    <TextInput
      style={styles.textinput}
      placeholderTextColor="gray"
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  textinput: {
    height: 50,
    width: '100%',
    padding: 10,
    paddingLeft: 20,
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 10,
    color: 'white',
  },
});

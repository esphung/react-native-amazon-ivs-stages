import { StyleSheet, TouchableOpacity, View } from 'react-native';
import PrimaryText from '../../components/PrimaryText/PrimaryText.component';
import type { StageDetails } from '../../types/StageDetails';
import PrimaryImage from '../../components/PrimaryImage/PrimaryImage.component';
import type { IUser } from '../../types/IUser';

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export interface ItemProps extends StageDetails {
  disabled?: boolean;
  onPress?: () => void;
  selected?: boolean;
  currentUser?: IUser;
}

const StageListItem = ({
  disabled,
  userAttributes: { username, avatarUrl },
  onPress,
  selected = false,
  currentUser,
}: ItemProps) => (
  <TouchableOpacity
    disabled={disabled || onPress === undefined}
    style={[styles.item, selected && styles.itemSelected]}
    onPress={onPress}
  >
    <View style={styles.itemRowView}>
      <PrimaryImage
        type="circle"
        source={{
          uri: avatarUrl,
        }}
      />
      <PrimaryText>{`${capitalizeFirstLetter(
        `${currentUser?.username?.toLowerCase() === username?.toLowerCase() ? 'Your' : `${username}'s`}`
      )} Stage`}</PrimaryText>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  item: {
    // backgroundColor: 'purple',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'white',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  itemRowView: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  itemSelected: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'orange',
  },
});

export default StageListItem;

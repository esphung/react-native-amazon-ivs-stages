"use strict";

import { StyleSheet, TouchableOpacity, View } from 'react-native';
import PrimaryText from "../../components/PrimaryText/PrimaryText.component.js";
import PrimaryImage from "../../components/PrimaryImage/PrimaryImage.component.js";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
const StageListItem = ({
  disabled,
  userAttributes: {
    username,
    avatarUrl
  },
  onPress,
  selected = false,
  currentUser
}) => /*#__PURE__*/_jsx(TouchableOpacity, {
  disabled: disabled || onPress === undefined,
  style: [styles.item, selected && styles.itemSelected],
  onPress: onPress,
  children: /*#__PURE__*/_jsxs(View, {
    style: styles.itemRowView,
    children: [/*#__PURE__*/_jsx(PrimaryImage, {
      type: "circle",
      source: {
        uri: avatarUrl
      }
    }), /*#__PURE__*/_jsx(PrimaryText, {
      children: `${capitalizeFirstLetter(`${currentUser?.username?.toLowerCase() === username?.toLowerCase() ? 'Your' : `${username}'s`}`)} Stage`
    })]
  })
});
const styles = StyleSheet.create({
  item: {
    // backgroundColor: 'purple',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'white',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16
  },
  itemRowView: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12
  },
  itemSelected: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'orange'
  }
});
export default StageListItem;
//# sourceMappingURL=StageListItem.component.js.map
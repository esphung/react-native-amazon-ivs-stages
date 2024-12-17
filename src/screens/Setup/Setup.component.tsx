import * as React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import PrimaryButton from '../../components/PrimaryButton/PrimaryButton.component';
import PrimaryImage from '../../components/PrimaryImage/PrimaryImage.component';
import PrimaryText from '../../components/PrimaryText/PrimaryText.component';
import PrimaryTextInput from '../../components/PrimaryTextInput/PrimaryTextInput.component';
import PrimaryView from '../../components/PrimaryView/PrimaryView.component';
import userAvatarUrls from '../../constants/userAvatarUrls';
import type { IUser } from '../../types/IUser';

interface Props {
  onPressSignIn: ({
    username,
    avatarUrl,
  }: Pick<IUser, 'avatarUrl' | 'username'>) => void;
}

export default function Setup(props: Props) {
  const { onPressSignIn } = props;

  const [username, setUsername] = React.useState<string>('');
  const [avatarUrl, setAvatar] = React.useState<string>('');

  const renderItem = React.useCallback(
    ({ item }: { item: string }) => {
      return (
        <View style={styles.itemView}>
          <PrimaryImage
            type="circle"
            source={{ uri: item }}
            onPress={() => {
              setAvatar((prev) => (prev === item ? '' : item));
            }}
            selected={avatarUrl === item}
          />
        </View>
      );
    },
    [avatarUrl]
  );

  const memoizedNameInput = React.useMemo(() => {
    return (
      <PrimaryTextInput
        value={username}
        onChangeText={setUsername}
        placeholder="Enter your username"
        autoComplete="username-new"
        autoCorrect={false}
        autoCapitalize="none"
        clearButtonMode="always"
      />
    );
  }, [username]);

  return (
    <PrimaryView style={styles.container} scrollEnabled>
      <View style={styles.northPanel} />
      <View style={styles.centerPanel}>
        <PrimaryText type="textInputLabel" style={styles.text}>
          Introduce yourself
        </PrimaryText>
        {memoizedNameInput}
      </View>
      <View style={styles.southPanel}>
        <PrimaryText type="textInputLabel" style={styles.text}>
          Select Avatar
        </PrimaryText>
        <FlatList
          data={userAvatarUrls}
          renderItem={renderItem}
          keyExtractor={(_, index) => index.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
        <PrimaryButton
          disabled={!username || !avatarUrl}
          title="Sign In"
          onPress={() => {
            if (!avatarUrl) {
              console.error('No avatar url selected');
              return;
            }
            onPressSignIn({
              username,
              avatarUrl: avatarUrl,
            });
          }}
        />
      </View>
    </PrimaryView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  northPanel: {
    flex: 1,
  },
  centerPanel: {
    flex: 0.5,
    paddingHorizontal: 20,
  },
  southPanel: {
    flex: 0.5,
    paddingHorizontal: 20,
    paddingBottom: 12,
  },
  text: {
    paddingVertical: 12,
  },
  itemView: {
    marginHorizontal: 4,
  },
});

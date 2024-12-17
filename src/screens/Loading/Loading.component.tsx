import { ActivityIndicator } from 'react-native';
import PrimaryView from '../../components/PrimaryView/PrimaryView.component';

export default function Loading() {
  return (
    <PrimaryView title="Loading">
      <ActivityIndicator size="large" />
    </PrimaryView>
  );
}

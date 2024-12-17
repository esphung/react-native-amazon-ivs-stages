import { type FlatListProps } from 'react-native';
import type { StageDetails } from '../../types/StageDetails';
import type { StageHostDetails } from '../../types/StageHostDetails';
import type { ItemProps } from './StageListItem.component';
import type { IUser } from '../../types/IUser';
interface Props extends Omit<FlatListProps<ItemProps>, 'renderItem' | 'data'> {
    stageDetailsState: {
        success: boolean;
        stages: StageDetails[];
        loading: boolean;
        selected: StageDetails | null;
    };
    onSelectStageDetails: (stageDetails: StageDetails | null) => void;
    onPressCreateNewStage: () => void;
    onPressJoinStage: () => void;
    refreshCurrentStageDetailsList: () => void;
    stageHostDetails?: StageHostDetails;
    onDeleteStage: () => void;
    currentUser?: IUser;
}
export default function StageList(props: Props): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=StageList.component.d.ts.map
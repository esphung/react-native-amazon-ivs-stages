import type { StageDetails } from '../../types/StageDetails';
import type { IUser } from '../../types/IUser';
export interface ItemProps extends StageDetails {
    disabled?: boolean;
    onPress?: () => void;
    selected?: boolean;
    currentUser?: IUser;
}
declare const StageListItem: ({ disabled, userAttributes: { username, avatarUrl }, onPress, selected, currentUser, }: ItemProps) => import("react/jsx-runtime").JSX.Element;
export default StageListItem;
//# sourceMappingURL=StageListItem.component.d.ts.map
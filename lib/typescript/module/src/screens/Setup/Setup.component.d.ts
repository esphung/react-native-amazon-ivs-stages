import type { IUser } from '../../types/IUser';
interface Props {
    onPressSignIn: ({ username, avatarUrl, }: Pick<IUser, 'avatarUrl' | 'username'>) => void;
}
export default function Setup(props: Props): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=Setup.component.d.ts.map
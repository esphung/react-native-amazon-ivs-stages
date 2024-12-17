import { type ImageProps } from 'react-native';
interface Props extends ImageProps {
    type?: 'base' | 'circle';
    onPress?: () => void;
    selected?: boolean;
}
export default function PrimaryImage(props: Props): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=PrimaryImage.component.d.ts.map
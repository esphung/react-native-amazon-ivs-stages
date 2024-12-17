import { type TextProps } from 'react-native';
interface Props extends TextProps {
    type?: keyof typeof styles;
}
export default function PrimaryText(props: Props): import("react/jsx-runtime").JSX.Element;
declare const styles: {
    base: {
        fontSize: number;
        color: string;
    };
    header: {
        fontSize: number;
        fontWeight: "bold";
        color: string;
    };
    paragraph: {
        fontSize: number;
        color: string;
    };
    primaryBtnTitle: {
        fontSize: number;
        color: string;
        fontWeight: "bold";
    };
    secondaryBtnTitle: {
        fontSize: number;
        color: string;
    };
    textInputLabel: {
        fontSize: number;
        color: string;
        fontWeight: "bold";
    };
};
export {};
//# sourceMappingURL=PrimaryText.component.d.ts.map
export interface IModal {
    props: {
        children?: React.ReactNode | undefined;
        onClose: () => void;
    }
}
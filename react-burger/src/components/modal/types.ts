import React from "react";

export interface IModal {
        children?: React.ReactNode | undefined;
        onClose?: () => void;
}
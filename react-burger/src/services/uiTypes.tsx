import React, {FC, SyntheticEvent} from "react";
import {Button as ButtonUI, Tab as TabUI, ConstructorElement as ConstructorElementUI} from "@ya.praktikum/react-developer-burger-ui-components";

export const Button: FC<{
    type?: 'secondary' | 'primary';
    size?: 'small' | 'medium' | 'large';
    onClick?: (() => void) | ((e: SyntheticEvent) => void);
    disabled?: boolean;
    name?: string;
    htmlType?: 'button' | 'submit' | 'reset';
    className?: string;
    children: React.ReactNode;
}> = ButtonUI

export const Tab: FC<{
    active: boolean;
    value: string;
    onClick: (value: string) => void;
    children: React.ReactNode;
}> = TabUI

export const  ConstructorElement: React.FC<{
    text: string;
    thumbnail: string;
    price: number;
    type?: 'top' | 'bottom';
    isLocked?: boolean;
    extraClass?: string;
    handleClose?: () => void;
    id: string;
}> = ConstructorElementUI


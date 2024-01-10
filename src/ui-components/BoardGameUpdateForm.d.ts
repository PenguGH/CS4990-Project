/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
export declare type EscapeHatchProps = {
    [elementHierarchy: string]: Record<string, unknown>;
} | null;
export declare type VariantValues = {
    [key: string]: string;
};
export declare type Variant = {
    variantValues: VariantValues;
    overrides: EscapeHatchProps;
};
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type BoardGameUpdateFormInputValues = {
    name?: string;
    description?: string;
    quantity?: number;
    price?: number;
};
export declare type BoardGameUpdateFormValidationValues = {
    name?: ValidationFunction<string>;
    description?: ValidationFunction<string>;
    quantity?: ValidationFunction<number>;
    price?: ValidationFunction<number>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type BoardGameUpdateFormOverridesProps = {
    BoardGameUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    description?: PrimitiveOverrideProps<TextFieldProps>;
    quantity?: PrimitiveOverrideProps<TextFieldProps>;
    price?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type BoardGameUpdateFormProps = React.PropsWithChildren<{
    overrides?: BoardGameUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    boardGame?: any;
    onSubmit?: (fields: BoardGameUpdateFormInputValues) => BoardGameUpdateFormInputValues;
    onSuccess?: (fields: BoardGameUpdateFormInputValues) => void;
    onError?: (fields: BoardGameUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: BoardGameUpdateFormInputValues) => BoardGameUpdateFormInputValues;
    onValidate?: BoardGameUpdateFormValidationValues;
} & React.CSSProperties>;
export default function BoardGameUpdateForm(props: BoardGameUpdateFormProps): React.ReactElement;

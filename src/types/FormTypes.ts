import type {ReactNode} from "react";

interface IComponentHeaderImage {
    type: 'HEADER';
    format: 'IMAGE';
    value: {
        url: string;
    }
}

interface IComponentHeaderText {
    type: 'HEADER';
    format: 'TEXT';
    value: {
        text: string;
    }
}

type Header = IComponentHeaderImage | IComponentHeaderText;

interface IBody {
    type: 'BODY';
    text: string;
}

interface IFooter {
    type: 'FOOTER';
    text?: string;
}

export type ButtonType = 'URL' | 'CALL'

export interface IButtonFormState {
    id: string;
    type: ButtonType;
    text: string;
    value: string;
}

export interface IButtonUrl {
    type: 'URL';
    text: string;
    value: {
        url: string;
    }
}

export interface IButtonCall {
    type: 'CALL';
    text: string;
    value: {
        phone_number: string;
    }
}

export interface IButtons {
    type: 'BUTTONS';
    buttons: Array<IButtonUrl | IButtonCall>;
}

export interface IButtonsArray {
    id: string
    component: ReactNode
}

export interface IButtonsArrayError {
    id: string
    error: string
}

export type LanguageType = 'en_US' | 'ar_SA' | ''
export type CategoryType = 'MARKETING' | 'UTILITY' | ''

export interface IStructuredData {
    name: string;
    language: LanguageType;
    category: CategoryType;
    components: [
        IBody,
        Header?,
        IFooter?,
        IButtons?,
    ]
}

export interface IErrors {
    name?: string;
    language?: string;
    category?: string;
    body?: string;
    buttons?: Array<IButtonsArrayError>;

}

export interface IFormContext {
    formData: IFormData;
    setFormData: (formData: IFormData) => void;
    errors: IErrors;
    setErrors: (errors: IErrors) => void;
}

export interface IFormData {
    name: string;
    language: LanguageType;
    category: CategoryType;
    header?: Header;
    body: IBody;
    footer?: IFooter;
    buttons?: Array<IButtonFormState>;
}

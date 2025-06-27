import {type FC, type ReactNode, createContext, useContext, useState} from "react";
import type {IErrors, IFormContext, IFormData} from "../types/FormTypes";

const FormContext = createContext<IFormContext>({} as IFormContext)

export const FormProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [formData, setFormData] = useState<IFormData>({
        name: '',
        language: '',
        category: '',
        body: {
            type: 'BODY',
            text: ''
        }
    })
    const [errors, setErrors] = useState<IErrors>({})

    return (
        <FormContext.Provider value={{ formData, setFormData, errors, setErrors }}>
            {children}
        </FormContext.Provider>
    )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useForm = () => useContext(FormContext)

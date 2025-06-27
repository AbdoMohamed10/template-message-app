import {useTranslation} from "react-i18next";
import {useForm} from "../contexts/FormContext";
import {useState} from "react";
import {isValidName, isValidPhoneNumber, isValidUrl} from "../utils/validation";

const useValidation = (buttonId?: string) => {
    const { t } = useTranslation()
    const {errors, setErrors} = useForm()
    const [phoneCode, setPhoneCode] = useState<string>('+962')
    const [phone, setPhone] = useState<string>('')

    const handleNameValidation = (value: string) => {
        const isValid = isValidName(value)
        if (!isValid) {
            setErrors({...errors, name: t('name_validation_error')})
            return false
        } else {
            const updatedErrors = structuredClone(errors)
            if (updatedErrors?.name) {
                delete updatedErrors.name
                setErrors(updatedErrors)
            }
        }
        return true
    }

    const handleLanguageValidation = (value: string) => {
        if (!value) {
            setErrors({...errors, language: t('required_language')})
            return false
        } else {
            const updatedErrors = structuredClone(errors)
            if (updatedErrors?.language) {
                delete updatedErrors.language
                setErrors(updatedErrors)
            }
        }
        return true
    }

    const handleCategoryValidation = (value: string) => {
        if (!value) {
            setErrors({...errors, category: t('required_category')})
            return false
        } else {
            const updatedErrors = structuredClone(errors)
            if (updatedErrors?.category) {
                delete updatedErrors.category
                setErrors(updatedErrors)
            }
        }
        return true
    }

    const handleBodyValidation = (value: string) => {
        if (!value) {
            setErrors({...errors, body: t('required_body')})
            return false
        } else {
            const updatedErrors = structuredClone(errors)
            if (updatedErrors?.body) {
                delete updatedErrors.body
                setErrors(updatedErrors)
            }
        }
        return true
    }

    const handleUrlValidation = (value: string) => {
        if (buttonId) {
            const isValid = isValidUrl(value);

            const updatedErrors = structuredClone(errors)
            const currentButtonError = updatedErrors?.buttons?.filter(button => button.id === buttonId)[0]

            if (!isValid) {
                if (currentButtonError) {
                    currentButtonError.error = t('invalid_url')
                } else {
                    updatedErrors.buttons = [
                        ...(updatedErrors.buttons || []),
                        {
                            id: buttonId,
                            error: t('invalid_url')
                        }
                    ]
                }
                setErrors(updatedErrors)

                return false
            } else {
                if (currentButtonError) {
                    updatedErrors.buttons = updatedErrors?.buttons?.filter(button => button.id !== buttonId)
                    if (updatedErrors.buttons?.length === 0) {
                        delete updatedErrors.buttons
                    }
                }
                setErrors(updatedErrors)
            }

            return true
        }
    }

    const handlePhoneValidation = () => {
        if (buttonId) {
            const isValid = isValidPhoneNumber(phoneCode + phone)

            const updatedErrors = structuredClone(errors)
            const currentButtonError = updatedErrors?.buttons?.filter(button => button.id === buttonId)[0]

            if (!isValid) {
                if (currentButtonError) {
                    currentButtonError.error = t('invalid_phone')
                } else {
                    updatedErrors.buttons = [
                        ...(updatedErrors.buttons || []),
                        {
                            id: buttonId,
                            error: t('invalid_phone')
                        }
                    ]
                }
                setErrors(updatedErrors)

                return false
            } else {
                if (currentButtonError) {
                    updatedErrors.buttons = updatedErrors?.buttons?.filter(button => button.id !== buttonId)
                    if (updatedErrors.buttons?.length === 0) {
                        delete updatedErrors.buttons
                    }
                }
                setErrors(updatedErrors)
            }

            return true
        }
    }

    return {
        phone,
        phoneCode,
        setPhone,
        setPhoneCode,
        handleUrlValidation,
        handlePhoneValidation,
        handleNameValidation,
        handleLanguageValidation,
        handleCategoryValidation,
        handleBodyValidation
    }
}

export default useValidation

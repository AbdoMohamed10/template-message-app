import {useTranslation} from "react-i18next";
import {type ChangeEvent, type Dispatch, type FC, type SetStateAction, useEffect, useState} from "react";
import DeleteIcon from '../../assets/icons/delete.svg?react'
import {useForm} from "../../contexts/FormContext";
import type {ButtonType, IButtonsArray} from "../../types/FormTypes";
import ErrorMessage from "../ErrorMessage";
import {numbersOnly} from "../../utils/validation";
import useValidation from "../../hooks/useValidation";



interface ActionButtonFormProps {
    buttonId: string
    handleSetButtons: Dispatch<SetStateAction<Array<IButtonsArray>>>
}

const ActionButtonForm: FC<ActionButtonFormProps> = ({buttonId, handleSetButtons}) => {
    const { t } = useTranslation()
    const {formData, setFormData, errors} = useForm()
    const [buttonType, setButtonType] = useState<ButtonType>('URL');
    // const [phoneCode, setPhoneCode] = useState<string>('+962')
    // const [phone, setPhone] = useState<string>('')
    const {phone, phoneCode, setPhone, setPhoneCode, handleUrlValidation, handlePhoneValidation} = useValidation(buttonId)

    const handleSetButtonType = (e: ChangeEvent<HTMLSelectElement>) => {
        setButtonType(e.target.value as ButtonType)

        const updatedFormData = structuredClone(formData)
        updatedFormData.buttons!.filter(button => button.id === buttonId)[0].type = e.target.value as ButtonType
        setFormData(updatedFormData)
    }

    const handleSetButtonText = (e: ChangeEvent<HTMLInputElement>) => {
        const updatedFormData = structuredClone(formData)
        updatedFormData.buttons!.filter(button => button.id === buttonId)[0].text = e.target.value
        setFormData(updatedFormData)
    }

    const handleSetButtonValue = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>, type: 'phone' | 'url') => {
        const updatedFormData = structuredClone(formData)
        if (type === 'url') {
            updatedFormData.buttons!.filter(button => button.id === buttonId)[0].value = e.target.value
            setFormData(updatedFormData)
        } else {
            setPhone(e.target.value)
        }
    }

    const handleChangePhoneCode = () => {
        const updatedFormData = structuredClone(formData)
        updatedFormData.buttons!.filter(button => button.id === buttonId)[0].value = phoneCode + phone
        setFormData(updatedFormData)
    }

    const handleRemoveButton = () => {
        const updatedFormData = structuredClone(formData)
        updatedFormData.buttons = updatedFormData.buttons!.filter(button => button.id !== buttonId)
        setFormData(updatedFormData)
        handleSetButtons(prev => prev.filter((button) => button.id !== buttonId))
    }

    useEffect(() => {
        if (phone) {
            handleChangePhoneCode()
            handlePhoneValidation()
        }
    }, [phoneCode, phone])

    return (
        <div className="flex items-center justify-center gap-2.5 mb-5" id={buttonId}>
            <div className="grow flex flex-col rounded-lg bg-[#F7FAFC] border-1 border-[#E2E8F0] p-5">
                <div className="grow flex items-center flex-wrap gap-5 rounded-lg">
                    <div className="text-sm">
                        <div>
                            <label htmlFor={`button-type-${buttonId}`}>{t('button_type')} <span className="text-red-500">*</span></label>
                            <select
                                className="text-[#4A4A4A]"
                                id={`button-type-${buttonId}`}
                                value={formData.buttons!.filter(button => button.id === buttonId)[0]?.type}
                                onChange={handleSetButtonType}
                            >
                                <option value="URL">{t('visit_website')}</option>
                                <option value="CALL">{t('phone_number')}</option>
                            </select>
                        </div>
                    </div>
                    <div className="text-sm">
                        <label htmlFor={`button-text-${buttonId}`}>{t('button_text')} <span
                            className="text-red-500">*</span></label>
                        <input
                            id={`button-text-${buttonId}`}
                            type="text"
                            placeholder={t('button_text')}
                            value={formData.buttons!.filter(button => button.id === buttonId)[0]?.text}
                            onChange={handleSetButtonText}
                        />
                    </div>
                    <div className="grow">
                        {
                            buttonType === 'URL' ?
                                <div className="text-sm">
                                    <label htmlFor={`button-url-${buttonId}`}>{t('website_url')} <span
                                        className="text-red-500">*</span></label>
                                    <input
                                        id={`button-url-${buttonId}`}
                                        className={errors?.buttons?.some(button => button.id === buttonId) ? '!border-red-500' : ''}
                                        type="url"
                                        placeholder={t('website_url')}
                                        value={formData.buttons!.filter(button => button.id === buttonId)[0]?.value}
                                        onChange={(e) => handleSetButtonValue(e, 'url')}
                                        onBlur={(e) => handleUrlValidation(e.target.value)}
                                    />
                                </div>
                            :
                                <div className="text-sm">
                                    <label htmlFor={`button-phone-${buttonId}`}>{t('phone_number')} <span
                                        className="text-red-500">*</span></label>
                                    <div className="flex items-center gap-2.5">
                                        <select
                                            id={`button-type-${buttonId}`}
                                            className="basis-1/5"
                                            value={phoneCode}
                                            onChange={(e) => setPhoneCode(e.target.value)}
                                        >
                                            {/* we can use react select package and add images instead of this and fetch the countries from api */}
                                            <option value="+962">🇯🇴</option>
                                            <option value="+966">🇸🇦</option>
                                            <option value="+20">🇪🇬</option>
                                        </select>
                                        <input
                                            id={`button-phone-${buttonId}`}
                                            className={`grow ${errors?.buttons?.some(button => button.id === buttonId) ? '!border-red-500' : ''}`}
                                            type="text"
                                            placeholder={phoneCode === '+962' ? '07 XXXX XXXX' : phoneCode === '+966' ? '05XXXXXXXX' : '1XXXXXXXXX'}
                                            value={phone}
                                            onKeyDown={numbersOnly}
                                            onChange={(e) => handleSetButtonValue(e, 'phone')}
                                            onBlur={handlePhoneValidation}
                                        />
                                    </div>
                                </div>
                        }
                    </div>
                </div>
                {
                    errors?.buttons?.some(button => button.id === buttonId) &&
                        <ErrorMessage error={errors?.buttons?.filter(button => button.id === buttonId)[0].error} />
                }
            </div>
            <button className="bg-transparent border-none" onClick={handleRemoveButton}>
                <DeleteIcon />
            </button>
        </div>
    )
}

export default ActionButtonForm

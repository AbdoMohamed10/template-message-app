import Card from "../Card";
import {useTranslation} from "react-i18next";
import {type ChangeEvent, useRef, useState} from "react";
import TextIcon from '../../assets/icons/text.svg?react'
import ImageIcon from '../../assets/icons/image.svg?react'
import UploadIcon from '../../assets/icons/upload.svg?react'
import {useForm} from "../../contexts/FormContext";

type HeaderFormat = null | 'TEXT' | 'IMAGE'

const HeaderSection = () => {
    const { t } = useTranslation()
    const imageInputRef = useRef<HTMLInputElement>(null)
    const [headerFormat, setHeaderFormat] = useState<HeaderFormat>(null)
    const {formData, setFormData} = useForm()

    const handleSetHeaderFormat = (value: HeaderFormat) => {
        setHeaderFormat(value)

        let updatedFormData = structuredClone(formData)
        if (!value) {
            delete updatedFormData.header
        } else if (value === 'TEXT') {
            updatedFormData = {
                ...updatedFormData,
                header: {
                    type: 'HEADER',
                    format: 'TEXT',
                    value: {
                        text: ''
                    }
                }
            }
        } else {
            updatedFormData = {
                ...updatedFormData,
                header: {
                    type: 'HEADER',
                    format: 'IMAGE',
                    value: {
                        url: ''
                    }
                }
            }
        }
        setFormData(updatedFormData)
    }

    const handleSetHeaderValue = (value: string | ChangeEvent<HTMLInputElement>) => {
        let updatedFormData = structuredClone(formData)

        if (headerFormat === 'TEXT') {
            if (typeof value !== 'string') {
                console.error('Expected string value for TEXT format');
                return;
            }

            updatedFormData = {
                ...updatedFormData,
                header: {
                    type: 'HEADER',
                    format: 'TEXT',
                    value: {
                        text: value
                    }
                }
            }
        } else {
            if (typeof value !== 'string' && 'target' in value && value.target.files && value.target.files[0]) {
                const file = value.target.files[0]
                const imageUrl = URL.createObjectURL(file)
                updatedFormData = {
                    ...updatedFormData,
                    header: {
                        type: 'HEADER',
                        format: 'IMAGE',
                        value: {
                            url: imageUrl
                        }
                    }
                }
            }
        }

        setFormData(updatedFormData)
    }

    const handleImageBrowse = () => {
        if (imageInputRef.current) {
            imageInputRef.current.click()
        }
    }

    return (
        <Card title={t('header')} description={t('header_description')}>
            <div className="flex justify-center flex-wrap w-fit bg-[#EDF2F7] rounded-sm p-1 text-sm mb-5">
                <button
                    className={`rounded-sm py-1 px-8 ${!headerFormat ? 'bg-white': 'bg-transparent'}`}
                    onClick={() => handleSetHeaderFormat(null)}
                >
                    {t('none')}
                </button>
                <button
                    className={`rounded-sm py-1 px-8 flex items-center gap-2 ${headerFormat === 'TEXT' ? 'bg-white': 'bg-transparent'}`}
                    onClick={() => handleSetHeaderFormat('TEXT')}
                >
                    <TextIcon />
                    {t('text')}
                </button>
                <button
                    className={`rounded-sm py-1 px-8 flex items-center gap-2 ${headerFormat === 'IMAGE' ? 'bg-white': 'bg-transparent'}`}
                    onClick={() => handleSetHeaderFormat('IMAGE')}
                >
                    <ImageIcon />
                    {t('image')}
                </button>
            </div>
            {
                formData.header?.format === 'TEXT' ? (
                    <div className="text-sm">
                        <label htmlFor="header-text">{t('text')} <span
                            className="text-red-500">*</span></label>
                        <input
                            id="header-text"
                            type="text"
                            placeholder={t('enter_text')}
                            value={formData.header.value.text}
                            onChange={(e) => handleSetHeaderValue(e.target.value)}
                        />
                    </div>
                ) : formData.header?.format === 'IMAGE' ? (
                    <div className="relative flex flex-col items-center gap-4.5 border-1 border-dashed border-gray-300 rounded-lg py-10.5">
                        <input type="file" className="opacity-0 h-full absolute top-0 cursor-pointer" ref={imageInputRef} accept="image/jpeg, image/jpg, image/png" onChange={handleSetHeaderValue} />
                        <UploadIcon />
                        <div className="flex flex-col items-center">
                            <div className="flex text-[0.625rem] mb-[9px]">
                                <p>{t('drag_and_drop')}</p>
                                <button className="bg-transparent text-[#9B7CB7] font-bold" onClick={handleImageBrowse}>&nbsp;{t('browse')}</button>
                            </div>
                            <p className="text-gray-500 text-[0.565rem]">{t('allowed_types')}</p>
                        </div>
                        <button className="py-[9px] px-3 border-1 text-[0.470rem] bg-transparent border-[#9B7CB7] text-[#9B7CB7] rounded-sm uppercase" onClick={handleImageBrowse}>{t('select_file')}</button>
                    </div>
                ) : <></>
            }
        </Card>
    )
}

export default HeaderSection

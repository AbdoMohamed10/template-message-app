import Card from "../Card";
import {useTranslation} from "react-i18next";
import {useForm} from "../../contexts/FormContext";
import {type ChangeEvent} from "react";
import {type LanguageType} from "../../types/FormTypes";
import ErrorMessage from "../ErrorMessage";
import useValidation from "../../hooks/useValidation";

const TemplateDetails = () => {
    const { t } = useTranslation()
    const {formData, setFormData, errors} = useForm()
    const {handleNameValidation, handleLanguageValidation} = useValidation()

    const handleChangeLanguage = (e: ChangeEvent<HTMLSelectElement>) => {
        setFormData({...formData, language: e.target.value as LanguageType})
    }

    return (
        <Card title={t('template_details')} description={t('template_details_description')}>
            <div className="flex flex-col gap-y-5">
                <div>
                    <label htmlFor="template-name">{t('template_name')} <span className="text-red-500">*</span></label>
                    <input
                        id="template-name"
                        className={errors?.name ? '!border-red-500' : ''}
                        type="text"
                        placeholder={t('template_name')}
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        onBlur={(e) => handleNameValidation(e.target.value)}
                    />
                    {
                        errors?.name &&
                            <ErrorMessage error={errors?.name} />
                    }
                </div>
                <div>
                    <label htmlFor="template-language">{t('language')} <span className="text-red-500">*</span></label>
                    <select
                        className={`${!formData.language ? 'text-[#A3A3A3]' : ''} ${errors.language ? '!border-red-500' : ''}`}
                        id="template-language"
                        value={formData.language}
                        onChange={handleChangeLanguage}
                        onBlur={(e) => handleLanguageValidation(e.target.value)}
                    >
                        <option value="" disabled>{t('select_language')}</option>
                        <option value="en_US">{t('english')}</option>
                        <option value="ar_SA">{t('arabic')}</option>
                    </select>
                    {
                        errors?.language &&
                        <ErrorMessage error={errors?.language} />
                    }
                </div>
            </div>
        </Card>
    )
}

export default TemplateDetails

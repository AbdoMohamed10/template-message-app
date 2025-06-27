import Card from "../Card";
import {useTranslation} from "react-i18next";
import type {ChangeEvent} from "react";
import {useForm} from "../../contexts/FormContext";
import ErrorMessage from "../ErrorMessage";
import useValidation from "../../hooks/useValidation";

const BodySection = () => {
    const { t } = useTranslation()
    const {formData, setFormData, errors} = useForm()
    const {handleBodyValidation} = useValidation()

    const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setFormData({...formData, body: {...formData.body, text: e.target.value}})
    }

    return (
        <Card title={t('body')} description={t('body_description')}>
            <textarea
                rows={4}
                className={`resize-none ${errors?.body ? '!border-red-500' : ''}`}
                placeholder={t('template_message')}
                value={formData.body.text}
                onChange={handleTextChange}
                onBlur={(e) => handleBodyValidation(e.target.value)}
            ></textarea>
            {
                errors?.body &&
                <ErrorMessage error={errors?.body} />
            }
        </Card>
    )
}

export default BodySection

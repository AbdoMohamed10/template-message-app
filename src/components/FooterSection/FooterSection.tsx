import {useTranslation} from "react-i18next";
import Card from "../Card";
import {useForm} from "../../contexts/FormContext";

const FooterSection = () => {
    const { t } = useTranslation()
    const {formData, setFormData} = useForm()

    const handleSetFooter = (value: string) => {
        setFormData({...formData, footer: {type: 'FOOTER', text: value}})
    }

    return (
        <Card title={t('footer')} description={t('footer_description')}>
            <input type="text" placeholder={t('enter_text')} value={formData.footer?.text ?? ''} onChange={(e) => handleSetFooter(e.target.value)} />
        </Card>
    )
}

export default FooterSection

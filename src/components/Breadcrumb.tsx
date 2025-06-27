import {useTranslation} from "react-i18next";
import BreadcrumbIcon from '../assets/icons/breadcrumb.svg?react';

const Breadcrumb = () => {
    const { t, i18n } = useTranslation()

    return (
        <div className="pt-5 pb-7.5 flex items-center flex-wrap gap-4 text-sm">
            <h2 className="text-[#797979]">{t('templates')} </h2>
            <div className={i18n.language === 'ar' ? 'rotate-180' : ''}>
                <BreadcrumbIcon />
            </div>
            <h2 className="text-[#4A4A4A]">{t('new_template_message')}</h2>
        </div>
    )
}

export default Breadcrumb

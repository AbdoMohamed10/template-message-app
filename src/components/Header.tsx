import {useTranslation} from 'react-i18next'
import AddIcon from '../assets/icons/add.svg?react'
import SaveIcon from '../assets/icons/save.svg?react'
import useSave from "../hooks/useSave";

const Header = () => {
    const { t, i18n } = useTranslation()
    const {handleSave} = useSave()

    const handleChangeLanguage = () => {
        if (i18n.language === 'en') {
            i18n.changeLanguage('ar')
            document.dir = 'rtl'
            document.body.dir = 'rtl'
        } else {
            i18n.changeLanguage('en')
            document.dir = 'ltr'
            document.body.dir = 'ltr'
        }
        localStorage.setItem('language', i18n.language)
    }

    return (
        <header className="flex items-center justify-between flex-wrap gap-y-2 py-[6px] bg-white">
            <div className="flex items-center gap-2">
                <AddIcon />
                <h1 className="text-xl">{t('new_template_message')}</h1>
            </div>
            <div className="flex items-center gap-4">
                <button className="bg-transparent border-none" onClick={handleChangeLanguage}>{i18n.language === 'ar' ? 'English' : 'عربي'}</button>
                <button className="px-4 py-2 rounded flex items-center gap-2 bg-[#9B7CB7] text-white" onClick={handleSave}>
                    <SaveIcon />
                    <span>{t('save')}</span>
                </button>
            </div>
        </header>
    )
}

export default Header

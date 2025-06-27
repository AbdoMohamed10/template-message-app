import './App.css'
import Header from './components/Header.tsx'
import Breadcrumb from './components/Breadcrumb.tsx'
import {useTranslation} from 'react-i18next'
import TemplateDetails from './components/TemplateDetails/TemplateDetails'
import CategorySection from './components/CategorySection/CategorySection'
import HeaderSection from './components/HeaderSection/HeaderSection'
import BodySection from './components/BodySection/BodySection'
import FooterSection from './components/FooterSection/FooterSection'
import ButtonsSection from './components/ButtonsSection/ButtonsSection'
import Preview from "./components/Preview";
import useSave from "./hooks/useSave";

const App = () => {
    const { t } = useTranslation()
    const {handleSave} = useSave()

    return (
        <div className="px-5 bg-[#F8F9FA]">
            <Header />
            <Breadcrumb />
            <div className="grid grid-cols-4 gap-10 pb-10">
                <div className="col-span-full xl:col-span-3">
                    <TemplateDetails />
                    <CategorySection />
                    <HeaderSection />
                    <BodySection />
                    <FooterSection />
                    <ButtonsSection />
                    <button className="px-7 py-2 rounded bg-[#9B7CB7] text-white" onClick={handleSave}><span>{t('save')}</span></button>
                </div>
                <div className="col-span-full xl:col-span-1 flex justify-center">
                    <Preview />
                </div>
            </div>
        </div>
    )
}

export default App

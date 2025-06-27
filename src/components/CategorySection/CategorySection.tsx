import {useTranslation} from 'react-i18next'
import CategoryOption from './CategoryOption'
import Card from '../Card'
import MarketingIcon from '../../assets/icons/marketing.svg?react'
import BillIcon from '../../assets/icons/bill.svg?react'
import {useForm} from "../../contexts/FormContext";
import {type CategoryType} from "../../types/FormTypes";
import ErrorMessage from "../ErrorMessage";

const CategorySection = () => {
    const { t } = useTranslation()
    const {formData, setFormData, errors} = useForm()

    const handleSelectCategory = (category: CategoryType) => {
        setFormData({...formData, category: category})
    }

    return (
        <Card title={t('category')} description={t('category_description')}>
            <div className="flex flex-col gap-3">
                <CategoryOption
                    title={t('marketing')}
                    value={'MARKETING'}
                    description={t('marketing_description')}
                    icon={<MarketingIcon />}
                    handleClick={handleSelectCategory}
                    isSelected={formData.category === 'MARKETING'}
                />
                <CategoryOption
                    title={t('utility')}
                    value={'UTILITY'}
                    description={t('utility_description')}
                    icon={<BillIcon />}
                    bgColorClass={'bg-[#EDF2F7]'}
                    handleClick={handleSelectCategory}
                    isSelected={formData.category === 'UTILITY'}
                />
                {
                    errors?.category &&
                    <ErrorMessage error={errors?.category} />
                }
            </div>
        </Card>
    )
}

export default CategorySection

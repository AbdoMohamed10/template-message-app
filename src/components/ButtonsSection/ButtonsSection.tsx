import {useState} from "react"
import Card from "../Card"
import {useTranslation} from "react-i18next"
import CallToActionsIcon from '../../assets/icons/callToActions.svg?react'
import AddIcon from '../../assets/icons/add.svg?react'
import ActionButtonForm from "./ActionButtonForm";
import {nanoid} from "nanoid";
import {useForm} from "../../contexts/FormContext";
import {type IButtonsArray} from "../../types/FormTypes";

const ButtonsSection = () => {
    const { t } = useTranslation()
    const [buttons, setButtons] = useState<IButtonsArray[]>([])
    const {formData, setFormData} = useForm()

    const handleSetButtonsToNone = () => {
        const updatedFormData = structuredClone(formData)
        delete updatedFormData.buttons
        setFormData(updatedFormData)
    }

    const handleCallToAction = () => {
        const id = nanoid()
        const initialButton = {
            id,
            component: <ActionButtonForm buttonId={id} handleSetButtons={setButtons} />,
        }

        setFormData({
            ...formData,
            buttons: [
                {
                    id,
                    type: 'URL',
                    text: '',
                    value: ''
                }
            ]
        })

        setButtons([initialButton])
    }

    const handleAddButton = () => {
        const id = nanoid()
        const buttonObj = {
            id,
            component: <ActionButtonForm buttonId={id} handleSetButtons={setButtons} />,
        }

        setFormData({
            ...formData,
            buttons: [
                ...(formData.buttons || []),
                {
                    id,
                    type: 'URL',
                    text: '',
                    value: ''
                }
            ]
        })

        setButtons(prev => [...prev, buttonObj])
    }

    return (
        <Card title={t('buttons')} description={t('buttons_description')}>
            <div className="flex items-center flex-wrap gap-3 mb-5">
                <div className="flex justify-center flex-wrap w-fit bg-[#EDF2F7] rounded-sm p-1 text-sm">
                    <button
                        className={`rounded-sm py-1 px-8 ${!formData.buttons?.length ? 'bg-white': 'bg-transparent'}`}
                        onClick={handleSetButtonsToNone}
                    >
                        {t('none')}
                    </button>
                    <button
                        className={`rounded-sm py-1 px-8 flex items-center gap-2 ${formData.buttons?.length ? 'bg-white': 'bg-transparent'}`}
                        onClick={handleCallToAction}
                    >
                        <CallToActionsIcon />
                        {t('call_to_actions')}
                    </button>
                </div>
                {
                    formData.buttons?.length ?
                        <button className="bg-transparent" onClick={handleAddButton}>
                            <AddIcon />
                        </button>
                    : <></>
                }
            </div>
            {
                formData.buttons?.length ? (
                    <>
                        {
                            buttons.map(button => (
                                <div key={button.id}>{button.component}</div>
                            ))
                        }
                    </>
                ) : <></>
            }
        </Card>
    )
}

export default ButtonsSection

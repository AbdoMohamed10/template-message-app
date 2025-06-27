import {useTranslation} from "react-i18next";
import {useForm} from "../contexts/FormContext";
import useValidation from "./useValidation";
import type {IButtonCall, IButtonUrl, IStructuredData} from "../types/FormTypes";
import axios from "axios";
import Swal from "sweetalert2";

const useSave = () => {
    const { t } = useTranslation()
    const {formData, setFormData, errors} = useForm()
    const {handleNameValidation, handleLanguageValidation, handleBodyValidation, handleCategoryValidation} = useValidation()

    const handleFormattingData = () => {
        const structuredButtons: Array<IButtonUrl | IButtonCall> | undefined = formData.buttons?.map(button => {
            if (button.type === 'URL') {
                return {
                    type: 'URL',
                    text: button.text,
                    value: { url: button.value }
                }
            } else {
                return {
                    type: 'CALL',
                    text: button.text,
                    value: { phone_number: button.value }
                }
            }
        })

        const formattedData: IStructuredData = {
            name: formData.name,
            language: formData.language,
            category: formData.category,
            components: [
                formData.body,
            ]
        }

        if (formData.header) {
            formattedData.components.push(formData.header)
        }

        if (formData.footer) {
            formattedData.components.push(formData.footer)
        }

        if (structuredButtons) {
            formattedData.components.push({
                type: 'BUTTONS',
                buttons: structuredButtons
            })
        }
        return formattedData
    }

    const handleSave = async () => {
        if (
            !handleNameValidation(formData.name) ||
            !handleLanguageValidation(formData.language) ||
            !handleCategoryValidation(formData.category) ||
            !handleBodyValidation(formData.body.text) ||
            Object.keys(errors).length > 0
        ) {
            return
        }

        const formattedData = handleFormattingData()

        try {
            await axios.post(`http://localhost:3030/messages`, formattedData)
            await Swal.fire({
                title: t('saved_successfully'),
                icon: "success",
                confirmButtonText: t('ok')
            })

            setFormData({
                name: '',
                language: '',
                category: '',
                body: {
                    type: 'BODY',
                    text: ''
                }
            })
        } catch (err) {
            console.log(err)
        }
    }

    return {handleSave}
}

export default useSave

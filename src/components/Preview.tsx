import {useTranslation} from "react-i18next";
import MarketIcon from '../assets/icons/market.svg?react'
import MessageHeadingIcon from '../assets/icons/messageHeading.svg?react'
import LinkIcon from '../assets/icons/link.svg?react'
import CallIcon from '../assets/icons/call.svg?react'
import {useForm} from "../contexts/FormContext";
import type {IButtonFormState} from "../types/FormTypes";
import {isValidPhoneNumber, isValidUrl} from "../utils/validation";

const Preview = () => {
    const { t } = useTranslation()
    const {formData} = useForm()

    const currenTime = () => {
        const date = new Date()
        let hours = date.getHours();
        const minutes = date.getMinutes();
        const ampm = hours >= 12 ? t('pm') : t('am');

        hours = hours % 12;
        hours = hours ? hours : 12;
        const paddedMinutes = minutes.toString().padStart(2, '0');

        return `${hours}:${paddedMinutes} ${ampm}`;
    }

    const handleButtonClick = (button: IButtonFormState) => {
        if (button.type === 'URL' && isValidUrl(button.value)) {
            window.open(button.value, '_blank')
        } else if (button.type === 'CALL' && isValidPhoneNumber(button.value)) {
            window.location.href = `tel:${button.value}`
        }
    }

    return (
        <div className="flex flex-col items-center xl:fixed">
            <h3 className="my-2.5">{t('preview')}</h3>
            <div
                className="rounded-[2.5rem] bg-white border-[7px] border-white shadow-[1px_2px_20px_0px_rgba(0,_0,_0,_0.2)] flex flex-col xl:min-w-[360px] xl:max-w-[360px] min-w-full aspect-[8/16]">
                <div className="bg-[#00A884] min-h-[88px] h-[88px] flex items-center gap-2.5 rounded-t-[2.063rem] px-6">
                    <div className="w-10 aspect-square rounded-full bg-[#008069] flex items-center justify-center">
                        <MarketIcon/>
                    </div>
                    <div className="w-[128px] h-2 rounded-lg bg-white"></div>
                </div>
                <div className="relative h-[618px] max-h-[618px] bg-[#EAE6DF] rounded-b-[2.063rem]">
                    <div
                        className="absolute left-[-13px] top-[35px] h-7.5 w-1.5 rounded-tl-[6px] rounded-bl-[6px] bg-white"></div>
                    <div
                        className="absolute left-[-13px] top-[75px] h-7.5 w-1.5 rounded-tl-[6px] rounded-bl-[6px] bg-white"></div>
                    <div
                        className="absolute right-[-13px] top-[25px] h-15 w-1.5 rounded-tr-[6px] rounded-br-[6px] bg-white"></div>
                    <div className="flex flex-col justify-between h-full max-h-full">
                        <div className="overflow-y-auto">
                            <div
                                className="relative m-4.5 bg-white min-h-[115px] min-w-4/5 w-4/5 max-w-4/5 rounded-b-[12px] rounded-tr-[12px]">
                                <div className="absolute top-0 left-[-6px]">
                                    <MessageHeadingIcon/>
                                </div>
                                <div className="min-h-[115px]">
                                    <div className={`flex flex-col justify-between gap-3 p-2.5 ${formData.buttons ? '' : 'min-h-[115px]'}`}>
                                        {/* Header image or text if exits */}
                                        {
                                            formData.header ?
                                                formData.header.format === 'TEXT' ?
                                                    formData.header.value.text &&
                                                        <div className="text-[#4A4A4A] font-bold">{formData.header.value.text}</div>
                                                    :
                                                    formData.header.value.url &&
                                                        <img src={formData.header.value.url} alt={t('header')} className="w-full aspect-square" />
                                            : <></>
                                        }
                                        {/* body */}
                                        <div className="text-sm whitespace-pre-wrap text-[#4A4A4A]">{formData.body.text}</div>
                                        {/* footer */}
                                        <div className="flex justify-between items-center flex-wrap text-[#666666] text-xs">
                                            {/* footer text if exists */}
                                            <div className="flex-1">{formData.footer?.text}</div>
                                            <span>{currenTime()}</span>
                                        </div>
                                    </div>
                                    {/*  if buttons exists */}
                                    {
                                        formData.buttons ?
                                            <div className="pb-2.5">
                                                <hr className="border-[#E2E8F0]"/>
                                                {
                                                    formData.buttons.map((button, index) => (
                                                        <div key={button.id} className="mx-2.5">
                                                            <button
                                                                className={`bg-transparent ${index !== 0 ? 'border-t-1' : ''} border-t-[#E2E8F0] text-[#00A5F4] text-sm flex justify-center items-center gap-2 w-full py-[11.5px]`}
                                                                onClick={() => handleButtonClick(button)}
                                                            >
                                                                {
                                                                    button.type === 'URL' ?
                                                                        <div className="flex-shrink-0">
                                                                            <LinkIcon />
                                                                        </div>
                                                                    :
                                                                        <div className="flex-shrink-0">
                                                                            <CallIcon />
                                                                        </div>
                                                                }
                                                                {button.text}
                                                            </button>
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                        : <></>
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="h-[46px] min-h-[46px] rounded-[46px] bg-white m-2"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Preview

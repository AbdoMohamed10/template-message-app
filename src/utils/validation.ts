import type {KeyboardEvent} from "react";

export const isValidName = (name: string) => {
    return !(name.length < 3 || name.length > 50);
}

export const isValidUrl = (url: string) => {
    const pattern = /^https?:\/\/(?=.*\.[^\s/]{2,})[^\s/]+\.[^\s/]+(?::\d+)?(?:\/[^\s?#]*)?(?:\?[^\s#]*)?(?:#\S*)?$/;
    return pattern.test(url);
}

export const isValidPhoneNumber = (phone: string) => {
    const jordanRegex = /^(?:\+962|0)?7[7-9]\d{7}$/;
    const saudiRegex = /^(?:\+966|0)?5\d{8}$/;
    const egyptRegex = /^(?:\+20|0)?1[0125]\d{8}$/;

    return (jordanRegex.test(phone)) || (saudiRegex.test(phone)) || (egyptRegex.test(phone));
}

export const numbersOnly = (e: KeyboardEvent<HTMLInputElement>) => {
    const { key } = e;
    const isNumber = /^[0-9]$/.test(key);
    const isDot = key === '.';
    const isControlKey = ['Backspace', 'ArrowLeft', 'ArrowRight', 'Tab'].includes(key);

    if (!isNumber && !isDot && !isControlKey) {
        e.preventDefault();
    }
}

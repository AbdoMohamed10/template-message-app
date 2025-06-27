import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './i18n.ts'
import './index.css'
import App from './App.tsx'
import {FormProvider} from "./contexts/FormContext";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <FormProvider>
            <App />
        </FormProvider>
    </StrictMode>,
)

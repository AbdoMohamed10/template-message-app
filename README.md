# Template Message App

A modern React application for creating and managing WhatsApp message templates with support for multiple languages (English and Arabic) and various message components.

## 🚀 Technologies Used

### Core Technologies

-   **React 19.1.0** - Modern React with latest features
-   **TypeScript 5.8.3** - Type-safe JavaScript development
-   **Vite 6.0.0** - Fast build tool and development server

### UI & Styling

-   **Tailwind CSS 4.1.10** - Utility-first CSS framework
-   **Custom Fonts** - DM Sans and Plus Jakarta Sans for typography

### State Management & Data

-   **React Context API** - For global state management
-   **JSON Server** - Mock REST API for development
-   **Axios** - HTTP client for API requests

### Internationalization

-   **i18next** - Internationalization framework
-   **react-i18next** - React bindings for i18next
-   **Support for English (en) and Arabic (ar)**

### Additional Libraries

-   **nanoid** - Unique ID generation
-   **SweetAlert2** - Beautiful alert dialogs
-   **vite-plugin-svgr** - SVG import support

## 📋 Prerequisites

Before running this project, make sure you have the following installed:

-   **Node.js** (version 18 or higher)
-   **npm** or **yarn** package manager

## 🛠️ Installation & Setup

1. **Clone the repository**

    ```bash
    git clone <repository-url>
    cd template-message-app
    ```

2. **Install dependencies**

    ```bash
    npm install
    ```

3. **Start the JSON Server** (Mock API)

    ```bash
    npx json-server --watch db.json --port 3030
    ```

4. **Start the development server**

    ```bash
    npm run dev
    ```

5. **Open your browser**
   Navigate to `http://localhost:5173` to view the application

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── BodySection/     # Message body component
│   ├── ButtonsSection/  # Action buttons component
│   ├── CategorySection/ # Message category selection
│   ├── FooterSection/   # Message footer component
│   ├── HeaderSection/   # Message header component
│   ├── TemplateDetails/ # Template name and language
│   └── Preview/         # Live message preview
├── contexts/            # React Context providers
├── hooks/               # Custom React hooks
├── lang/                # Internationalization files
├── types/               # TypeScript type definitions
├── utils/               # Utility functions
└── assets/              # Static assets (fonts, icons)
```

## 🎯 Features

### Message Template Components

-   **Header Section**: Text or image headers
-   **Body Section**: Main message content
-   **Footer Section**: Optional footer text
-   **Buttons Section**: URL and Phone Number buttons
-   **Category Selection**: Marketing or Utility categories

### Language Support

-   **English (en)**: Default language
-   **Arabic (ar)**: Right-to-left (RTL) support
-   **Language persistence**: Remembers user's language preference

### Form Validation

-   Real-time validation for all form fields
-   Error handling and user feedback
-   Required field validation

### Live Preview

-   Real-time preview of message templates
-   Responsive design for mobile and desktop
-   Visual representation of all message components

## 🔧 Available Scripts

-   `npm run dev` - Start development server
-   `npm run build` - Build for production
-   `npm run preview` - Preview production build
-   `npm run lint` - Run ESLint for code quality

## 📊 API Endpoints

The application uses JSON Server as a mock API with the following endpoints:

-   `POST /messages` - Create a new message template

## 🎨 Design System

### Colors

-   Background: `#F8F9FA` (Light Gray)
-   Text: Various shades of gray and black

### Typography

-   **DM Sans**: Primary font family mostly for heading tags
-   **Plus Jakarta Sans**: Secondary font family for paragraphs and other tags
-   Responsive font sizes and weights

### Layout

-   Grid-based responsive layout with using flex box too in some components
-   Mobile-first design approach
-   Clean and modern UI components

## 🌐 Internationalization

The app supports multiple languages through i18next:

-   **English**: Default language with left-to-right layout
-   **Arabic**: Right-to-left layout with proper text direction
-   **Language switching**: Toggle between languages with persistence

## 🔒 Data Persistence

-   **Local Storage**: Language preferences
-   **JSON Server**: Message templates
-   **Session Management**: Form state persistence

**Note**: Make sure to keep the JSON Server running on port 3030 while developing, as the application depends on it for data persistence and API functionality.

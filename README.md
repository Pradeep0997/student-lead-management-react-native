# 🎓 Student Lead Management App (Mini CRM)

A React Native mobile application designed to manage student leads efficiently. This app allows users to create, view, search, and delete student lead details with a clean and responsive UI.

## 🚀 Features

*   **Lead Management:** Add, view, and delete student leads.
*   **Validation:** Strict validation for names, emails, and phone numbers (blocks invalid formats like `0000000000`).
*   **Persistent Storage:** Data is saved locally using `AsyncStorage`, so it remains available after restarting the app.
*   **Dynamic UI:**
    *   Tailwind-inspired card styling.
    *   Auto-generated avatars based on student names.
    *   Custom Modal Dropdown for course selection.
    *   Keyboard avoidance for smooth form entry.
*   **Navigation:** Stack navigation between List, Add, and Detail screens.

## 🛠 Tech Stack

*   **Framework:** React Native (Expo)
*   **Language:** JavaScript (ES6+)
*   **Navigation:** React Navigation (Native Stack)
*   **Storage:** @react-native-async-storage/async-storage
*   **Icons:** Expo Vector Icons (Ionicons)
*   **Components:** Functional Components & Hooks (`useState`, `useEffect`)

## 📱 Screenshots

| Home Screen | Add Lead (Form) | Lead Details |
|:---:|:---:|:---:|
| *(Add screenshot here)* | *(Add screenshot here)* | *(Add screenshot here)* |

## 📦 Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/YOUR_USERNAME/StudentCRM.git
    cd StudentCRM
    ```

2.  **Install Dependencies:**
    ```bash
    npm install
    ```

3.  **Run the App:**
    ```bash
    npx expo start
    ```

4.  **View on Device:**
    *   Scan the QR code using the **Expo Go** app (Android/iOS).
    *   Or press `a` to run on Android Emulator.

## 📂 Project Structure

```text
StudentCRM/
├── App.js                  # Main Entry & Navigation
├── src/
│   ├── components/
│   │   └── LeadCard.js     # Reusable List Item Component
│   ├── screens/
│   │   ├── HomeScreen.js   # Main Dashboard
│   │   ├── AddLeadScreen.js # Form with Validation
│   │   └── LeadDetailsScreen.js # Detailed View
│   └── theme/
│       └── colors.js       # Color Palette

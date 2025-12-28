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

  ## 🧭 App Screens Overview

🔹 **Lead List Screen**

      Displays all student leads
      
      Shows message when no leads are available
      
      Tap any lead to view full details
      
      Delete option available

🔹 **Add Lead Screen**

      Input fields:
      
      Name (required)
      
      Email or Phone (at least one required)
      
      Course / Interested Program (required)
      
      Notes (optional)
      
      Validates form before submission

🔹 **Lead Details Screen**

    Shows complete student information

    Delete button to remove lead  

---

## 📱 Screenshots

| Home Screen | Add Lead (Form) | Lead Details |
|:---:|:---:|:---:|
| ![WhatsApp Image 2025-12-28 at 12 17 40 PM](https://github.com/user-attachments/assets/43cb8a94-79cd-4e34-829b-f1e8e1b3a388)
 |  ![WhatsApp Image 2025-12-28 at 12 17 41 PM](https://github.com/user-attachments/assets/255b51dc-3e94-4153-947e-99feb8e14609)
| ![WhatsApp Image 2025-12-28 at 12 17 41 PM (1)](https://github.com/user-attachments/assets/787e7355-c246-40da-93ee-168faaa2bc40)
 |

**Delete Lead**
![WhatsApp Image 2025-12-28 at 12 17 41 PM (2)](https://github.com/user-attachments/assets/ba58ab45-f54d-4c95-aeee-513f45fd6a81)




![WhatsApp Image 2025-12-28 at 12 17 42 PM](https://github.com/user-attachments/assets/292ac94d-6dd3-4caa-8d5d-45eefc71f861)


---
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

```

--- 

##🙌 **Conclusion**

This project demonstrates:

React Native fundamentals

Hooks-based state management

Navigation handling

List rendering with FlatList

Form validation logic

Clean project structure and readable code


# Inventory Management System

This is a simple inventory management system built with Next.js, Firebase Firestore, and Material-UI. The system allows users to add, update, and delete inventory items, displaying the current inventory in a user-friendly interface.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Firebase Setup](#firebase-setup)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Add Items:** Add new items to the inventory.
- **Update Quantity:** Automatically update the quantity of an existing item.
- **Delete Items:** Remove items from the inventory when their quantity is zero.
- **Real-Time Display:** View the current inventory in real-time.
- **Responsive UI:** User interface built with Material-UI and styled for desktop and mobile devices.

## Installation

Follow these steps to set up the project locally:

1. **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/inventory-management-system.git
    cd inventory-management-system
    ```

2. **Install dependencies:**

    Make sure you have Node.js and npm installed. Then, install the necessary dependencies:

    ```bash
    npm install
    ```

3. **Set up Firebase:**

    - Create a Firebase project in the [Firebase Console](https://console.firebase.google.com/).
    - Add a web app to your Firebase project and copy the Firebase configuration.
    - Replace the Firebase configuration in `firebase.js` with your project's configuration.

4. **Run the development server:**

    ```bash
    npm run dev
    ```

    The application will be available at `http://localhost:3000`.

## Usage

- **Add Items:** Click on the "Add New Item" button to open the modal, enter the item name, and click "Add."
- **Remove Items:** Click the "Remove" button next to an item to decrease its quantity. When the quantity reaches zero, the item is removed from the inventory.

## Project Structure

```plaintext
.
├── public          # Public assets
├── src
│   ├── pages
│   │   └── index.js  # Main page and inventory logic
│   ├── components
│   │   └── InventoryItem.js # Component for displaying individual inventory items
│   ├── styles
│   │   └── globals.css  # Global styles
│   └── firebase.js  # Firebase configuration and initialization
├── README.md       # This file
└── package.json    # Project dependencies and scripts


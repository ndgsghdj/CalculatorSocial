# CalculatorSocial

CalculatorSocial is a unique social media application that combines the functionality of a traditional social platform with a built-in notepad calculator. Users can create posts with content that includes real-time mathematical calculations. The calculated results appear inline, allowing users to showcase their creativity, solve problems, and share ideas in a whole new way.

## Features

- **User Profiles**: Each user has a personal profile displaying their posts.
- **Notepad Calculator**: Post content that includes mathematical expressions with inline calculation results.
- **Social Feed**: View a feed of posts from other users, with optimized loading for high volumes.
- **Firebase Integration**: Utilizes Firebase Firestore for post storage and retrieval.
- **Real-Time Calculation**: Posts display calculated results on the right side of each line, updated as content is typed.

## Tech Stack

- **Frontend**: React with MUI Material for modern UI components
- **Backend**: Firebase Firestore for real-time database functionality
- **Utilities**: TypeScript for type-safe code, Math.js for mathematical expression parsing

## Getting Started

### Prerequisites

- Node.js (v14+)
- Firebase account with Firestore set up
- Optional: VS Code or your preferred code editor

### Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/ndgsghdj/CalculatorSocial.git
   cd CalculatorSocial
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Configure Firebase**:
   - Go to the Firebase Console and set up a new project.
   - Enable Firestore in your project.
   - Obtain the Firebase configuration and set it up in the project (e.g., in `.env` or Firebase config files).

4. **Run the App**:
   ```bash
   npm start
   ```

### Usage

1. **Sign Up** to create an account.
2. **Create a New Post** with mathematical expressions and text. The app calculates results inline as you type.
3. **View Your Profile** to see your posts

## Project Structure

```plaintext
CalculatorSocial/
├── src/
│   ├── components/         # Reusable UI components
│   ├── providers/          # Context providers (e.g., PostProvider)
│   ├── pages/              # App pages (Home, Profile, New Post)
│   ├── App.tsx             # Main app component
│   ├── main.tsx            # Entry point
├── README.md               # Project documentation
└── package.json            # Dependencies and scripts
```

## Contributing

Feel free to fork the project and submit pull requests. Contributions are always welcome!

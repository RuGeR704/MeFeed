# 🌿 MeFeed

> *Your quiet corner. One thought a day.*

**MeFeed** is a minimal personal diary app built with React Native & Expo. Every day you write a single thought — no more, no less. Over time, your feed becomes a window into your own mind, surfacing memories from weeks, months, and years ago.

---

## ✨ Features

- 📝 **One thought per day** — the app locks the input after you write, keeping things intentional
- 🌤 **Mood rating** — rate each day as *Good*, *So-so*, or *Tough* with a gentle, non-judgmental system
- 🗓 **Memory cards** — thoughts from 1 week, 1 month, 3 months, 6 months, and 1 year ago resurface automatically in your feed
- 📖 **Personal archive** — a dedicated Profile screen with your full thought history
- 📊 **Mood overview** — a visual breakdown of how your days have felt over time
- 🔍 **Mood filter** — browse your archive by mood: All, Good, So-so, or Tough
- 💾 **Fully offline** — everything is stored locally on your device via AsyncStorage, no account needed
- 🎨 **Warm, calm UI** — a *warm sand* palette designed to feel like a safe, personal space

---

## 📱 Screenshots

| Home | Today's Thought | Profile |
|------|----------------|---------|
| Feed + daily input | Write & rate your day | Archive + mood stats |

---

## 🗂 Project Structure

```
mefeed/
├── App.js                      # Root navigation + font loading
├── src/
│   ├── screens/
│   │   ├── HomeScreen.jsx      # Daily input + past feed
│   │   └── ProfileScreen.jsx   # Archive + mood overview
│   ├── components/
│   │   ├── Logo.jsx            # Centered cursive logo
│   │   ├── ThoughtCard.jsx     # Single thought card with mood badge
│   │   ├── MemoryCard.jsx      # Memory banner + thought card
│   │   ├── TodayInput.jsx      # Daily text input box
│   │   └── MoodPicker.jsx      # 3-state mood selector
│   ├── hooks/
│   │   └── useThoughts.js      # All data logic + AsyncStorage
│   ├── utils/
│   │   └── dateHelpers.js      # Date formatting + memory label logic
│   └── theme.js                # Colors, mood tokens, palette
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) **v18 or higher**
- [Expo Go](https://expo.dev/go) app on your iOS or Android device

---

### 1. Clone the repository

```bash
git clone https://github.com/your-username/mefeed.git
cd mefeed
```

### 2. Install dependencies

```bash
npm install
```

### 3. Install Expo packages

```bash
npx expo install \
  @react-navigation/native \
  @react-navigation/bottom-tabs \
  react-native-screens \
  react-native-safe-area-context \
  @react-native-async-storage/async-storage \
  react-native-gesture-handler \
  expo-font \
  @expo/vector-icons \
  @expo-google-fonts/dancing-script
```

### 4. Start the development server

```bash
npx expo start
```

Then:

- 📱 **On your phone** — scan the QR code with the Expo Go app
- 🍎 **iOS Simulator** — press `i` in the terminal
- 🤖 **Android Emulator** — press `a` in the terminal

---

## 🎨 Design System

mefeed uses a custom *warm sand* palette built to feel calm and personal:

| Token | Value | Usage |
|-------|-------|-------|
| `T.bg` | `#FBF8F4` | App background |
| `T.card` | `#FFFFFF` | Card surfaces |
| `T.accent` | `#8B7355` | Buttons, logo, active tab |
| `T.text` | `#5A4E44` | Primary text |
| `T.textMuted` | `#B8AFA6` | Secondary text, labels |

Mood colors:

| Mood | Background | Meaning |
|------|-----------|---------|
| 🌤 Good | `#FFF8EC` | A day that felt right |
| 🌥 So-so | `#F7F5F2` | An ordinary day |
| 🌧 Tough | `#F0F4F8` | A harder day, held gently |

---

## 🛠 Tech Stack

| Tool | Version | Purpose |
|------|---------|---------|
| React Native | — | Core framework |
| Expo SDK | **54** | Build & dev tooling |
| React Navigation | v6 | Bottom tab navigation |
| AsyncStorage | — | Local data persistence |
| Dancing Script | Google Fonts | Cursive logo font |
| Expo Vector Icons | — | Tab bar icons |

---

## 📦 Build for Production

```bash
# Install EAS CLI
npm install -g eas-cli

# Log in to your Expo account
eas login

# Configure the build
eas build:configure

# Build for iOS
eas build --platform ios

# Build for Android
eas build --platform android
```

---

## 🤍 Philosophy

MeFeed is intentionally simple. There is no social feed, no notifications pushing you back in, no likes from other people. It's just you and your thoughts — one per day, every day. The goal is reflection, not performance.

---

## 👤 Author

Created by [RuGer704](https://github.com/RuGeR704)

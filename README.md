# 🏺 KARIGAR Mobile (कारीगर)
### Smart Cataloging, Living Heritage Marketplace & Saathi AI Voice Copilot for Rural Artisans

[![Build Android APK](https://github.com/TIRUNARA/KARIGAR-MOBILE-/actions/workflows/build-apk.yml/badge.svg)](https://github.com/TIRUNARA/KARIGAR-MOBILE-/actions/workflows/build-apk.yml)
[![Release](https://img.shields.io/github/v/release/TIRUNARA/KARIGAR-MOBILE-?label=APK%20Download&color=B85B35)](https://github.com/TIRUNARA/KARIGAR-MOBILE-/releases/latest)
[![Platform](https://img.shields.io/badge/Platform-Android%20APK-brightgreen)](https://github.com/TIRUNARA/KARIGAR-MOBILE-/releases/latest)
[![AI Copilot](https://img.shields.io/badge/AI%20Copilot-Gemini%202.5%20Flash-4285F4)](https://deepmind.google/technologies/gemini/)

---

## 📲 Direct APK Download

Install the KARIGAR mobile application directly on any Android smartphone:

### 📥 [Download Latest KARIGAR APK (karigar-mobile.apk)](https://github.com/TIRUNARA/KARIGAR-MOBILE-/releases/latest/download/karigar-mobile.apk)

> **Installation Guide**:
> 1. Tap the download link above on your Android smartphone.
> 2. Open the downloaded `karigar-mobile.apk` file.
> 3. When prompted, toggle **"Allow installation from this source"** in Android Settings.
> 4. Tap **Install** and open **KARIGAR**!

---

## 🌟 Core Capabilities

- 🏺 **Direct Artisan Discovery**: Browse generational craft traditions across India (Bankura Terracotta, Varanasi Handloom, Channapatna Woodcraft, Bastar Dhokra metal, and Jaipur Blue Pottery).
- 🧠 **Saathi AI Copilot (साथी)**: Integrated with Google Gemini 2.5 Flash:
  - **Fair Living Wage Appraisal**: Calculates fair artisanal pricing based on raw materials, artisan labor hours, and generational GI mastery with 0% platform commission.
  - **Artisan Storytelling ("Tell my story")**: Generates evocative, culturally grounded artisan narratives for collectors and global buyers.
  - **Voice Copilot**: Native speech-to-text in English, Hindi, Bengali, and Telugu.
  - **Multi-Tiered Fallback**: Automatically connects to live backend API, falls back to direct client Gemini REST API, and provides an offline cultural heritage knowledge base.
- 📸 **Camera Craft Cataloging**: Native camera capture and photo gallery picker for seamless craft cataloging on mobile devices.
- ⚡ **Native Android Shell**:
  - Full hardware acceleration with Kotlin WebView container (`com.karigar.mobile`).
  - Native tactile haptic feedback (`VibratorManager`).
  - Offline connectivity detection and pull-to-refresh (`SwipeRefreshLayout`).
  - Auto-granting permissions for camera and microphone.

---

## 🏛️ System Architecture

```
                                +---------------------------+
                                |  Rural Artisan / Patron   |
                                +-------------+-------------+
                                              |
                                              v
                              +---------------+---------------+
                              |    KARIGAR Mobile APK         |
                              |    (com.karigar.mobile)       |
                              +---------------+---------------+
                                              |
                     +------------------------+------------------------+
                     |                                                 |
                     v                                                 v
        +------------+-------------+                     +-------------+------------+
        |   Native Hardware APIs   |                     |     Web & AI Engine      |
        |  - Camera (Craft Photos) |                     |  - Tailwind Responsive   |
        |  - Mic (Voice Copilot)   |                     |  - Saathi Chat & Voice   |
        |  - Haptic Vibration      |                     |  - Indic Multilingual    |
        +--------------------------+                     +-------------+------------+
                                                                       |
                                                +----------------------+----------------------+
                                                |                                             |
                                                v                                             v
                                  +-------------+-------------+                 +-------------+-------------+
                                  | Cloud Run Live Backend    |                 | Direct Gemini 2.5 Flash   |
                                  | (Live PostgreSQL / Sync)  |                 | (Rapid Client Fallback)   |
                                  +---------------------------+                 +---------------------------+
```

---

## 🚀 Building the APK Locally

If you have Android Studio or the Android SDK installed locally:

```bash
# Clone the repository
git clone https://github.com/TIRUNARA/KARIGAR-MOBILE-.git
cd KARIGAR-MOBILE-/android

# Build Debug APK
./gradlew assembleDebug

# Output APK location
# android/app/build/outputs/apk/debug/app-debug.apk
```

---

## 🤖 Continuous Integration & Automated Releases

Every push to `main` triggers `.github/workflows/build-apk.yml`:
1. Checks out code and provisions **JDK 17** + **Android SDK 34**.
2. Compiles `app-debug.apk` using Gradle.
3. Automatically attaches `karigar-mobile.apk` to **GitHub Releases (`v1.0.0`)**.
4. Uploads build artifacts retained for 30 days.

---

## 👨‍💻 Author & Maintainer
- **Tirunara (Shiva)** & **Integrity**
- **Repository**: [`TIRUNARA/KARIGAR-MOBILE-`](https://github.com/TIRUNARA/KARIGAR-MOBILE-)

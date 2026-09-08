# Firebase Authentication Setup Guide

This project is configured to use Firebase Authentication with **Google** and **Apple** Sign-In providers. In order for the authentication to work properly, you must configure the following in your Firebase Console and Apple Developer account.

## 1. Firebase Project Setup
1. Go to the [Firebase Console](https://console.firebase.google.com/).
2. Create a new project or select an existing one.
3. In the left sidebar, click **Build > Authentication**.
4. Click **Get Started** if this is your first time.
5. In the **Project Settings > General** tab, register a new Web App to get your Firebase configuration values.
6. Copy the values and add them to your local `.env` file:
   ```env
   VITE_FIREBASE_API_KEY="..."
   VITE_FIREBASE_AUTH_DOMAIN="..."
   VITE_FIREBASE_PROJECT_ID="..."
   VITE_FIREBASE_STORAGE_BUCKET="..."
   VITE_FIREBASE_MESSAGING_SENDER_ID="..."
   VITE_FIREBASE_APP_ID="..."
   ```

## 2. Google Authentication Setup
1. Go to **Authentication > Sign-in method** in the Firebase Console.
2. Click **Add new provider** and select **Google**.
3. Toggle the **Enable** switch.
4. Set the **Project support email**.
5. Click **Save**.

## 3. Apple Authentication Setup

Apple Sign-In requires an Apple Developer Account.

### A. Apple Developer Portal
1. Go to the [Apple Developer Certificates, Identifiers & Profiles](https://developer.apple.com/account/resources/identifiers/list) page.
2. **Create an App ID**:
   - Register a new App ID (if you don't have one).
   - Enable the **Sign In with Apple** capability.
3. **Create a Service ID**:
   - Register a new Service ID.
   - Configure **Sign In with Apple**:
     - Select your Primary App ID.
     - Add your Web Domain (e.g., `calamm.com` or your `firebaseapp.com` domain).
     - Add your Return URLs. Firebase requires: `https://<YOUR_FIREBASE_PROJECT_ID>.firebaseapp.com/__/auth/handler`.
4. **Create a Private Key**:
   - Register a new Key.
   - Enable **Sign In with Apple**.
   - Download the `.p8` key file. Note your **Key ID** and your **Apple Team ID**.

### B. Firebase Console
1. Go to **Authentication > Sign-in method** in the Firebase Console.
2. Click **Add new provider** and select **Apple**.
3. Toggle the **Enable** switch.
4. Fill in the details:
   - **Service ID**: The Service ID you created in step A3.
   - **Apple Team ID**: Found in your Apple Developer account top right corner.
   - **Key ID**: The ID of the key you generated in step A4.
   - **Private key**: Paste the entire contents of the downloaded `.p8` file.
5. Click **Save**.

## 4. Authorized Domains
For both Google and Apple login to work on your deployed environments, you must add your domains to Firebase:
1. Go to **Authentication > Settings > Authorized domains** in the Firebase Console.
2. Click **Add domain**.
3. Add any domain you will deploy this app to (e.g., `calamm.com`, `admin.calamm.com`).
4. Note: `localhost` is authorized by default for local development.

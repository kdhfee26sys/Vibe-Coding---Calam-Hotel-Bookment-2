import {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
  signOut,
  onAuthStateChanged,
  type User,
  type UserCredential,
  type NextOrObserver
} from 'firebase/auth';
import { auth, googleProvider, appleProvider } from '../../lib/firebase/config';

export interface AuthUserData {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  providerId: string | null;
}

/**
 * Transforms a Firebase User object into a clean frontend representation
 */
export function formatAuthUser(user: User | null): AuthUserData | null {
  if (!user) return null;
  return {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName || user.email?.split('@')[0] || 'User',
    photoURL: user.photoURL,
    providerId: user.providerData?.[0]?.providerId || 'firebase',
  };
}

/**
 * Sign in using Google OAuth Popup
 */
export async function signInWithGoogle(): Promise<UserCredential> {
  return await signInWithPopup(auth, googleProvider);
}

/**
 * Sign in using Apple OAuth Popup
 */
export async function signInWithApple(): Promise<UserCredential> {
  return await signInWithPopup(auth, appleProvider);
}

/**
 * Sign in with Email and Password
 */
export async function signInWithEmail(email: string, password: string): Promise<UserCredential> {
  return await signInWithEmailAndPassword(auth, email, password);
}

/**
 * Sign up with Email and Password and set Display Name
 */
export async function signUpWithEmail(
  email: string,
  password: string,
  displayName?: string
): Promise<UserCredential> {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  if (displayName && userCredential.user) {
    await updateProfile(userCredential.user, { displayName });
  }
  return userCredential;
}

/**
 * Update current user profile (Display Name & Photo)
 */
export async function updateUserProfile(displayName: string, photoURL?: string): Promise<void> {
  if (!auth.currentUser) throw new Error('No authenticated user found');
  await updateProfile(auth.currentUser, { displayName, photoURL });
}

/**
 * Update User Password
 */
export async function updateUserPassword(newPassword: string): Promise<void> {
  if (!auth.currentUser) throw new Error('No authenticated user found');
  await updatePassword(auth.currentUser, newPassword);
}

/**
 * Re-authenticate user (required for sensitive operations like updating password)
 */
export async function reauthenticateUser(password: string): Promise<void> {
  if (!auth.currentUser || !auth.currentUser.email) throw new Error('No authenticated user found');
  const credential = EmailAuthProvider.credential(auth.currentUser.email, password);
  await reauthenticateWithCredential(auth.currentUser, credential);
}

/**
 * Sign out current authenticated user
 */
export async function signOutUser(): Promise<void> {
  return await signOut(auth);
}

/**
 * Subscribe to Firebase Auth state changes
 */
export function onAuthChange(callback: NextOrObserver<User>): () => void {
  return onAuthStateChanged(auth, callback);
}

/**
 * Maps technical Firebase Auth error codes to user-friendly messages
 */
export function getAuthErrorMessage(error: any): string {
  if (!error) return 'An unexpected error occurred. Please try again.';

  const code = error.code || '';

  switch (code) {
    case 'auth/popup-closed-by-user':
      return 'Sign-in was cancelled.';
    case 'auth/popup-blocked':
      return 'The sign-in popup was blocked by your browser. Please allow popups for this site.';
    case 'auth/cancelled-popup-request':
      return 'Another sign-in window is already open.';
    case 'auth/account-exists-with-different-credential':
      return 'An account already exists with the same email using a different sign-in method.';
    case 'auth/operation-not-allowed':
      return 'This sign-in method is not enabled in Firebase Console. Please verify configuration.';
    case 'auth/unauthorized-domain':
      return 'This domain is not authorized in Firebase Authentication. Add it under Authorized Domains in Firebase Console.';
    case 'auth/network-request-failed':
      return 'Network connection error. Please check your internet connection.';
    case 'auth/invalid-credential':
    case 'auth/wrong-password':
    case 'auth/user-not-found':
      return 'Invalid email or password. Please verify your credentials.';
    case 'auth/email-already-in-use':
      return 'This email address is already registered. Please sign in instead.';
    case 'auth/weak-password':
      return 'Password is too weak. Please use at least 6 characters.';
    case 'auth/invalid-email':
      return 'Please enter a valid email address.';
    case 'auth/too-many-requests':
      return 'Too many attempts. Access is temporarily restricted. Please try again in a few minutes.';
    case 'auth/user-disabled':
      return 'This account has been disabled. Please contact system support.';
    default:
      if (error.message && !error.message.includes('Firebase:')) {
        return error.message;
      }
      return 'Unable to sign in right now. Please try again.';
  }
}

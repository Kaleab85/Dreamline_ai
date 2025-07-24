import { db } from './firebase';
import { collection, query, where, getDocs, addDoc, doc, getDoc } from 'firebase/firestore';

export interface User {
  id: string;
  email: string;
  password: string; // In a real app, this would be a hash
  role: 'superadmin' | 'admin';
}

const usersCol = collection(db, 'users');

async function initializeSuperAdmin() {
    const q = query(usersCol, where("role", "==", "superadmin"));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
        console.log('No superadmin found, creating one...');
        await addDoc(usersCol, {
            email: 'admin@example.com',
            password: 'password', // Don't do this in production!
            role: 'superadmin',
        });
    }
}

// Ensure the superadmin exists when the module is first loaded on the server.
initializeSuperAdmin().catch(console.error);


export async function getUsers(): Promise<User[]> {
  const userSnapshot = await getDocs(usersCol);
  return userSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as User));
}

export async function getUserByEmail(email: string): Promise<User | undefined> {
  const q = query(usersCol, where("email", "==", email));
  const querySnapshot = await getDocs(q);
  if (querySnapshot.empty) {
    return undefined;
  }
  const doc = querySnapshot.docs[0];
  return { id: doc.id, ...doc.data() } as User;
}

export async function getUserById(id: string): Promise<User | undefined> {
    const userDocRef = doc(db, 'users', id);
    const userDocSnap = await getDoc(userDocRef);

    if (!userDocSnap.exists()) {
        console.warn(`Could not find user with id: ${id}`);
        return undefined;
    }

    return { id: userDocSnap.id, ...userDocSnap.data() } as User;
}

export async function addUser(userData: Omit<User, 'id'>) {
    await addDoc(usersCol, userData);
}

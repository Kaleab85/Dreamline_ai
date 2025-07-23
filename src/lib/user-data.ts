import { db } from './firebase';
import { collection, query, where, getDocs, addDoc } from 'firebase/firestore';

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
        console.log("No superadmin found, creating one.");
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
    const q = query(usersCol, where("__name__", "==", id));
    const querySnapshot = await getDocs(q);
     if (querySnapshot.empty) {
        // This is a workaround to get the document by ID from a client component
        // In a real app, you would use getDoc(doc(db, 'users', id)))
        const allUsers = await getUsers();
        return allUsers.find(u => u.id === id);
    }
    const doc = querySnapshot.docs[0];
    if(!doc) return undefined;
    return { id: doc.id, ...doc.data() } as User;
}

export async function addUser(userData: Omit<User, 'id'>) {
    await addDoc(usersCol, userData);
}

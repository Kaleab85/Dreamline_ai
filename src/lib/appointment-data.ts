import { db } from './firebase';
import { collection, getDocs, addDoc, query, where, doc, deleteDoc, onSnapshot, Unsubscribe } from 'firebase/firestore';

export type AppointmentStatus = 'Pending' | 'Confirmed' | 'Completed';

export interface Appointment {
  id: string;
  name: string;
  email: string;
  phone:string;
  service: string;
  date: string;
  message?: string;
  status: AppointmentStatus;
}

export function getAppointments(
    filters: { service?: string; status?: AppointmentStatus },
    onUpdate: (appointments: Appointment[]) => void
  ): Unsubscribe {
    const appointmentsCol = collection(db, 'appointments');
    
    let q = query(appointmentsCol);
  
    if (filters?.service && filters.service !== 'all') {
      q = query(q, where('service', '==', filters.service));
    }
  
    if (filters?.status && filters.status !== 'all') {
      q = query(q, where('status', '==', filters.status));
    }
  
    const unsubscribe = onSnapshot(q, (snapshot) => {
        const appointmentList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Appointment));
        onUpdate(appointmentList);
    }, (error) => {
        console.error("Error fetching appointments: ", error);
        onUpdate([]);
    });

    return unsubscribe;
}

export async function addAppointment(appointmentData: Omit<Appointment, 'id' | 'status'>) {
    const newAppointment = {
        ...appointmentData,
        status: 'Pending',
    };
    await addDoc(collection(db, "appointments"), newAppointment);
}

export async function deleteAppointment(id: string): Promise<void> {
    const appointmentRef = doc(db, 'appointments', id);
    await deleteDoc(appointmentRef);
}

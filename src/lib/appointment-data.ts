import { db } from './firebase';
import { collection, getDocs, addDoc, query, where, doc, deleteDoc } from 'firebase/firestore';

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

export async function getAppointments(filters?: { service?: string; status?: AppointmentStatus }): Promise<Appointment[]> {
  const appointmentsCol = collection(db, 'appointments');
  
  let q = query(appointmentsCol);

  if (filters?.service && filters.service !== 'all') {
    q = query(q, where('service', '==', filters.service));
  }

  if (filters?.status && filters.status !== 'all') {
    q = query(q, where('status', '==', filters.status));
  }

  const appointmentSnapshot = await getDocs(q);
  const appointmentList = appointmentSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Appointment));
  
  return appointmentList;
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

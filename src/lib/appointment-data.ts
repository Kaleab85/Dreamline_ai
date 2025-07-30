import { db } from './firebase';
import { collection, addDoc } from 'firebase/firestore';

export type AppointmentStatus = 'Pending' | 'Confirmed' | 'Completed';

export interface Appointment {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  date: string;
  message?: string;
  status: AppointmentStatus;
}

export async function addAppointment(appointmentData: Omit<Appointment, 'id' | 'status'>) {
    const newAppointment = {
        ...appointmentData,
        status: 'Pending' as AppointmentStatus,
    };
    await addDoc(collection(db, "appointments"), newAppointment);
}


export interface Appointment {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  date: string;
  message?: string;
}

// This will act as our in-memory database.
// NOTE: This data will be reset on every server restart.
const appointments: Appointment[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '(555) 123-4567',
    service: 'Educational Consultation',
    date: '2024-07-15',
    message: 'Looking for advice on universities in Canada.',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    phone: '(555) 987-6543',
    service: 'Visa Application Assistance',
    date: '2024-07-18',
    message: 'Need help with my UK student visa application.',
  },
  {
    id: '3',
    name: 'Sam Wilson',
    email: 'sam.wilson@example.com',
    phone: '(555) 234-5678',
    service: 'Travel Coordination',
    date: '2024-07-20',
  },
    {
    id: '4',
    name: 'Maria Garcia',
    email: 'maria.garcia@example.com',
    phone: '(555) 876-5432',
    service: 'Educational Consultation',
    date: '2024-07-22',
    message: 'Interested in postgraduate studies in Australia.',
  },
];

export function getAppointments(): Appointment[] {
  return appointments;
}

export function addAppointment(appointmentData: Omit<Appointment, 'id'>) {
    const newAppointment: Appointment = {
        id: String(Date.now()), // Use timestamp for a more unique ID
        ...appointmentData,
    };
    appointments.push(newAppointment);
}

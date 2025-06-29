
export interface Appointment {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  date: string;
  message?: string;
}

// Use globalThis to ensure the array persists across hot reloads in development.
// This is a common pattern for in-memory "databases" in a Next.js dev environment.
var globalForAppointments = globalThis as unknown as { 
  appointments: Appointment[] | undefined; 
};

// Initialize the in-memory array only once
if (!globalForAppointments.appointments) {
  globalForAppointments.appointments = [
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
}

export function getAppointments(): Appointment[] {
  // Always get the appointments from the global scope to ensure persistence
  return globalForAppointments.appointments!;
}

export function addAppointment(appointmentData: Omit<Appointment, 'id'>) {
    const newAppointment: Appointment = {
        id: String(Date.now()), // Use timestamp for a more unique ID
        ...appointmentData,
    };
    // Push to the global array
    globalForAppointments.appointments!.push(newAppointment);
}

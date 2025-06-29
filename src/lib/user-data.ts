
export interface User {
  id: string;
  email: string;
  password: string; // In a real app, this would be a hash
  role: 'superadmin' | 'admin';
}

var globalForUsers = globalThis as unknown as { 
  users: User[] | undefined; 
};

// Initialize the in-memory array only once
if (!globalForUsers.users) {
  globalForUsers.users = [
    {
      id: '1',
      email: 'admin@example.com',
      password: 'password',
      role: 'superadmin',
    },
  ];
}

export function getUsers(): User[] {
  return globalForUsers.users!;
}

export function getUserByEmail(email: string): User | undefined {
  return globalForUsers.users!.find(user => user.email === email);
}

export function addUser(userData: Omit<User, 'id'>) {
    const newUser: User = {
        id: String(Date.now()),
        ...userData,
    };
    globalForUsers.users!.push(newUser);
}

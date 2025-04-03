export interface User {
  id: string;
  name: string;
  username: string;
  type: 'standard' | 'admin';
  status: 'active' | 'inactive';
}

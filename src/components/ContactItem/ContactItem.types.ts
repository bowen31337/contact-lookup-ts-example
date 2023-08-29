export interface Contact {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  avatarImage: string;
  phone: string;
}

export interface ContactItemProps {
  contact: Contact;
}

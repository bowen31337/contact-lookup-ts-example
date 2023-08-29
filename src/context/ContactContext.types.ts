import { Contact } from "../components";

export interface ContactContextProps {
  contacts: Contact[];
  isLoading: boolean;
  isError: boolean;
  errorMsg: string;
}

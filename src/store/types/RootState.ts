import { CommonState } from "./CommonState";
import { AuthState } from "./AuthState";
import { UserState } from "./UserState";

export interface RootState {
  common: CommonState;
  auth: AuthState;
  user: UserState;
}

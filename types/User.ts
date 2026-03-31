export interface UserT {
  username: string;
  password: string;
  avatar: string;
  online: boolean;
  email: string;
  isPremium: boolean;
  isTotpEnabled: boolean;
  subscriptionCancelled: 'true' | 'false';
  _id: string;
}

interface PlayerIdT {
  playerId: string;
}

export interface RegisterT extends PlayerIdT {
  username: string;
  email: string;
  password: string;
}

export interface LoginT extends PlayerIdT {
  email: string;
  code: string;
  password: string;
}
export interface EditProfileT {
  username: string;
  email: string;
  avatar: string;
}

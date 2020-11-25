import React, { createContext, useContext, useState, useCallback } from 'react';
import { IRequestCreateUser } from '../pages/SignUp';
import api from '../services/api';

interface IUser {
  id: string;
  name: string;
  last_name: string;
  email: string;
  created_at: string;
  avatar?: {
    name: string;
    id: number;
    url: string;
  };
}

export interface IRequestProfile extends IUser {
  old_password: string;
  password: string;
  password_confirmation: string;
}

interface IRequest {
  email: string;
  password: string;
}

interface IAuthState {
  token: string;
  user: IUser;
}

interface IAuthContextData {
  user: IUser;
  signIn(data: IRequest): Promise<void>;
  signUp(data: IRequestCreateUser): Promise<void>;
  updateProfile(data: IRequestProfile): Promise<void>;
  updateImage(file: File): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<IAuthContextData>({} as IAuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<IAuthState>(() => {
    const user = localStorage.getItem('@finances:user');
    const token = localStorage.getItem('@finances:token');

    if (token && user) {
      api.defaults.headers.authorization = `Bearer ${token}`;

      return {
        user: JSON.parse(user),
        token,
      };
    }

    return {} as IAuthState;
  });

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('session', {
      email,
      password,
    });

    const { user, token } = response.data;

    api.defaults.headers.authorization = `Bearer ${token}`;

    localStorage.setItem('@finances:token', token);
    localStorage.setItem('@finances:user', JSON.stringify(user));

    setData({ token, user });
  }, []);

  const signUp = useCallback(async (createUser: IRequestCreateUser) => {
    await api.post('register', createUser);
  }, []);

  const updateProfile = useCallback(
    async (profile: IRequestProfile) => {
      const {
        old_password,
        password,
        password_confirmation,
        name,
        email,
        last_name,
      } = profile;

      const update = {
        name,
        email,
        avata_id: data.user.avatar?.id,
        last_name,
      };

      if (old_password) {
        Object.assign(update, {
          old_password,
          password,
          password_confirmation,
        });
      }

      const response = await api.put(`profile`, update);

      setData({
        user: response.data,
        token: data.token,
      });

      localStorage.setItem('@finances:token', data.token);
      localStorage.setItem('@finances:user', JSON.stringify(response.data));
    },
    [data],
  );

  const updateImage = useCallback(
    async (file: File) => {
      const dataFile = new FormData();
      dataFile.append('file', file);

      const response = await api.post(`profile/avatar`, dataFile);

      setData({
        user: response.data,
        token: data.token,
      });

      localStorage.setItem('@finances:token', data.token);
      localStorage.setItem('@finances:user', JSON.stringify(response.data));
    },
    [data],
  );

  const signOut = useCallback(async () => {
    localStorage.removeItem('@finances:token');
    localStorage.removeItem('@finances:user');

    setData({} as IAuthState);
    await api.delete(`logout`);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signIn,
        user: data.user,
        signUp,
        updateImage,
        signOut,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): IAuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within as AuthProvider');
  }

  return context;
}

export { AuthProvider, useAuth };

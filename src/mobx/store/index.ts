import  React from 'react';
import { Container } from 'typedi';
import { UserStore } from './user/user.store'
import 'reflect-metadata'

export const userStore = Container.get(UserStore)

export const stores={
    userStore,
}


export const StoresContext = React.createContext({...stores});

export const useStores = () => React.useContext(StoresContext);
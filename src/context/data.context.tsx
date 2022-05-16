import {
  createContext,
  ReactNode,
  useContext,
  useState
} from 'react';

import { IData } from '../interfaces/IData';


interface DataProviderProps {
  children: ReactNode;
}


interface IDataContext {
  data: IData,
  setValues: (values: Object) => void
}


const DataContext = createContext<IDataContext>({} as IDataContext);


export function DataProvider({ children }: DataProviderProps): JSX.Element {
  const [data, setData] = useState<IData>({} as IData);

  function setValues(values: Object) {
    setData((prevData) => ({
      ...prevData,
      ...values,
    }));
  }

  return (
    <DataContext.Provider value={{ data, setValues }}>
      {children}
    </DataContext.Provider>
  );
}


export const useData = () => useContext(DataContext);

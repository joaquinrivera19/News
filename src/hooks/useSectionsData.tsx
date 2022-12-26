import {useState, useEffect} from 'react';
import {contentApi} from '../api/contentApi';
import {GetSectionsData} from '../interfaces/getSectionsDataInterfaces';

export const useSectionsData = (props: any) => {
  const [isLoading, setIsLoading] = useState(true);
  const [sectionsData, setSectionsData] = useState<any>({} as any);

  const loadData = async () => {
    try {
      //console.log(props)
      const resp = await contentApi.get<any>(`/pages/${props}`);
      /* console.log(resp.data); */
      setSectionsData(resp.data);
      setIsLoading(false);
    } catch (error) {
      console.log('useSectionsData');
      console.log(error);
    }
  };

  return {isLoading, sectionsData, loadData};
};

import {useState, useEffect} from 'react';
import {contentApi} from '../api/contentApi';
import {GetCustomersMetadata} from '../interfaces/getCustomersMetadataInterfaces';

export const useCustomersMetadata = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [customersMetadata, setCustomersMetadata] =
    useState<GetCustomersMetadata>({} as GetCustomersMetadata);

  const loadData = async () => {
    try {
      const resp = await contentApi.get<GetCustomersMetadata>(
        '/customers/config',
      );
      /* console.log(resp.data) */
      setCustomersMetadata(resp.data);
      setIsLoading(false);
    } catch (error) {
      console.log('useCustomersMetadata');
      console.log(error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return {
    isLoading,
    customersMetadata,
  };
};

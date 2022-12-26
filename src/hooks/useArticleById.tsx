import {useState, useEffect} from 'react';
import {contentApi} from '../api/contentApi';
import {GetArticleByID} from '../interfaces/getArticleByIdInterfaces';

export const useArticleById = (id: any, type: any) => {
  const [isLoading, setIsLoading] = useState(true);
  const [articleByID, setArticleByID] = useState<GetArticleByID>(
    {} as GetArticleByID,
  );

  const loadData = async () => {
    try {

      let typeRequest = '';
      (type == 'stories') ? typeRequest = 'article' : typeRequest = 'vod';

      const resp = await contentApi.get<any>(
        `/pages/${typeRequest}/${id}`,
      );
      /* console.log(resp.data) */
      setArticleByID((type == 'stories') ? resp.data : resp.data[0]);
      setIsLoading(false);
    } catch (error) {
      console.log('useArticleById');
      console.log(error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return {
    isLoading,
    articleByID,
  };
};

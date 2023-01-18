import { useQuery } from 'react-query';
import { ArticleService } from "../services/articleService";

const getArticleById = async (articleId: string) => {
    const  venueService = new ArticleService();
    const response = await venueService.getArticleDetail(articleId);
    if(response.kind === 'ok'){
     return response.data.data
    }else{
      console.log({response})
     throw new Error('Failed to fetch Article')
    }
   
    
   };
     
   
   export const useArticle = (articleId: string) => {
     return useQuery(['article', articleId], () => getArticleById(articleId));
   };
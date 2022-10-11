import axios from 'axios';
import {useInfiniteQuery} from 'react-query';

const getFeeds = async ({pageParam = 0, queryKey}: any) => {
  if (queryKey[1].catFilters !== undefined) {
    const catstr = queryKey[1].catFilters.join(',');
    if (catstr !== '') {
      const {data: page} = await axios.get(
        `https://api.navenu.com/api/feed/${pageParam}?cats=${catstr}`,
      );
      return {page, pageParam};
    }
  }
  const {data: page} = await axios.get('https://api.navenu.com/api/feed/');
  return {page, pageParam};
};

export const useFeeds = (catFilters: any) => {
  return useInfiniteQuery(['feed', catFilters], getFeeds, {
    select: data => {
      //   console.log(data);
      const allPagesArray: Array<any> = [];
      data?.pages
        ? data.pages.forEach(contactsArray =>
            allPagesArray.push(contactsArray.page),
          )
        : null;
      const flatFeed = allPagesArray.flat();
      return {
        pages: data.pages,
        pageParams: data.pageParams,
        feed: flatFeed,
      };
    },
    getNextPageParam: lastPage => lastPage.pageParam + 1,
    onError: error => console.log(error),
    staleTime: 1000 * 60 * 60,
  });
};

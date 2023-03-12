import * as React from "react"
import {
  FlatList,
  GestureResponderEvent,
  RefreshControlProps,
} from "react-native"
import { observer } from "mobx-react-lite"
import { VenueCard } from "./VenueCard"
import { ArticleCard } from "./ArticleCard"
import { FEED_TYPE } from "../interface/feed"
import { DropCard } from "./DropCard"
import { LoadingIndicator } from "./LoadingIndicator"
import { IUserList } from "../interface/user"
import { CuratorCard } from "./CuratorCard"
import { useStores } from "../models"

export interface CardListProps {
  onTouchEnd?: (event: GestureResponderEvent) => void
  onTouchStart?: (event: GestureResponderEvent) => void
  data: Array<any>
  refreshControl?: React.ReactElement<
    RefreshControlProps,
    string | React.JSXElementConstructor<any>
  >
  keyExtractor?: (item: any, index: number) => string
  isFeed?: boolean
  onBookMark?: (feed: any) => void
  savedFeeds?: Array<any>
  toggleSaveFeed?: (feeds: any) => void
  isFetchingNextPage?: boolean
  getMoreData?: () => void
  userList?: IUserList
  isUserList?: boolean,
  removeItemFromUserList?: (feed:any) => void 
  hideRemove?: boolean
}

/**
 * Describe your component here
 */
export const CardList = observer(function CardList(props: CardListProps) {
  const {
    onTouchEnd,
    onTouchStart,
    data,
    refreshControl,
    keyExtractor,
    isFeed,
    onBookMark,
    savedFeeds,
    toggleSaveFeed,
    isFetchingNextPage,
    getMoreData,
    userList,
    isUserList,
    removeItemFromUserList,
    hideRemove
  } = props
  const {authenticationStore:{latitude, longitude}} = useStores() 



  const renderItem = ({ item }) => {
    if (item.type === "location") {
      return (
        <VenueCard currentUserLatitude={latitude} currentUserLongitude={longitude} savedFeeds={savedFeeds} isFeed={isFeed} onBookMark={onBookMark} item={item} userListData={userList} isUserList={isUserList}  onRemoveFromUserList={removeItemFromUserList} hideRemove={hideRemove} />
      )
    }

    if (item.type === FEED_TYPE.article) {
      return <ArticleCard item={item} isFeed={isFeed} onBookMark={onBookMark} userListData={userList} isUserList={isUserList} onRemoveFromUserList={removeItemFromUserList} hideRemove={hideRemove} />
    }
    if (item.type === FEED_TYPE.drop) {
      return <DropCard savedFeeds={savedFeeds} isFeed={isFeed} onBookMark={onBookMark} item={item} userListData={userList}  isUserList={isUserList} onRemoveFromUserList={removeItemFromUserList} hideRemove={hideRemove}/>
    }
    if(item.type?.toLowerCase() ===  FEED_TYPE.curator || item.type?.toLowerCase() ===  FEED_TYPE.curator+'s' ){
      return <CuratorCard  isFeed={isFeed} onBookMark={onBookMark} curator={item} userListData={userList}  isUserList={isUserList} onRemoveFromUserList={removeItemFromUserList} hideRemove={hideRemove}/>
    }
  }
  return (
    <FlatList
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      data={data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      progressViewOffset={18}
      onEndReached={getMoreData}
      ListFooterComponent={isFetchingNextPage ? <LoadingIndicator /> : null}
      refreshControl={refreshControl}
    />
  )
})

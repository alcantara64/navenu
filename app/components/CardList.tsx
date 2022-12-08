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
  } = props

  const renderItem = ({ item }) => {
    if (item.type === "location") {
      return (
        <VenueCard savedFeeds={savedFeeds} isFeed={isFeed} onBookMark={onBookMark} item={item} />
      )
    }
    if (item.type === FEED_TYPE.article) {
      return <ArticleCard item={item} />
    }
    if (item.type === FEED_TYPE.drop) {
      return <DropCard savedFeeds={savedFeeds} isFeed={isFeed} onBookMark={toggleSaveFeed} item={item} />
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

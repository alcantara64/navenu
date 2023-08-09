import * as React from "react"
import { FlatList } from "react-native"
import { observer } from "mobx-react-lite"

import { IDrop } from "../interface/drops"
import { DropCard } from "./DropCard"
import { IUserList } from "app/interface/user"

export interface DropListProps {
  /**
   * An optional style override useful for padding & margin.
   */
  drops: Array<IDrop>
  isFlatList?: boolean
  hideBookmark?: boolean
  onBookMark?: (item: any) => void
  userList?: IUserList
}

/**
 * Describe your component here
 */
export const DropList = observer(function DropList(props: DropListProps) {
  const { drops, isFlatList, hideBookmark, onBookMark, userList } = props
  if (isFlatList) {
    return (
      <FlatList
        data={drops}
        renderItem={(item) => (
          <DropCard
            onBookMark={onBookMark}
            item={item.item}
            isFeed={!hideBookmark}
            userListData={userList}
          />
        )}
      />
    )
  } else {
    return (
      <>
        {drops.map((item) => (
          <DropCard
            key={item.id}
            item={item}
            isFeed={!hideBookmark}
            onBookMark={onBookMark}
            userListData={userList}
          />
        ))}
      </>
    )
  }
})

import * as React from "react"
import { FlatList } from "react-native"
import { observer } from "mobx-react-lite"

import { IDrop } from "../interface/drops"
import { DropCard } from "./DropCard"

export interface DropListProps {
  /**
   * An optional style override useful for padding & margin.
   */
  drops: Array<IDrop>
  isFlatList?: boolean
  hideBookmark?: boolean
}

/**
 * Describe your component here
 */
export const DropList = observer(function DropList(props: DropListProps) {
  const { drops, isFlatList, hideBookmark } = props

  if (isFlatList) {
    return <FlatList data={drops} renderItem={(item) => <DropCard item={item} isFeed={!hideBookmark} />} />
  } else {
    return (
      <>
        {drops.map((item) => (
          <DropCard key={item.id} item={item} isFeed={!hideBookmark} />
        ))}
      </>
    )
  }
})

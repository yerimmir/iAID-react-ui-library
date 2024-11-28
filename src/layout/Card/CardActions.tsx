import React from "react"
import classNames from "classnames"
import { CSSProperties, FC, ReactNode } from "react"
import { CardActionsLayout } from "./interface/CardActionsLayout"
import { CardOrientation } from "./interface/CardOrientation"


export interface CardActionsProps{
  layout?: CardActionsLayout | string
  orientation?: CardOrientation | string
  children?: ReactNode
  style?: CSSProperties
  className?: string
}

export const CardActions: FC<CardActionsProps> =(props: CardActionsProps) =>{
  const { layout, orientation, style, className, children } = props
  return (
    <div
      style={style}
      className={classNames(
        'k-card-actions',
        className,
        `k-card-actions-${layout}`,
        orientation !== CardOrientation.VERTICAL ? 'k-card-actions-horizontal': 'k-card-actions-vertical'
      )}
    >
      {children}
    </div>
  )
}
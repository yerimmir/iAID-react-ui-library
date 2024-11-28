import classNames from "classnames"
import React, { CSSProperties, FC, ReactNode } from "react"
import { CardOrientation } from "./interface/CardOrientation"
import { CardType } from "./interface/CardType"


export interface CardProp{
  dir?:string
  type?: CardType
  orientation?: CardOrientation | string
  style?:CSSProperties
  className?: string
  children?:ReactNode
}

export const Card: FC<CardProp> = (props: CardProp) =>{
  const {dir='ltr', type=CardType.DEFAULT, orientation=CardOrientation.VERTICAL, style, className, children} = props
  return(
    <div
      dir={dir}
      style={style}
      className={classNames(
        'k-card',
        className,
        {[`k-card-${type}`]: type !== CardType.DEFAULT},
        orientation !== CardOrientation.HORIZONTAL ? 'k-card-vertical' : 'k-card-horizontal'
      )}
    >
      {children}
    </div>
  )
}
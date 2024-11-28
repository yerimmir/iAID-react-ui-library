import React, { FC } from "react";
import classNames from "classnames";
import { CSSProperties, ReactNode } from "react";


export interface CardSubtitleProps{
  children?: ReactNode
  style?: CSSProperties
  className?: string
}

export const CardSubtitle: FC<CardSubtitleProps> = (props:CardSubtitleProps) =>{
  const {children, style, className} = props
  return (
    <div
      style={style}
      className={classNames(
        'k-card-subtitle',
        className
      )}
    >
      {children}
    </div>
  )
}
import React, { FC } from "react";
import classNames from "classnames";
import { CSSProperties, ReactNode } from "react";


export interface CardTitleProps{
  children?: ReactNode
  style?: CSSProperties
  className?: string
}

export const CardTitle: FC<CardTitleProps> = (props:CardTitleProps) =>{
  const {children, style, className} = props
  return (
    <div
      style={style}
      className={classNames(
        'k-card-title',
        className
      )}
    >
      {children}
    </div>
  )
}
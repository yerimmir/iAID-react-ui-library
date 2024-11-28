import React, { FC } from "react";
import classNames from "classnames";
import { CSSProperties, ReactNode } from "react";


export interface CardFooterProps{
  children?: ReactNode
  style?: CSSProperties
  className?: string
}

export const CardFooter: FC<CardFooterProps> = (props:CardFooterProps) =>{
  const {children, style, className} = props
  return (
    <div
      style={style}
      className={classNames(
        'k-card-footer',
        className
      )}
    >
      {children}
    </div>
  )
}
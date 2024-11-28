import React, { FC } from "react";
import classNames from "classnames";
import { CSSProperties, ReactNode } from "react";


export interface CardBodyProps{
  children?: ReactNode
  style?: CSSProperties
  className?: string
}

export const CardBody: FC<CardBodyProps> = (props:CardBodyProps) =>{
  const {children, style, className} = props
  return (
    <div
      style={style}
      className={classNames(
        'k-card-body',
        className
      )}
    >
      {children}
    </div>
  )
}
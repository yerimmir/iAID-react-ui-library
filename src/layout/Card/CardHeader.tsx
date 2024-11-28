import React, { FC } from "react";
import classNames from "classnames";
import { CSSProperties, ReactNode } from "react";


export interface CardHeaderProps{
  children?: ReactNode
  style?: CSSProperties
  className?: string
}

export const CardHeader: FC<CardHeaderProps> = (props:CardHeaderProps) =>{
  const {children, style, className} = props
  return (
    <div
      style={style}
      className={classNames(
        'k-card-header',
        className
      )}
    >
      {children}
    </div>
  )
}
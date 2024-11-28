import React, { FC } from "react";
import classNames from "classnames";
import { CSSProperties, ReactNode } from "react";


export interface CardImageProps{
  src: string
  style?: CSSProperties
  className?: string
}

export const CardImage: FC<CardImageProps> = (props:CardImageProps) =>{
  const {src, style, className} = props
  return (
    <img
      src={src}
      style={style}
      className={classNames(
        'k-card-image',
        className
      )}
    />
  )
}
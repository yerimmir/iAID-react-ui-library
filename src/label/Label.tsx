import * as React from 'react';
import * as PropTypes from 'prop-types';
import { classNames } from '../utils/classNames';


export interface LabelProps {
  /**
   * Represents the id of the label element.
   * The value should be set to the editor `ariaLabelledBy` property.
   * Can be used when the editor is not containing native form element.
   */
  id?: string;
  /**
   * The id of the editor.
   * Represent the [`htmlFor`](https://reactjs.org/docs/dom-elements.html#htmlfor) property, which will be set to the `label` element.
   */
  editorId?: string;
  /**
   * An optional React ref to the editor.
   * Used to redirect the click event to the editor when it does not contain native form element.
   * To be able to work, the editor should have `focus` method or `actionElement` prop on it's ref.
   */
  editorRef?: any;
  /**
   * The text that will be rendered inside the label element.
   * Can be omitted for editors without label to keep form layout.
   */
  children?: any;
  /**
   * Specifies the validity of the editor. Used to define the editor is invalid.
   */
  editorValid?: boolean;
  /**
   * Specifies if the editor is disabled.
   */
  editorDisabled?: boolean;
  /**
   * If enabled marks the label as optional.
   */
  optional?: boolean;
  /**
   * The styles that are applied to the Label.
   */
  style?: React.CSSProperties;
  /**
   * Sets a class of the Label DOM element.
   */
  className?: string;
}

export const Label = (props:LabelProps) =>{
  const {id, editorId, editorRef, editorDisabled, editorValid, optional, children, className, style,} = props
  const optionalMessage = !!optional ? "(optional)" : ''
  const optionalElement = !!optional && (<span className='k-label-optional'>{optionalMessage}</span>)

  const handleClick = React.useCallback(
    (e)=>{
      if(editorRef?.current && !editorDisabled){
        if (editorRef.current.focus){
          e.preventDefault();
          editorRef.current.focus();
        }
        const editorActionElement = editorRef.current.actionElement;
        if (editorActionElement){
          e.preventDefault();
          editorActionElement.click();
        }
      }
    },[editorRef]
  )

  const labelClassName = classNames(
    {
      'k-label':true,
      'k-label-empty': !children,
      'k-text-error': editorValid === false,
      'k-text-disabled': editorDisabled === true,
    },
    className
  )
  return(
    <label
      id={id}
      htmlFor={editorId}
      onClick={handleClick}
      style={style}
      className={labelClassName}
    >
      {children}{optionalElement}
    </label>
  )
}
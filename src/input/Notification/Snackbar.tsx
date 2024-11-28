import React, { CSSProperties, ReactNode, useState } from "react";
import "../../theme/default/scss/Notification/Snackbar.scss";

export interface SnackBarInterface {
  /**
   * className 지정
   */
  className?: string;
  /**
   * snackbar를 닫기 위한 X 버튼 표시 여부(true : 버튼 출력)
   */
  closable?: boolean;
  /**
   * k-notification-container dir attribute에 전달
   * 출력 방향 지정
   */
  dir?: "auto" | "ltr" | "rtl";
  /**
   * snackbar 메세지 경고 수준
   */
  type?: "none" | "success" | "error" | "warning" | "info";
  /**
   * type을 나타내는 icon 출력 여부
   */
  hideIcon?: boolean;
  /**
   * close 버튼 클릭 시 호출되는 콜백 함수
   */
  onClose?: (event: NotificationEventMap) => void;
  /**
   * 띄울 메세지 지정
   */
  children?: ReactNode;
}

const SnackBar = (props: SnackBarInterface) => {
  const {
    className,
    closable = true,
    dir = 'auto',
    type = "none",
    hideIcon = false,
    onClose,
    children
  } = props;

  // state 관리
  const [close, setClose] = useState(false);

  // close 버튼 클릭 시 bar 닫히도록 설정
  const closeHandler = () => {
    setClose(true);
  };

  // children이 없는 경우 type이 text로 출력되도록 설정
  const content = children ? children : type && type

  // 오른쪽에서부터 글자 읽는 경우(dir="rtl"), 문자열 오른쪽부터 기입되도록 설정
  const reverseContent = typeof(content) === 'string' && content.split("").reverse().join("");

  // dir==="rtl"일 때를 위한 style 설정
  let contentStyle: CSSProperties =
    dir === 'ltr' ? {
      textAlign: 'left'
    } : dir === 'rtl' ? {
      textAlign: 'right'
    } : dir === 'auto' && {}

  return (
    <>
      {!close && (
        <div
          className={className ? `k-notification-container k-notification-container-${type} ${className}` : `k-notification-container k-notification-container-${type}`}
        >
          <div className="k-notification">
            <span className="k-notification-status">
              {!hideIcon && <span className={type && `k-icon-status k-icon k-icon-${type}`}></span>}
            </span>
            <span className="k-notification-content" style={contentStyle}> 
              {dir === 'rtl' ? reverseContent : content}
            </span>
            <span className="k-notification-actions">
              {closable && (
                <span
                  className="k-icon"
                  onClick={(e: any) => {
                    onClose ? onClose(e) : closeHandler();
                  }}
                ></span>
              )}
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default SnackBar;

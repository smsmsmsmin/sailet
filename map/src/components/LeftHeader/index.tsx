import React, { useCallback, useEffect, useRef, useState } from 'react';
import './style.scss';

interface IProps {
  height: number;
  leftFc: () => any;
  content: string;
}

const LeftHeader = (props: IProps) => {
  const [isScroll, setIsScroll] = useState(false);
  const header = useRef() as React.MutableRefObject<HTMLDivElement>;
  const onScroll = useCallback(
    e => {
      setIsScroll(props.height <= window.scrollY);
      header.current.style.boxShadow = window.scrollY > 0 ? '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)' : 'none';
    },
    [props.height, header],
  );

  useEffect(() => {
    setIsScroll(props.height <= window.scrollY);
    document.addEventListener('scroll', onScroll);

    return () => {
      document.removeEventListener('scroll', onScroll);
    };
  }, [onScroll]);

  return (
    <div className="left-header" id="left-header" ref={header}>
      <span className="spoqa-button" onClick={() => props.leftFc()}>
        &#xE000;
      </span>
      <span className="content">{isScroll ? props.content : null}</span>
    </div>
  );
};

export default LeftHeader;

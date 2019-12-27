import React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

const Naver = (props: SvgProps) => (
  <Svg viewBox="0 0 1000 1000" {...props}>
    <Path
      fill="#fff"
      d="M678 535L307.3 2.4H0v995.2h322V465l370.7 532.6H1000V2.4H678z"
    />
  </Svg>
);

export default Naver;

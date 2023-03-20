import { css } from 'styled-components';
import { AllColor, ColorKeyType } from './color';

export type TextStyleProperties = {
  color?: ColorKeyType;
};

const DEFAULT_COLOR = AllColor.system3;

export const defaultTextStyle = css<TextStyleProperties>`
  color: ${(props) =>
    props.color ? props.theme.color[props.color] : DEFAULT_COLOR};
`;

const h1R = css`
  font-size: 30px;
  line-height: 140%;
  font-weight: 400;
`;

const h1B = css`
  font-size: 30px;
  line-height: 140%;
  font-weight: 700;
`;

const h2R = css`
  font-size: 28px;
  line-height: 140%;
  font-weight: 400;
`;

const h2B = css`
  font-size: 28px;
  line-height: 140%;
  font-weight: 700;
`;

const h3R = css`
  font-size: 25px;
  line-height: 140%;
  font-weight: 400;
`;

const h3B = css`
  font-size: 25px;
  line-height: 140%;
  font-weight: 700;
`;

const h4R = css`
  font-size: 20px;
  line-height: 120%;
  font-weight: 400;
`;

const h4B = css`
  font-size: 20px;
  line-height: 120%;
  font-weight: 700;
`;

const h5R = css`
  font-size: 18px;
  line-height: 120%;
  font-weight: 400;
`;

const h5B = css`
  font-size: 18px;
  line-height: 120%;
  font-weight: 700;
`;

const pR12 = css`
  font-size: 15px;
  font-weight: 400;
  line-height: 120%;
`;

const pB12 = css`
  font-size: 15px;
  font-weight: 700;
  line-height: 120%;
`;

const pR20 = css`
  font-size: 15px;
  font-weight: 400;
  line-height: 200%;
`;

const pB20 = css`
  font-size: 15px;
  font-weight: 700;
  line-height: 200%;
`;

const spanR12 = css`
  font-size: 13px;
  font-weight: 400;
  line-height: 120%;
`;

const spanB12 = css`
  font-size: 13px;
  font-weight: 700;
  line-height: 120%;
`;

const spanR20 = css`
  font-size: 13px;
  font-weight: 400;
  line-height: 200%;
`;

const spanB20 = css`
  font-size: 13px;
  font-weight: 700;
  line-height: 200%;
`;

const captionR12 = css`
  font-size: 11px;
  line-height: 120%;
  font-weight: 400;
`;

const captionB12 = css`
  font-size: 11px;
  line-height: 120%;
  font-weight: 700;
`;

const captionR20 = css`
  font-size: 11px;
  line-height: 200%;
  font-weight: 400;
`;

const captionB20 = css`
  font-size: 11px;
  line-height: 200%;
  font-weight: 700;
`;

const miniR12 = css`
  font-size: 10px;
  line-height: 120%;
  font-weight: 400;
`;

const miniB12 = css`
  font-size: 10px;
  line-height: 120%;
  font-weight: 700;
`;

const miniR20 = css`
  font-size: 10px;
  line-height: 200%;
  font-weight: 400;
`;

const miniB20 = css`
  font-size: 10px;
  line-height: 200%;
  font-weight: 700;
`;

const fontStyle = {
  h1R,
  h1B,
  h2R,
  h2B,
  h3R,
  h3B,
  h4R,
  h4B,
  h5R,
  h5B,
  pR12,
  pB12,
  pR20,
  pB20,
  spanR12,
  spanB12,
  spanR20,
  spanB20,
  captionR12,
  captionB12,
  captionR20,
  captionB20,
  miniR12,
  miniB12,
  miniR20,
  miniB20,
};

export const fontSizeMap: { [key in FontStyleKeyType]: string } = {
  h1R: '30px',
  h1B: '30px',
  h2R: '28px',
  h2B: '28px',
  h3R: '25px',
  h3B: '25px',
  h4R: '20px',
  h4B: '20px',
  h5R: '18px',
  h5B: '18px',
  pR12: '15px',
  pB12: '15px',
  pR20: '15px',
  pB20: '15px',
  spanR12: '13px',
  spanB12: '13px',
  spanR20: '13px',
  spanB20: '13px',
  captionR12: '11px',
  captionB12: '11px',
  captionR20: '11px',
  captionB20: '11px',
  miniR12: '10x',
  miniB12: '10x',
  miniR20: '10x',
  miniB20: '10x',
};

export type FontStyleKeyType = keyof typeof fontStyle;
export default fontStyle;

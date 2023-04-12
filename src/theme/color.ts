/* System Color */
const system1 = '#111D2D';
const system3 = '#333849';
const system5 = '#555E70';
const system7 = '#777E97';
const system9 = '#989DAD';
const systemA = '#AAB0BC';
const systemC = '#CCCED8';
const systemD = '#DDDEE5';
const systemE = '#E9EBEE';
const systemF = '#F3F8FD';
const systemWhite = '#fff';
const systemLightBlue = '#C0DEFF';
const systemLightBlueHover = '#e1eefc';
const systemBlue = '#65abfc';
const systemHover = '#FAFAFA';

const systemColor = {
  system1,
  system3,
  system5,
  system7,
  system9,
  systemA,
  systemC,
  systemD,
  systemE,
  systemF,
  systemWhite,
  systemLightBlue,
  systemBlue,
  systemHover,
  systemLightBlueHover,
};

export type SystemColorKeyType = keyof typeof systemColor;

export type ColorKeyType = keyof typeof AllColor;
export const AllColor = systemColor;

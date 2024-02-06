import {Dimensions} from 'react-native';
import {initialWindowMetrics} from 'react-native-safe-area-context';
import moment from 'moment';

const {width, height} = Dimensions.get('window');
const {width: widthScreen, height: heightScreen} = Dimensions.get('screen');
const deviceHeight = height - (initialWindowMetrics?.insets.top ?? 0);
export const responsiveHeight = (h: number): number => height * (h / 100);
export const WIDTH = (w: number): number => width * (w / 375);
export const HEIGHT = (h: number): number => deviceHeight * (h / 812);
export const WIDTH_SCREEN = (w: number): number => widthScreen * (w / 375);
export const HEIGHT_SCREEN = (h: number): number => heightScreen * (h / 812);
export const getWidth = (): number => width;
export const getHeight = (): number => height;
export const getLineHeight = (f: number): number => f;
export const getHighAbsolute = (h: number): number => height * (h / 812);
export const getInsetVertical = (): number =>
  (initialWindowMetrics?.insets.top || 0) +
  (initialWindowMetrics?.insets.bottom || 0);

export const getFont = (f: number): number => {
  return RFValue(f);
};

export function RFPercentage(percent: number) {
  const heightPercent = (percent * (deviceHeight ?? 0)) / 100;
  return Math.round(heightPercent);
}

export function RFValue(fontSize: number) {
  const heightPercent =
    (((initialWindowMetrics?.insets.top ?? 0) > 20 ? fontSize : fontSize - 1) *
      (deviceHeight ?? 0)) /
    getHeight();
  return Math.round(heightPercent);
}
export const pad2 = (number: number) => String(number).padStart(2, '0');

export const getFileExtintion = (filePath = ''): string | undefined => {
  return filePath?.split('.').pop();
};
export const getFileName = (filePath = ''): string | undefined => {
  return filePath?.split('.')?.[0] || 'fileName';
};

export const isLocalFile = (fileUri: string) => {
  const subStr = fileUri?.substring(0, 5);
  if (subStr === 'https' || !fileUri) {
    return false;
  }
  return true;
};

export const customFormatDate = (dateString = 0) => {
  return moment(dateString).format('D.M.YYYY');
};

export const validatePhone = (str: string) => {
  let valid = false;
  for (let i = 0; i < str.length - 1; i++) {
    if (str.charAt(i) !== str.charAt(i + 1)) {
      valid = true;
      break;
    }
  }
  if (str.length > 10) {
    valid = false;
  }
  const reg = /^0[3-9]{1}\d{8}/;
  if (reg.test(str) && valid) {
    return true;
  } else {
    return false;
  }
};

export const validateEmail = (email: string) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z+\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

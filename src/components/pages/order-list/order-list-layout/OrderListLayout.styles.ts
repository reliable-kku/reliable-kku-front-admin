import styled from 'styled-components/native';
import {
  fontPercentage,
  heightPercentage,
  widthPercentage,
} from '../../../common/ResponsiveSize';

export const OrderView = styled.View`
  width: ${widthPercentage(1044)}px;
  height: ${heightPercentage(476)}px;
  top: ${heightPercentage(64.23)}px;
`;

export const TotalItemCnt = styled.Text`
  position: absolute;
  color: #000;
  font-size: ${fontPercentage(32)}px;
  font-weight: 600;
  top: ${heightPercentage(480)}px;
  right: ${widthPercentage(5)}px;
`;

export const RowContainer = styled.View`
  flex-direction: row;
`;

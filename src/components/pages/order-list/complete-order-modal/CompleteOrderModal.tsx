import React from 'react';
import {Modal, TouchableOpacity} from 'react-native';
import * as styles from './CompleteOrderModal.styles';
import CloseButton from '../../../../assets/images/closeButton.svg';
import {
  heightPercentage,
  widthPercentage,
} from '../../../common/ResponsiveSize';

const CompleteOrderModal: React.FC<{
  modalVisible: any;
  handleCloseModal: any;
  handleStoreModal: any;
}> = ({modalVisible, handleCloseModal, handleStoreModal}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      supportedOrientations={['landscape']}>
      <styles.OrderModalView>
        <styles.OrderModal>
          {/* 모달위부분 */}
          <styles.OrderModalTop>
            <styles.CloseBtnImg onPress={handleCloseModal}>
              <CloseButton
                width={widthPercentage(30)}
                height={heightPercentage(30)}
              />
            </styles.CloseBtnImg>
          </styles.OrderModalTop>
          {/* 모달내용 */}
          <styles.ModalBtn onPress={handleStoreModal}>
            <styles.ModalBtnText>복구</styles.ModalBtnText>
          </styles.ModalBtn>
        </styles.OrderModal>
      </styles.OrderModalView>
    </Modal>
  );
};

export default CompleteOrderModal;

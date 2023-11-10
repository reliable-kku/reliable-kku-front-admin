import React, {useState, useEffect} from 'react';
import {FlatList, Text, TouchableOpacity} from 'react-native';
import StockCat1 from '../../../../assets/images/stockCat1.svg';
import PlusMenu from '../../../../assets/images/stockPlusMenu.svg';
import * as styles from './StockManage.styles';
import PlusMenuModal from './PlusMenuModal';
import Margin from '../../../common/margin/Margin';
import axios from 'axios';
import {Image} from 'react-native';
import {BASE_API} from '../../../../api/CommonApi';
const StockManage: React.FC = () => {
  const [isPlusMenuModal, setPlusMenuModal] = useState(false);
  const [menus, setMenus] = useState<any[]>([]);
  // const [isSale, setSale] = useState();

  //메뉴
  useEffect(() => {
    const fetchMenus = async () => {
      await BASE_API.get('https://dev.deunku.com/api/v1/admin/menu')
        .then(response => {
          setMenus(response.data);
          console.log(response.data);
          console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@');
        })
        .catch(error => {
          console.error('Error fetching es:', error);
        });
    };

    fetchMenus();
  }, []);

  //품절여부
  const handleSoldOutPress = async (menuId: number, isSoldOut: boolean) => {
    try {
      const response = await BASE_API.patch(
        `https://dev.deunku.com/api/v1/admin/menu/${menuId}?isSoldOut=${isSoldOut}`,
      );
      setMenus(prevMenus => {
        const updatedMenus = prevMenus.map(menu => {
          if (menu.menuId === menuId) {
            return {...menu, isSale: !isSoldOut};
          }
          return menu;
        });
        return updatedMenus;
      });
      console.log(response);
      console.log('!!!!!!!!!!!!!!!!!!!!!!!');
    } catch (error) {
      console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
      console.error('품절 여부 선택:', error);
      console.log(!isSoldOut);
    }
  };

  const handleDeletePress = async (menuId: number) => {
    try {
      const response = await BASE_API.delete(
        `https://dev.deunku.com/api/v1/admin/menu/${menuId}`,
      );

      console.log(response);
      console.log('!!!!!!!!!!!!!!!!!!!!!!!');
    } catch (error) {
      console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
      console.error('삭제 실패:', error);
    }
  };

  const handlePlusModal = () => {
    setPlusMenuModal(!isPlusMenuModal);
  };

  const renderItem = ({item}: {item: any}) => (
    <styles.StockManageView>
      <Margin height={62} />
      <TouchableOpacity onPress={() => handleDeletePress(item.menuId)}>
        <styles.StockDeleteText>삭제</styles.StockDeleteText>
      </TouchableOpacity>
      <Margin height={5} />

      <styles.StockTitle>{item.menuName}</styles.StockTitle>
      <styles.StockCatImg>
        <Image source={{uri: item.imageUrl}} height={220} width={220} />
      </styles.StockCatImg>
      <Margin height={18} />
      <styles.StockBtn
        disabled={!item.isSale}
        onPress={() => handleSoldOutPress(item.menuId, item.isSale)}>
        <styles.StockBtnText>품절</styles.StockBtnText>
      </styles.StockBtn>
      <Margin height={14} />
      <styles.StockBtn
        disabled={item.isSale}
        onPress={() => handleSoldOutPress(item.menuId, item.isSale)}>
        <styles.StockBtnText>품절해제</styles.StockBtnText>
      </styles.StockBtn>
    </styles.StockManageView>
  );

  return (
    <>
      <styles.StockManageBox>
        <styles.StockMangeDiv>
          <FlatList
            data={menus}
            renderItem={renderItem}
            keyExtractor={item => item.menuId.toString()}
            horizontal
          />
          <styles.StockPlusBtn onPress={handlePlusModal}>
            <PlusMenu width={27} height={27} />
            <styles.StockPlusBtnText>메뉴 추가하기</styles.StockPlusBtnText>
          </styles.StockPlusBtn>
        </styles.StockMangeDiv>
      </styles.StockManageBox>
      {isPlusMenuModal && (
        <PlusMenuModal
          isPlusMenuModal={isPlusMenuModal}
          handlePlusModal={handlePlusModal}
          setPlusMenuModal={setPlusMenuModal}
        />
      )}
    </>
  );
};

export default StockManage;

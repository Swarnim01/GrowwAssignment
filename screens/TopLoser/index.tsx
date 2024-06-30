import React from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {COLORS, SIZES} from '../../constants/theme';
import {SafeAreaView} from 'react-native-safe-area-context';
import downArrow from '../../assets/icons/arrow-down.png';
import search from '../../assets/icons/search.png';
import {TOP_LOSER} from '../../constants/url';
const TopLoser = ({
  topLosers,
  navigation,
}: {
  topLosers: any;
  navigation?: any;
}) => {
  const renderItem = ({item}: {item: any}) => {
    return (
      <TouchableOpacity
        style={styles.item}
        onPress={() =>
          navigation.navigate('Product', {
            screen: TOP_LOSER,
            ticker: item?.ticker,
            price: item?.price,
            changePercentage: item?.change_percentage,
          })
        }>
        <View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View
              style={{
                marginRight: 10,
              }}>
              <Image
                source={search}
                resizeMode="contain"
                style={styles.avatar}
              />
            </View>
            <Text style={{color: COLORS.white, fontSize: 16}}>
              {item?.ticker}
            </Text>
          </View>
        </View>
        <View>
          <Text style={{color: COLORS.white}}>$ {item?.price}</Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              source={downArrow}
              resizeMode="contain"
              style={styles.downArrowImage}
            />
            <Text style={{color: COLORS.red, fontSize: 13}}>
              {item?.change_percentage}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        numColumns={2}
        horizontal={false}
        showsVerticalScrollIndicator={false}
        data={topLosers}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
    paddingTop: 30,
    paddingHorizontal: 10,
  },
  item: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: COLORS.tertiary,
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 8,
    height: 150,
    width: '45%',
    borderRadius: SIZES.radius * 0.5,
  },
  avatar: {
    width: 15,
    height: 15,
    tintColor: COLORS.white,
  },
  downArrowImage: {
    width: 7,
    height: 7,
    marginRight: 3,
    tintColor: COLORS.red,
  },
});

export default TopLoser;

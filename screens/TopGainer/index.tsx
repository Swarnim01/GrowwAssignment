import React from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {COLORS, SIZES} from '../../constants/theme';
import upArrow from '../../assets/icons/up-arrows.png';
import search from '../../assets/icons/search.png';
import {TOP_GAINER} from '../../constants/url';
const TopGainer = ({
  topGainers,
  navigation,
}: {
  topGainers: any;
  navigation?: any;
}) => {
  const renderItem = ({item}: {item: any}) => {
    return (
      <TouchableOpacity
        style={styles.item}
        onPress={() =>
          navigation.navigate('Product', {
            screen: TOP_GAINER,
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
              source={upArrow}
              resizeMode="contain"
              style={styles.arrowImage}
            />
            <Text style={{color: COLORS.green, fontSize: 13}}>
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
        data={topGainers}
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
    paddingTop: SIZES.padding * 3,
    paddingHorizontal: SIZES.padding,
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
    borderRadius: SIZES.radius * 0.3,
  },
  arrowImage: {
    width: 7,
    height: 7,
    marginRight: 3,
    tintColor: 'green',
  },
  avatar: {
    width: 15,
    height: 15,
    tintColor: COLORS.white,
  },
});
export default TopGainer;

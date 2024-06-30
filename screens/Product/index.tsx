import React, {useCallback, useEffect, useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {OVERVIEW, TOP_LOSER} from '../../constants/url';
import {COLORS, SIZES} from '../../constants/theme';
import {SafeAreaView} from 'react-native-safe-area-context';
import LineGraph from '../../components/LineGraph';
import upArrow from '../../assets/icons/up-arrows.png';
import search from '../../assets/icons/search.png';
import getCachedUrlContent from '../../utils/cache';
import LoadingScreen from '../../components/Loading';
import downArrow from '../../assets/icons/arrow-down.png';

interface ProductProps {
  route: {
    params: {
      screen: string;
      ticker: string;
      price: string;
      changePercentage: string;
    };
  };
}
const Product = ({route}: ProductProps) => {
  const [loading, setLoading] = useState(true);
  const {ticker, price, changePercentage, screen} = route.params;
  const [data, setData] = useState<any>(null);
  const fetchData = useCallback(async () => {
    try {
      const result = await getCachedUrlContent({
        urlAsKey: ticker,
        expireInMinutes: 4000,
        url: `${process.env.API_URL}?function=${OVERVIEW}&symbol=${ticker}&apikey=${process.env.API_KEY}`,
      });
      setData(result);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, [ticker]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);
  const renderHeader = useCallback(
    () => (
      <View style={styles.headerContainer}>
        <View style={styles.headerNested}>
          <Image source={search} resizeMode="contain" style={styles.avatar} />
        </View>
        <View style={{flexDirection: 'row', maxWidth: '60%'}}>
          <View>
            <Text style={{color: COLORS.white}}>{data?.Name}</Text>
            <Text
              style={{
                fontSize: SIZES.body5,
              }}>{`${ticker} , ${data?.AssetType}`}</Text>
            <Text style={styles.statisticValue}>{data?.Exchange}</Text>
          </View>
        </View>
        <View>
          <Text style={{color: COLORS.white, textAlign: 'right'}}>
            $ {price}
          </Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text
              style={{
                color: screen === TOP_LOSER ? COLORS.red : COLORS.green,
                fontSize: 12,
                textAlign: 'right',
              }}>
              {`${changePercentage}`}
            </Text>
            {screen === TOP_LOSER ? (
              <Image
                source={downArrow}
                resizeMode="contain"
                style={styles.downArrowImage}
              />
            ) : (
              <Image
                source={upArrow}
                resizeMode="contain"
                style={styles.arrowImage}
              />
            )}
          </View>
        </View>
      </View>
    ),
    [data, price, changePercentage, ticker, screen],
  );
  if (loading) {
    return <LoadingScreen />;
  }
  return (
    <SafeAreaView style={styles.container}>
      {renderHeader()}
      <LineGraph />
      <View
        style={{
          marginTop: SIZES.base,
        }}>
        <Text
          style={{
            marginBottom: 10,
            color: COLORS.white,
          }}>{`About ${data?.Name}`}</Text>
      </View>
      <View>
        <Text style={{fontSize: 13}}>{data?.Description}</Text>
        <View style={styles.tagContainer}>
          <View style={styles.tag}>
            <Text
              style={{
                fontSize: SIZES.base,
              }}>{`Industry : ${data?.Industry}`}</Text>
          </View>
          <View style={styles.tag}>
            <Text
              style={{fontSize: SIZES.base}}>{`Sector : ${data?.Sector}`}</Text>
          </View>
        </View>
        <View style={styles.statisticsContainer}>
          <View>
            <View style={styles.statistic}>
              <Text style={styles.statisticLabel}>Market Cap</Text>
              <Text style={styles.statisticValue}>
                {data?.MarketCapitalization}
              </Text>
            </View>
            <View style={styles.statistic}>
              <Text style={styles.statisticLabel}>Beta</Text>
              <Text style={styles.statisticValue}>{data?.Beta}</Text>
            </View>
          </View>
          <View>
            <View style={styles.statistic}>
              <Text style={styles.statisticLabel}>P/E Ratio</Text>
              <Text style={styles.statisticValue}>{data?.PERatio}</Text>
            </View>
            <View style={styles.statistic}>
              <Text style={styles.statisticLabel}>Dividend Yield</Text>
              <Text style={styles.statisticValue}>{data?.DividendYield}</Text>
            </View>
          </View>
          <View>
            <View style={styles.statistic}>
              <Text style={styles.statisticLabel}>EBITDA</Text>
              <Text style={styles.statisticValue}>{data?.EBITDA}</Text>
            </View>
            <View style={styles.statistic}>
              <Text style={styles.statisticLabel}>Profit Margin</Text>
              <Text style={styles.statisticValue}>{data?.ProfitMargin}</Text>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
    paddingTop: SIZES.padding * 3,
    paddingHorizontal: SIZES.padding2,
  },
  arrowImage: {
    width: 10,
    height: 10,
    marginHorizontal: 3,
    tintColor: 'green',
  },
  downArrowImage: {
    width: 10,
    height: 10,
    marginRight: 3,
    tintColor: COLORS.red,
  },
  avatar: {
    width: 25,
    height: 25,
    tintColor: COLORS.white,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SIZES.padding,
  },
  headerNested: {
    padding: SIZES.padding * 1.5,
    borderColor: COLORS.tertiary,
    borderWidth: 1,
    borderRadius: SIZES.radius * 2,
    marginRight: 5,
  },
  tagContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: SIZES.padding * 2,
    flexWrap: 'wrap',
  },
  tag: {
    backgroundColor: '#496ebc',
    padding: SIZES.padding,
    marginRight: 10,
    marginVertical: 5,
    borderRadius: SIZES.radius,
  },
  tagText: {
    fontSize: SIZES.base,
  },
  statisticsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statistic: {
    marginVertical: 5,
  },
  statisticLabel: {
    fontSize: SIZES.body5,
    color: COLORS.white,
  },
  statisticValue: {
    fontSize: SIZES.body5,
  },
});
export default Product;

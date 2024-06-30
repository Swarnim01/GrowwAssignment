import React, {useEffect, useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import TopGainer from '../screens/TopGainer';
import TopLoser from '../screens/TopLoser';
import {COLORS} from '../constants/theme';
import {Image, View} from 'react-native';
import bull from '../assets/icons/trend.png';
import bear from '../assets/icons/down-arrow.png';
import {TOP_GAINERS_LOSERS} from '../constants/url';
import getCachedUrlContent from '../utils/cache';
import LoadingScreen from '../components/Loading';

const Tab = createBottomTabNavigator();
type DataType = {
  top_gainers: any[];
  top_losers: any[];
};
const TabIcon = React.memo(
  ({icon, color, focused}: {icon: any; color: string; focused: boolean}) => (
    <View>
      <Image
        source={icon}
        resizeMode="contain"
        style={{
          width: 25,
          height: 25,
          tintColor: focused ? color : 'grey',
        }}
      />
    </View>
  ),
);
const TabNavigator = ({navigation}: {navigation?: any}) => {
  const [data, setData] = useState<DataType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getCachedUrlContent({
          urlAsKey: TOP_GAINERS_LOSERS,
          expireInMinutes: 4000,
          url: `${process.env.API_URL}?function=${TOP_GAINERS_LOSERS}&apikey=${process.env.API_KEY}`,
        });
        setData(result);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);
  if (loading) {
    return <LoadingScreen />;
  }
  return (
    <>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {backgroundColor: COLORS.secondary},
          tabBarActiveTintColor: COLORS.white,
        }}>
        <Tab.Screen
          name="TOP GAINERS"
          options={{
            tabBarIcon: ({focused}) => (
              <TabIcon icon={bull} focused={focused} color={COLORS.green} />
            ),
          }}>
          {() => (
            <TopGainer
              topGainers={(data as any)?.top_gainers}
              navigation={navigation}
            />
          )}
        </Tab.Screen>
        <Tab.Screen
          name="TOP LOSERS"
          options={{
            tabBarIcon: ({focused}) => (
              <TabIcon icon={bear} focused={focused} color={COLORS.red} />
            ),
          }}>
          {() => (
            <TopLoser
              topLosers={(data as any)?.top_losers}
              navigation={navigation}
            />
          )}
        </Tab.Screen>
      </Tab.Navigator>
    </>
  );
};

export default TabNavigator;

import React from 'react';
import {View} from 'react-native';
import {LineChart} from 'react-native-gifted-charts';
import {COLORS, SIZES} from '../constants/theme';
const LineGraph = () => {
  const lineData = [
    {value: 100.0},
    {value: 98.23},
    {value: 95.67},
    {value: 97.12},
    {value: 92.56},
    {value: 94.78},
    {value: 93.34},
    {value: 96.45},
    {value: 98.22},
    {value: 95.3},
    {value: 105.4},
    {value: 104.12},
    {value: 102.34},
    {value: 106.78},
    {value: 110.45},
    {value: 108.23},
    {value: 106.12},
    {value: 109.34},
    {value: 112.45},
    {value: 115.56},
    {value: 97.4},
    {value: 96.12},
    {value: 94.34},
    {value: 95.78},
    {value: 99.45},
    {value: 97.23},
    {value: 100.12},
    {value: 102.34},
    {value: 105.45},
    {value: 108.56},
    {value: 88.3},
    {value: 90.12},
    {value: 87.34},
    {value: 89.78},
    {value: 92.45},
    {value: 94.23},
    {value: 91.12},
    {value: 93.34},
    {value: 96.45},
    {value: 99.56},
  ];
  return (
    <View style={{paddingVertical: 5}}>
      <LineChart
        width={SIZES.width * 0.8}
        yAxisTextStyle={{fontSize: 8}}
        yAxisLabelPrefix="$"
        areaChart
        curved
        hideDataPoints
        isAnimated
        animationDuration={1000}
        startFillColor="#496ebc"
        startOpacity={0.5}
        endOpacity={0}
        initialSpacing={0}
        data={lineData}
        spacing={10}
        thickness={1}
        hideRules
        yAxisColor={COLORS.tertiary}
        xAxisColor={COLORS.tertiary}
        color="#496ebc"
      />
    </View>
  );
};

export default LineGraph;

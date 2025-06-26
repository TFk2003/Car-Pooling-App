import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { LineChart, BarChart, PieChart } from "react-native-svg-charts";
import * as shape from "d3-shape";

const { width } = Dimensions.get("window");

// Line Chart Component
export const LineChartComponent = ({
  data,
  height = 200,
  color = "#54D9CC",
  showGrid = true,
  animate = true,
}) => {
  return (
    <View style={styles.chartContainer}>
      <LineChart
        style={{ height, width: width - 32 }}
        data={data}
        svg={{ stroke: color, strokeWidth: 3 }}
        curve={shape.curveNatural}
        animate={animate}
        animationDuration={1000}
        contentInset={{ top: 20, bottom: 20, left: 20, right: 20 }}
      />
    </View>
  );
};

// Bar Chart Component
export const BarChartComponent = ({
  data,
  height = 200,
  color = "#54D9CC",
  spacing = 0.1,
}) => {
  return (
    <View style={styles.chartContainer}>
      <BarChart
        style={{ height, width: width - 32 }}
        data={data}
        svg={{ fill: color }}
        spacing={spacing}
        contentInset={{ top: 20, bottom: 20, left: 20, right: 20 }}
      />
    </View>
  );
};

// Pie Chart Component
export const PieChartComponent = ({
  data,
  height = 200,
  innerRadius = 0,
  outerRadius,
}) => {
  const colors = ["#54D9CC", "#34D399", "#60A5FA", "#A78BFA", "#F472B6"];

  const pieData = data.map((value, index) => ({
    value,
    svg: {
      fill: colors[index % colors.length],
    },
    key: `pie-${index}`,
  }));

  return (
    <View style={[styles.chartContainer, { height }]}>
      <PieChart
        style={{ height, width: height }}
        data={pieData}
        innerRadius={innerRadius}
        outerRadius={outerRadius || height / 2 - 10}
        labelRadius={outerRadius || height / 2 - 40}
      />
    </View>
  );
};

// Usage Example Component
export const ChartsExample = () => {
  // Sample data
  const lineData = [
    50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80,
  ];
  const barData = [14, 18, 23, 25, 32, 38, 43, 56, 12, 8];
  const pieData = [23, 18, 35, 12, 8];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ride Statistics</Text>

      {/* Line Chart */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Daily Rides</Text>
        <LineChartComponent data={lineData} color="#54D9CC" />
      </View>

      {/* Bar Chart */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Weekly Overview</Text>
        <BarChartComponent data={barData} color="#34D399" />
      </View>

      {/* Pie Chart */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Ride Types</Text>
        <PieChartComponent data={pieData} height={180} innerRadius={30} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 24,
    textAlign: "center",
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 16,
  },
  chartContainer: {
    backgroundColor: "#F9FAFB",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
  },
});

export default {
  LineChartComponent,
  BarChartComponent,
  PieChartComponent,
  ChartsExample,
};

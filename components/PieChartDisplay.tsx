import { Box, Stack, Typography } from "@mui/material";
import React, { FC, PureComponent, useMemo } from "react";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from "recharts";

const COLORS = ["#A259FF", "#FFC107", "#F24E1E", "#6497B1"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}: {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
  index: number;
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

type Props = {
  items: { name: string | undefined; id: string; percentage: number }[];
};

export const PieChartDisplay: FC<Props> = ({ items }) => {
  const data = useMemo(() => {
    return items.map((item) => ({
      name: item.name || "",
      value: item.percentage,
    }));
  }, [items]);

  return (
    <Stack spacing={2}>
      {/* <Box bgcolor="#F1FAFE" p={3} borderRadius={3}></Box> */}
      <Stack
        spacing={2}
        direction="row"
        justifyContent="center"
        alignItems="center"
        bgcolor="#F1FAFE"
        p={3}
        borderRadius={3}
      >
        {items.map((item, index) => (
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            key={item.name}
          >
            <Box
              width={15}
              height={15}
              borderRadius={1}
              bgcolor={COLORS[index]}
            />
            <Typography>{item.name}</Typography>
          </Stack>
        ))}
      </Stack>
      <ResponsiveContainer
        width="100%"
        height="100%"
        minWidth={300}
        minHeight={300}
      >
        <PieChart width={400} height={400}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </Stack>
  );
};

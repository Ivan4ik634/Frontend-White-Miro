'use client';

import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui';
import { ScheduleTasksT } from '@/types/Task';
import dayjs from 'dayjs';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useState } from 'react';

const chartConfig = {
  tasksDone: {
    label: 'Tasks done',
    color: 'var(--chart-1)',
  },
} satisfies ChartConfig;
/**
 * 
 * return data.filter(item =>
        dayjs(item.createdAt).format('YYYY-MM') === date.format('YYYY-MM')
      );
 */
interface Props {
  data: ScheduleTasksT[];
}
export const TasksChart: React.FC<Props> = ({ data }) => {
  const [variant, setVariant] = useState('Month');
  const filteredData = data.filter((item) => {
    if (variant === 'Month') {
      return dayjs(item.createdAt).format('YYYY-MM') === dayjs().format('YYYY-MM');
    } else if (variant === 'Week') {
      return dayjs(item.createdAt).isAfter(dayjs().subtract(7, 'day'));
    }
  });
  return (
    <Card className=" w-full max-[900px]:h-auto max-[900px]:aspect-video">
      <CardHeader>
        <CardTitle>Tasks dones</CardTitle>
        <CardDescription>Last {variant}</CardDescription>
        <CardAction className="flex items-center gap-x-2">
          <ArrowLeft
            onClick={() => setVariant('Week')}
            className={`${variant === 'Week' ? 'opacity-50' : ''}`}
          />
          <p className="font-semibold">{variant}</p>
          <ArrowRight
            onClick={() => setVariant('Month')}
            className={`${variant === 'Month' ? 'opacity-50' : ''}`}
          />
        </CardAction>
      </CardHeader>
      <CardContent className="w-full h-[300px]">
        <ChartContainer className="h-full w-full" config={chartConfig}>
          <BarChart accessibilityLayer data={filteredData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="createdAt"
              tickLine={false}
              tickMargin={5}
              axisLine={false}
              tickFormatter={(value) => dayjs(value).format('DD MMM')}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Bar dataKey="tasksDone" fill="var(--color-tasksDone)" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

import React from 'react';
import { PageContainer } from '@ant-design/pro-components';
import { Card, Col, Row, Statistic, Space } from 'antd';
import { Line, Column, Pie, Gauge } from '@ant-design/charts';
import { 
  TeamOutlined, 
  HomeOutlined, 
  RiseOutlined,
  FallOutlined 
} from '@ant-design/icons';
import styles from './index.less';

const Dashboard: React.FC = () => {
  // 模拟数据
  const dailyEggData = [
    { date: '2024-01-01', count: 45 },
    { date: '2024-01-02', count: 52 },
    { date: '2024-01-03', count: 48 },
    { date: '2024-01-04', count: 58 },
    { date: '2024-01-05', count: 55 },
    { date: '2024-01-06', count: 60 },
    { date: '2024-01-07', count: 53 },
  ];

  const nestBoxUtilization = [
    { type: '空闲', value: 15 },
    { type: '使用中', value: 25 },
    { type: '维护中', value: 5 },
  ];

  const gooseAgeDistribution = [
    { age: '1-2岁', count: 30 },
    { age: '2-3岁', count: 45 },
    { age: '3-4岁', count: 35 },
    { age: '4-5岁', count: 20 },
    { age: '5岁以上', count: 10 },
  ];

  const lineConfig = {
    data: dailyEggData,
    xField: 'date',
    yField: 'count',
    smooth: true,
    point: {
      size: 5,
      shape: 'diamond',
    },
    label: {
      style: {
        fill: '#aaa',
      },
    },
  };

  const pieConfig = {
    data: nestBoxUtilization,
    angleField: 'value',
    colorField: 'type',
    radius: 0.8,
    label: {
      type: 'spider',
      labelHeight: 28,
      content: '{name}\n{percentage}',
    },
    interactions: [
      {
        type: 'element-selected',
      },
      {
        type: 'element-active',
      },
    ],
  };

  const columnConfig = {
    data: gooseAgeDistribution,
    xField: 'age',
    yField: 'count',
    label: {
      position: 'middle',
      style: {
        fill: '#FFFFFF',
        opacity: 0.6,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
  };

  const gaugeConfig = {
    percent: 0.75,
    range: {
      color: 'l(0) 0:#B8E1FF 1:#3D76DD',
    },
    startAngle: Math.PI,
    endAngle: 2 * Math.PI,
    indicator: null,
    statistic: {
      title: {
        offsetY: -36,
        style: {
          fontSize: '36px',
          color: '#4B535E',
        },
        formatter: () => '产蛋率',
      },
      content: {
        style: {
          fontSize: '24px',
          lineHeight: '44px',
          color: '#4B535E',
        },
        formatter: () => '75%',
      },
    },
  };

  return (
    <PageContainer>
      <div className={styles.dashboard}>
        {/* 统计卡片 */}
        <Row gutter={[16, 16]}>
          <Col span={6}>
            <Card className={styles.statCard}>
              <Statistic
                title="种鹅总数"
                value={140}
                prefix={<TeamOutlined />}
                suffix="只"
                valueStyle={{ color: '#3f8600' }}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card className={styles.statCard}>
              <Statistic
                title="今日产蛋"
                value={53}
                prefix={<RiseOutlined />}
                suffix="枚"
                valueStyle={{ color: '#cf1322' }}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card className={styles.statCard}>
              <Statistic
                title="产蛋箱总数"
                value={45}
                prefix={<HomeOutlined />}
                suffix="个"
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card className={styles.statCard}>
              <Statistic
                title="平均温度"
                value={25.6}
                suffix="°C"
                precision={1}
              />
            </Card>
          </Col>
        </Row>

        {/* 图表展示 */}
        <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
          <Col span={12}>
            <Card title="每日产蛋趋势" className={styles.chartCard}>
              <Line {...lineConfig} height={300} />
            </Card>
          </Col>
          <Col span={12}>
            <Card title="产蛋箱使用情况" className={styles.chartCard}>
              <Pie {...pieConfig} height={300} />
            </Card>
          </Col>
        </Row>

        <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
          <Col span={12}>
            <Card title="种鹅年龄分布" className={styles.chartCard}>
              <Column {...columnConfig} height={300} />
            </Card>
          </Col>
          <Col span={12}>
            <Card title="产蛋率监测" className={styles.chartCard}>
              <Gauge {...gaugeConfig} height={300} />
            </Card>
          </Col>
        </Row>
      </div>
    </PageContainer>
  );
};

export default Dashboard; 
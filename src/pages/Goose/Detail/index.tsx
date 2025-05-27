import React from 'react';
import { PageContainer } from '@ant-design/pro-components';
import { Card, Descriptions, Tag, Row, Col, Statistic, Image, Timeline } from 'antd';
import { Line } from '@ant-design/charts';
import { useParams } from '@umijs/max';
import styles from './index.less';

const GooseDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  // 模拟数据
  const gooseInfo = {
    id: id,
    code: 'G001',
    age: 2,
    weight: 4.5,
    height: 45,
    breed: '狮头鹅',
    photo: 'https://images.unsplash.com/photo-1580789951383-7cec0f79ce14?w=400',
    status: 'healthy',
    totalEggs: 120,
    avgEggsPerMonth: 10,
    lastEggDate: '2024-01-07',
    healthRecords: [
      { date: '2024-01-05', event: '常规体检', result: '健康' },
      { date: '2023-12-20', event: '疫苗接种', result: '已完成' },
      { date: '2023-11-15', event: '体重测量', result: '4.3kg' },
    ],
  };

  // 产蛋趋势数据
  const eggTrendData = [
    { month: '2023-08', count: 8 },
    { month: '2023-09', count: 10 },
    { month: '2023-10', count: 12 },
    { month: '2023-11', count: 11 },
    { month: '2023-12', count: 9 },
    { month: '2024-01', count: 7 },
  ];

  const lineConfig = {
    data: eggTrendData,
    xField: 'month',
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
    yAxis: {
      title: {
        text: '产蛋数量（枚）',
      },
    },
    xAxis: {
      title: {
        text: '月份',
      },
    },
  };

  const getStatusTag = (status: string) => {
    const statusMap: Record<string, { color: string; text: string }> = {
      healthy: { color: 'green', text: '健康' },
      sick: { color: 'red', text: '生病' },
      rest: { color: 'orange', text: '休息期' },
    };
    return statusMap[status] || { color: 'default', text: '未知' };
  };

  return (
    <PageContainer
      title={`种鹅档案 - ${gooseInfo.code}`}
      onBack={() => window.history.back()}
    >
      <div className={styles.detailContainer}>
        <Row gutter={[16, 16]}>
          <Col span={8}>
            <Card className={styles.photoCard}>
              <Image
                width="100%"
                src={gooseInfo.photo}
                alt={gooseInfo.code}
                className={styles.goosePhoto}
              />
              <div className={styles.basicInfo}>
                <h2>{gooseInfo.code}</h2>
                <Tag color={getStatusTag(gooseInfo.status).color} style={{ marginTop: 8 }}>
                  {getStatusTag(gooseInfo.status).text}
                </Tag>
              </div>
            </Card>
          </Col>
          
          <Col span={16}>
            <Card title="基本信息" className={styles.infoCard}>
              <Descriptions column={2}>
                <Descriptions.Item label="编号">{gooseInfo.code}</Descriptions.Item>
                <Descriptions.Item label="品种">{gooseInfo.breed}</Descriptions.Item>
                <Descriptions.Item label="年龄">{gooseInfo.age}岁</Descriptions.Item>
                <Descriptions.Item label="体重">{gooseInfo.weight}kg</Descriptions.Item>
                <Descriptions.Item label="身高">{gooseInfo.height}cm</Descriptions.Item>
                <Descriptions.Item label="最近产蛋">{gooseInfo.lastEggDate}</Descriptions.Item>
              </Descriptions>
            </Card>

            <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
              <Col span={12}>
                <Card className={styles.statCard}>
                  <Statistic
                    title="累计产蛋"
                    value={gooseInfo.totalEggs}
                    suffix="枚"
                  />
                </Card>
              </Col>
              <Col span={12}>
                <Card className={styles.statCard}>
                  <Statistic
                    title="月均产蛋"
                    value={gooseInfo.avgEggsPerMonth}
                    suffix="枚"
                    precision={1}
                  />
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>

        <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
          <Col span={16}>
            <Card title="产蛋趋势" className={styles.chartCard}>
              <Line {...lineConfig} height={300} />
            </Card>
          </Col>
          
          <Col span={8}>
            <Card title="健康记录" className={styles.recordCard}>
              <Timeline>
                {gooseInfo.healthRecords.map((record, index) => (
                  <Timeline.Item key={index}>
                    <p className={styles.recordDate}>{record.date}</p>
                    <p className={styles.recordEvent}>{record.event}</p>
                    <p className={styles.recordResult}>{record.result}</p>
                  </Timeline.Item>
                ))}
              </Timeline>
            </Card>
          </Col>
        </Row>
      </div>
    </PageContainer>
  );
};

export default GooseDetail; 
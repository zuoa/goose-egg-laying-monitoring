import React from 'react';
import { PageContainer } from '@ant-design/pro-components';
import { Card, Descriptions, Tag, Row, Col, Statistic, Timeline, Alert, Space } from 'antd';
import { Line } from '@ant-design/charts';
import { useParams } from '@umijs/max';
import { 
  VideoCameraOutlined,
  EnvironmentOutlined,
  CloudOutlined,
  ThunderboltOutlined 
} from '@ant-design/icons';
import styles from './index.less';

const NestBoxDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  // 模拟数据
  const nestBoxInfo = {
    id: id,
    code: 'NB001',
    status: 'occupied',
    location: 'A区-1排-3号',
    temperature: 25.5,
    humidity: 65,
    currentGoose: {
      code: 'G001',
      startTime: '10:30',
      photo: 'https://images.unsplash.com/photo-1580789951383-7cec0f79ce14?w=100',
    },
    todayEggs: 2,
    monthlyEggs: 45,
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    recentActivities: [
      { time: '11:45', event: '鹅G001离开', type: 'leave' },
      { time: '10:30', event: '鹅G001进入', type: 'enter' },
      { time: '09:15', event: '收集鸡蛋2枚', type: 'collect' },
      { time: '08:00', event: '清洁消毒', type: 'clean' },
    ],
  };

  // 温湿度趋势数据
  const sensorData = [
    { time: '08:00', temperature: 24.2, humidity: 62 },
    { time: '09:00', temperature: 24.5, humidity: 63 },
    { time: '10:00', temperature: 25.0, humidity: 64 },
    { time: '11:00', temperature: 25.5, humidity: 65 },
    { time: '12:00', temperature: 26.0, humidity: 66 },
    { time: '13:00', temperature: 26.2, humidity: 67 },
  ];

  const lineConfig = {
    data: sensorData,
    xField: 'time',
    yField: 'temperature',
    seriesField: 'type',
    smooth: true,
    yAxis: [
      {
        title: {
          text: '温度 (°C)',
        },
      },
      {
        title: {
          text: '湿度 (%)',
        },
      },
    ],
    geometryOptions: [
      {
        geometry: 'line',
        color: '#5B8FF9',
      },
      {
        geometry: 'line',
        yField: 'humidity',
        yAxisIndex: 1,
        color: '#5AD8A6',
      },
    ],
  };

  const getStatusTag = (status: string) => {
    const statusMap: Record<string, { color: string; text: string }> = {
      idle: { color: 'green', text: '空闲' },
      occupied: { color: 'processing', text: '使用中' },
      maintenance: { color: 'error', text: '维护中' },
    };
    return statusMap[status] || { color: 'default', text: '未知' };
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'enter':
        return <ThunderboltOutlined style={{ color: '#52c41a' }} />;
      case 'leave':
        return <ThunderboltOutlined style={{ color: '#ff4d4f' }} />;
      case 'collect':
        return <EnvironmentOutlined style={{ color: '#1890ff' }} />;
      case 'clean':
        return <CloudOutlined style={{ color: '#722ed1' }} />;
      default:
        return null;
    }
  };

  return (
    <PageContainer
      title={`产蛋箱详情 - ${nestBoxInfo.code}`}
      onBack={() => window.history.back()}
    >
      <div className={styles.detailContainer}>
        {nestBoxInfo.status === 'occupied' && nestBoxInfo.currentGoose && (
          <Alert
            message={`鹅 ${nestBoxInfo.currentGoose.code} 正在产蛋中`}
            description={`开始时间: ${nestBoxInfo.currentGoose.startTime}`}
            type="info"
            showIcon
            icon={<ThunderboltOutlined />}
            style={{ marginBottom: 16 }}
          />
        )}

        <Row gutter={[16, 16]}>
          <Col span={16}>
            <Card title="实时监控" className={styles.videoCard}>
              <div className={styles.videoContainer}>
                <video
                  width="100%"
                  height="400"
                  controls
                  autoPlay
                  muted
                  loop
                >
                  <source src={nestBoxInfo.videoUrl} type="video/mp4" />
                  您的浏览器不支持视频播放
                </video>
              </div>
            </Card>
          </Col>

          <Col span={8}>
            <Card title="基本信息" className={styles.infoCard}>
              <Descriptions column={1}>
                <Descriptions.Item label="编号">{nestBoxInfo.code}</Descriptions.Item>
                <Descriptions.Item label="位置">{nestBoxInfo.location}</Descriptions.Item>
                <Descriptions.Item label="状态">
                  <Tag color={getStatusTag(nestBoxInfo.status).color}>
                    {getStatusTag(nestBoxInfo.status).text}
                  </Tag>
                </Descriptions.Item>
                <Descriptions.Item label="当前温度">
                  <span style={{ color: '#ff7a45', fontSize: 16 }}>
                    {nestBoxInfo.temperature}°C
                  </span>
                </Descriptions.Item>
                <Descriptions.Item label="当前湿度">
                  <span style={{ color: '#1890ff', fontSize: 16 }}>
                    {nestBoxInfo.humidity}%
                  </span>
                </Descriptions.Item>
              </Descriptions>
            </Card>

            <Card className={styles.statCard} style={{ marginTop: 16 }}>
              <Row gutter={16}>
                <Col span={12}>
                  <Statistic
                    title="今日产蛋"
                    value={nestBoxInfo.todayEggs}
                    suffix="枚"
                  />
                </Col>
                <Col span={12}>
                  <Statistic
                    title="本月累计"
                    value={nestBoxInfo.monthlyEggs}
                    suffix="枚"
                  />
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>

        <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
          <Col span={16}>
            <Card title="温湿度趋势" className={styles.chartCard}>
              <Line {...lineConfig} height={300} />
            </Card>
          </Col>

          <Col span={8}>
            <Card title="最近活动" className={styles.activityCard}>
              <Timeline>
                {nestBoxInfo.recentActivities.map((activity, index) => (
                  <Timeline.Item 
                    key={index}
                    dot={getActivityIcon(activity.type)}
                  >
                    <p className={styles.activityTime}>{activity.time}</p>
                    <p className={styles.activityEvent}>{activity.event}</p>
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

export default NestBoxDetail; 
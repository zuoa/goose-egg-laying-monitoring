import React, { useState } from 'react';
import { PageContainer } from '@ant-design/pro-components';
import { Card, Col, Row, Badge, Tag, Space, Button, Tooltip, Progress } from 'antd';
import { 
  VideoCameraOutlined, 
  EnvironmentOutlined,
  ThunderboltOutlined,
  InfoCircleOutlined 
} from '@ant-design/icons';
import { history } from '@umijs/max';
import styles from './index.less';

interface NestBoxInfo {
  id: string;
  code: string;
  status: 'idle' | 'occupied' | 'maintenance';
  temperature: number;
  humidity: number;
  currentGoose?: {
    code: string;
    startTime: string;
  };
  todayEggs: number;
  hasVideo: boolean;
}

const NestBoxList: React.FC = () => {
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  // 模拟数据
  const nestBoxList: NestBoxInfo[] = [
    {
      id: '1',
      code: 'NB001',
      status: 'occupied',
      temperature: 25.5,
      humidity: 65,
      currentGoose: {
        code: 'G001',
        startTime: '10:30',
      },
      todayEggs: 2,
      hasVideo: true,
    },
    {
      id: '2',
      code: 'NB002',
      status: 'idle',
      temperature: 24.8,
      humidity: 62,
      todayEggs: 3,
      hasVideo: true,
    },
    {
      id: '3',
      code: 'NB003',
      status: 'maintenance',
      temperature: 23.2,
      humidity: 58,
      todayEggs: 0,
      hasVideo: false,
    },
    {
      id: '4',
      code: 'NB004',
      status: 'occupied',
      temperature: 26.1,
      humidity: 68,
      currentGoose: {
        code: 'G005',
        startTime: '09:15',
      },
      todayEggs: 1,
      hasVideo: true,
    },
    {
      id: '5',
      code: 'NB005',
      status: 'idle',
      temperature: 25.0,
      humidity: 64,
      todayEggs: 2,
      hasVideo: true,
    },
    {
      id: '6',
      code: 'NB006',
      status: 'occupied',
      temperature: 25.8,
      humidity: 66,
      currentGoose: {
        code: 'G003',
        startTime: '11:45',
      },
      todayEggs: 1,
      hasVideo: true,
    },
  ];

  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { status: 'success' | 'processing' | 'error' | 'default' | 'warning'; text: string }> = {
      idle: { status: 'success', text: '空闲' },
      occupied: { status: 'processing', text: '使用中' },
      maintenance: { status: 'error', text: '维护中' },
    };
    return statusMap[status] || { status: 'default', text: '未知' };
  };

  const getTemperatureColor = (temp: number) => {
    if (temp < 20 || temp > 30) return '#ff4d4f';
    if (temp < 23 || temp > 27) return '#faad14';
    return '#52c41a';
  };

  const getHumidityColor = (humidity: number) => {
    if (humidity < 50 || humidity > 80) return '#ff4d4f';
    if (humidity < 55 || humidity > 75) return '#faad14';
    return '#52c41a';
  };

  const handleCardClick = (id: string) => {
    history.push(`/nestbox/detail/${id}`);
  };

  const filteredList = nestBoxList.filter(box => 
    selectedStatus === 'all' || box.status === selectedStatus
  );

  return (
    <PageContainer
      extra={
        <Space>
          <Button 
            type={selectedStatus === 'all' ? 'primary' : 'default'}
            onClick={() => setSelectedStatus('all')}
          >
            全部
          </Button>
          <Button 
            type={selectedStatus === 'idle' ? 'primary' : 'default'}
            onClick={() => setSelectedStatus('idle')}
          >
            空闲
          </Button>
          <Button 
            type={selectedStatus === 'occupied' ? 'primary' : 'default'}
            onClick={() => setSelectedStatus('occupied')}
          >
            使用中
          </Button>
          <Button 
            type={selectedStatus === 'maintenance' ? 'primary' : 'default'}
            onClick={() => setSelectedStatus('maintenance')}
          >
            维护中
          </Button>
        </Space>
      }
    >
      <Row gutter={[16, 16]}>
        {filteredList.map(box => (
          <Col key={box.id} xs={24} sm={12} md={8} lg={6}>
            <Card
              className={styles.nestBoxCard}
              hoverable
              onClick={() => handleCardClick(box.id)}
            >
              <div className={styles.cardHeader}>
                <div className={styles.boxCode}>
                  <EnvironmentOutlined /> {box.code}
                </div>
                <Badge {...getStatusBadge(box.status)} />
              </div>

              <div className={styles.sensorInfo}>
                <div className={styles.sensorItem}>
                  <span className={styles.label}>温度</span>
                  <span 
                    className={styles.value}
                    style={{ color: getTemperatureColor(box.temperature) }}
                  >
                    {box.temperature}°C
                  </span>
                </div>
                <div className={styles.sensorItem}>
                  <span className={styles.label}>湿度</span>
                  <span 
                    className={styles.value}
                    style={{ color: getHumidityColor(box.humidity) }}
                  >
                    {box.humidity}%
                  </span>
                </div>
              </div>

              {box.status === 'occupied' && box.currentGoose && (
                <div className={styles.occupiedInfo}>
                  <ThunderboltOutlined style={{ color: '#faad14' }} />
                  <span>鹅 {box.currentGoose.code} 正在产蛋</span>
                  <span className={styles.time}>开始时间: {box.currentGoose.startTime}</span>
                </div>
              )}

              <div className={styles.cardFooter}>
                <div className={styles.eggCount}>
                  今日产蛋: <strong>{box.todayEggs}</strong> 枚
                </div>
                <Space>
                  {box.hasVideo && (
                    <Tooltip title="查看监控">
                      <VideoCameraOutlined className={styles.videoIcon} />
                    </Tooltip>
                  )}
                  <Tooltip title="详情">
                    <InfoCircleOutlined />
                  </Tooltip>
                </Space>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </PageContainer>
  );
};

export default NestBoxList; 
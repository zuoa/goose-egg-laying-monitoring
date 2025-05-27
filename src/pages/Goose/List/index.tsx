import React, { useState } from 'react';
import { PageContainer } from '@ant-design/pro-components';
import { Card, Col, Row, Avatar, Tag, Progress, Space, Input, Select, Button } from 'antd';
import { SearchOutlined, PlusOutlined } from '@ant-design/icons';
import { history } from '@umijs/max';
import styles from './index.less';

const { Search } = Input;
const { Option } = Select;

interface GooseInfo {
  id: string;
  code: string;
  age: number;
  weight: number;
  photo: string;
  eggCount: number;
  eggTrend: number; // 产蛋趋势百分比
  status: 'healthy' | 'sick' | 'rest';
}

const GooseList: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  // 模拟数据
  const gooseList: GooseInfo[] = [
    {
      id: '1',
      code: 'G001',
      age: 2,
      weight: 4.5,
      photo: 'https://images.unsplash.com/photo-1580789951383-7cec0f79ce14?w=200',
      eggCount: 120,
      eggTrend: 85,
      status: 'healthy',
    },
    {
      id: '2',
      code: 'G002',
      age: 3,
      weight: 5.2,
      photo: 'https://images.unsplash.com/photo-1580789951383-7cec0f79ce14?w=200',
      eggCount: 150,
      eggTrend: 92,
      status: 'healthy',
    },
    {
      id: '3',
      code: 'G003',
      age: 1,
      weight: 3.8,
      photo: 'https://images.unsplash.com/photo-1580789951383-7cec0f79ce14?w=200',
      eggCount: 60,
      eggTrend: 65,
      status: 'rest',
    },
    {
      id: '4',
      code: 'G004',
      age: 4,
      weight: 5.5,
      photo: 'https://images.unsplash.com/photo-1580789951383-7cec0f79ce14?w=200',
      eggCount: 180,
      eggTrend: 78,
      status: 'healthy',
    },
    {
      id: '5',
      code: 'G005',
      age: 2,
      weight: 4.2,
      photo: 'https://images.unsplash.com/photo-1580789951383-7cec0f79ce14?w=200',
      eggCount: 110,
      eggTrend: 45,
      status: 'sick',
    },
    {
      id: '6',
      code: 'G006',
      age: 3,
      weight: 4.8,
      photo: 'https://images.unsplash.com/photo-1580789951383-7cec0f79ce14?w=200',
      eggCount: 140,
      eggTrend: 88,
      status: 'healthy',
    },
  ];

  const getStatusTag = (status: string) => {
    const statusMap: Record<string, { color: string; text: string }> = {
      healthy: { color: 'green', text: '健康' },
      sick: { color: 'red', text: '生病' },
      rest: { color: 'orange', text: '休息期' },
    };
    return statusMap[status] || { color: 'default', text: '未知' };
  };

  const getTrendColor = (trend: number) => {
    if (trend >= 80) return '#52c41a';
    if (trend >= 60) return '#faad14';
    return '#f5222d';
  };

  const handleCardClick = (id: string) => {
    history.push(`/goose/detail/${id}`);
  };

  const filteredList = gooseList.filter(goose => {
    const matchSearch = goose.code.toLowerCase().includes(searchText.toLowerCase());
    const matchStatus = filterStatus === 'all' || goose.status === filterStatus;
    return matchSearch && matchStatus;
  });

  return (
    <PageContainer
      extra={
        <Button type="primary" icon={<PlusOutlined />}>
          添加种鹅
        </Button>
      }
    >
      <div className={styles.listContainer}>
        <div className={styles.searchBar}>
          <Space size="large">
            <Search
              placeholder="搜索鹅编号"
              allowClear
              enterButton={<SearchOutlined />}
              size="large"
              onSearch={setSearchText}
              style={{ width: 300 }}
            />
            <Select
              size="large"
              defaultValue="all"
              style={{ width: 150 }}
              onChange={setFilterStatus}
            >
              <Option value="all">全部状态</Option>
              <Option value="healthy">健康</Option>
              <Option value="sick">生病</Option>
              <Option value="rest">休息期</Option>
            </Select>
          </Space>
        </div>

        <Row gutter={[16, 16]}>
          {filteredList.map(goose => (
            <Col key={goose.id} xs={24} sm={12} md={8} lg={6}>
              <Card
                className={styles.gooseCard}
                hoverable
                onClick={() => handleCardClick(goose.id)}
                cover={
                  <div className={styles.coverContainer}>
                    <img
                      alt={goose.code}
                      src={goose.photo}
                      className={styles.gooseImage}
                    />
                    <div className={styles.codeOverlay}>{goose.code}</div>
                  </div>
                }
              >
                <Card.Meta
                  title={
                    <div className={styles.cardTitle}>
                      <span>编号: {goose.code}</span>
                      <Tag color={getStatusTag(goose.status).color}>
                        {getStatusTag(goose.status).text}
                      </Tag>
                    </div>
                  }
                  description={
                    <div className={styles.cardContent}>
                      <div className={styles.infoRow}>
                        <span>年龄：{goose.age}岁</span>
                        <span>体重：{goose.weight}kg</span>
                      </div>
                      <div className={styles.infoRow}>
                        <span>累计产蛋：{goose.eggCount}枚</span>
                      </div>
                      <div className={styles.trendSection}>
                        <span>产蛋趋势</span>
                        <Progress 
                          percent={goose.eggTrend} 
                          strokeColor={getTrendColor(goose.eggTrend)}
                          size="small"
                        />
                      </div>
                    </div>
                  }
                />
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </PageContainer>
  );
};

export default GooseList; 
import React, { useState } from 'react';

function StarRating({ initialRating }) {
  // 设置初始评分并创建一个更新评分的函数
  const [rating, setRating] = useState(initialRating);

  // 处理点击星星的事件，设置新的评分
  const handleStarClick = (index) => {
    setRating(index);
  };

  // 创建星星数组，根据当前评分显示填充或空星
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars.push(<span key={i} onClick={() => handleStarClick(i)} style={{ cursor: 'pointer' }}>⭐</span>);
    } else {
      stars.push(<span key={i} onClick={() => handleStarClick(i)} style={{ cursor: 'pointer' }}>☆</span>);
    }
  }

  return <div>{stars}</div>;
}

export default StarRating;

"use client";
import React, { useState } from 'react';

const Planning = () => {
  const [messageVisible, setMessageVisible] = useState(false);

  const handleClick = () => {
    setMessageVisible(true);
    setTimeout(() => {
      setMessageVisible(false);
    }, 3000);  // 消息显示3秒后消失
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Welcome to My Page!</h1>
      <p>This is a simple Next.js page.</p>
      <button onClick={handleClick}>Click me</button>
      {messageVisible && <p>Hello, you clicked the button!</p>}
    </div>
  );
};

export default Planning;

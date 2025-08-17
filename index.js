const { createApp } = require('@waline/server');
const express = require('express');

const app = createApp({
  storage: 'github', // GitHub Issues存储
  github: {
    owner: process.env.GITHUB_OWNER,
    repo: process.env.GITHUB_REPO,
    token: process.env.GITHUB_TOKEN
  },
  secureDomains: [process.env.SECURE_DOMAINS || 'https://waline-repo-nu.vercel.app'] // 修复url错误
});

app.use(express.json()); // 解析JSON请求
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Server Error' });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Waline server running on port ${port}`);
});

import express from 'express';
import path from 'path';

const fetchDocs = (req, res) => {
  res.sendFile(path.join(__dirname + '../../../out/'));
};

export { fetchDocs };

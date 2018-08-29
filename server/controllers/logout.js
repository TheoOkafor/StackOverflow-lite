import express from 'express';
import db from '../db';

const logout = (req, res) => {
	res.status(200);
	res.json({
		auth: false,
		token: null,
	});
}

export default logout;

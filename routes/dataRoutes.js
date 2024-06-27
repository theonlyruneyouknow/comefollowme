const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const Data = require('../models/data');

const router = express.Router();

router.post('/fetch-data', async (req, res) => {
  const weekNum = req.body.weekNum;
  const url = `https://www.churchofjesuschrist.org/study/manual/come-follow-me-for-home-and-church-book-of-mormon-2024/${weekNum}?lang=eng`;

  try {
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);

    const title = $('#app > div > main > div > div.contentArea-xpA9g > header > span').text();
    const date = new Date().toISOString();

    const newData = new Data({
      date: date,
      title: title,
      reference: `Reference for week ${weekNum}`,
      link: url
    });

    await newData.save();

    const data = await Data.find({});
    res.render('index', { data });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching data');
  }
});

router.get('/', async (req, res) => {
  try {
    const data = await Data.find({});
    res.render('index', { data });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching data');
  }
});

module.exports = router;

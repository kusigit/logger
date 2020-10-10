'use strict';

const Mailgun = require('mailgun-js');

const mailgun = new Mailgun({
  apiKey: process.env.MAILGUN_API_KEY,
  domain: process.env.MAILGUN_DOMAIN,
  host: process.env.MAILGUN_HOST,
});

const logToFile = (path, text) => {
  const fs = require('fs').promises;
  return fs.writeFile(`./log/${path}`, text, {flag: 'w+'});
};

const logInfo = (...text) => {
  const message = text.reduce((prev, curr) => prev + ', ' + curr);
  console.info(message);
};

const logError = (text) => {
  console.error(text);
  send(text);
};

const send = (text) => {
  try {
    text = typeof text === 'object' ? JSON.stringify(text, null, 2) : text;

    const data = {
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_TO,
      subject: process.env.EMAIL_SUBJECT,
      text: text,
    };

    console.log('message', data);

    return mailgun.messages().send(data);
  } catch (e) {
    console.error(e);
  }
};

module.exports = {
  logToFile,
  logInfo,
  logError,
  send,
};

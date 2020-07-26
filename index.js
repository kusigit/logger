'use strict';

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// const text = '';
/*
const begin = (text) => {
  this.text = '';
  this.append(text);
};

const append = (text) => {
  console.log(text);
  this.text += text;
  this.text += '\n';
};

const end = (text) => {
  this.append(text);
  this.send(this.text);
};

const logIn = (text) => {
  console.log(text);
};
*/
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
  text = typeof text === 'object' ? JSON.stringify(text, null, 2) : text;
  console.log(text);
  
  if (process.env.NODE_ENV === 'production') {
    const message = {
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_TO,
      subject: process.env.EMAIL_SUBJECT,
      text: text,
    };
    
    return sgMail.send(message);
  }
};

module.exports = {
  logToFile,
  logInfo,
  logError,
  send,
};

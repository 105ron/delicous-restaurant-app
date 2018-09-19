const pug = require('pug');
const juice = require('juice');
const htmlToText = require('html-to-text');
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

function generateHTML(filename, options = {}) {
  const html = pug.renderFile(`${__dirname}/../views/email/${filename}.pug`, options);
  const inlined = juice(html);
  return inlined;
}

exports.send = async (options) => {
  const html = generateHTML(options.fileName, options);
  const text = htmlToText.fromString(html);
  const msg = {
    html,
    text,
    to: options.user.email,
    from: 'Rhys <noreply@105ron.com>',
    subject: options.subject,
  };
  sgMail.send(msg);
};

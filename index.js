const escapeHtml = require('escape-html');
const API = require('call-of-duty-api')();

API.login(process.env.EMAIL, process.env.PASSWORD).then((output) => console.log(output)).catch((err) => console.log(err));


/**
 * HTTP Cloud Function.
 *
 * @param {Object} req Cloud Function request context.
 *                     More info: https://expressjs.com/en/api.html#req
 * @param {Object} res Cloud Function response context.
 *                     More info: https://expressjs.com/en/api.html#res
 */

// node -r dotenv/config index.js
// gcloud functions deploy codApi --runtime nodejs8 --trigger-http  --region europe-west1

exports.codApi = (req, res) => {
  const userName = req.query.name || 'christoph0088';

  console.log(userName);
  console.log(process.env.EMAIL);
  console.log(process.env.PASSWORD);

  const stats = API.MWstats(userName, API.platforms.psn).then((output) => {
    console.log(output);
    res.send(stats);
  }).catch((err) => {
    console.log(err);
  });
  // res.send(`Hello ${escapeHtml(req.query.name || req.body.name || 'World')}!`);
};

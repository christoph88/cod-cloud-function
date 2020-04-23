require('dotenv').load();
const escapeHtml = require('escape-html');
const API = require('call-of-duty-api')();

const cod = API.login(process.env.email, process.env.password);

/**
 * HTTP Cloud Function.
 *
 * @param {Object} req Cloud Function request context.
 *                     More info: https://expressjs.com/en/api.html#req
 * @param {Object} res Cloud Function response context.
 *                     More info: https://expressjs.com/en/api.html#res
 */
// gcloud functions deploy codApi --runtime nodejs8 --trigger-http  --region europe-west1
exports.codApi = (req, res) => {
  const stats = cod.MWstats('christoph0088', API.platforms.psn).then((output) => {
    console.log(output);
  })
    .catch((err) => {
      console.log(err);
    });
  // res.send(`Hello ${escapeHtml(req.query.name || req.body.name || 'World')}!`);
  res.send(stats);
};

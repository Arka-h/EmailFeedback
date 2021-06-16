const { redirectDomain } = require('../../config/keys')
module.exports = survey => {
  return `
      <html>
        <body>
          <div style="text-align: center;">
            <h3>I'd like your input!</h3>
            <p>Please answer the following question:</p>
            <p>${survey.body}</p>`+ Object.keys(survey.response).map((option)=>`
              <div>
                <a href="${redirectDomain}api/thanks">${option}</a>
              </div>`).join('')
              +
            `
          </div>
        </body>
      </html>
    `;
};

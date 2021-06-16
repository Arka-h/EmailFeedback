const { redirectDomain } = require('../../config/keys')
module.exports = survey => {
  return `
      <html>
        <body>
          <div style="text-align: center;">
            <h3>${survey.title}</h3>

            <p>${survey.body}</p>`+ Object.keys(survey.response).map((option)=>`
              <div>
                <a href="${redirectDomain}api/${survey.id}/${option}">${option}</a>
              </div>`).join('')
              +
            `
          </div>
        </body>
      </html>
    `;
};

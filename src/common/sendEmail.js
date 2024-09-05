const AWS = require('aws-sdk');
const config = require('../config');

const ses = new AWS.SES({
  apiVersion: config.aws.ses.apiVersion,
  accessKeyId: config.aws.accessKeyId,
  secretAccessKey: config.aws.secretAccessKey,
  region: config.aws.ses.region,
});

module.exports.sendVerificationEmail = (email, token) => {
  const params = {
    Destination: {
      ToAddresses: [email],
    },
    Message: {
      Body: {
        Text: {
          Charset: 'UTF-8',
          Data: `Please follow the link to verify your profile: ${config.dashboard.baseURL}/prelogin/verifyemail?token=${encodeURIComponent(token)} `,
        },
      },
      Subject: {
        Charset: 'UTF-8',
        Data: 'Email Verification- Tryio',
      },
    },
    Source: config.aws.ses.senderEmail,

  };

  // eslint-disable-next-line no-unused-vars
  ses.sendEmail(params, (err, data) => {
    if (err) {
      console.log(err);
    }
  });
};

module.exports.sendMemberSignUpEmail = (email, organizationDetails, token) => {
  const params = {
    Destination: {
      ToAddresses: [email],
    },
    Message: {
      Body: {
        Text: {
          Charset: 'UTF-8',
          Data: `${organizationDetails.name} has invited you to join their organiztion. To join, please follow: ${config.dashboard.baseURL}/prelogin/register?token=${encodeURIComponent(token)}&companyName=${encodeURIComponent(organizationDetails.name)}&email=${encodeURIComponent(email)}`,
        },
      },
      Subject: {
        Charset: 'UTF-8',
        Data: 'Member invitation- Tryio',
      },
    },
    Source: config.aws.ses.senderEmail,

  };

  // eslint-disable-next-line no-unused-vars
  ses.sendEmail(params, (err, data) => {
    if (err) {
      console.log(err);
    }
  });
};

module.exports.sendPasswordResetMail = (email, token) => {
  const params = {
    Destination: {
      ToAddresses: [email],
    },
    Message: {
      Body: {
        Text: {
          Charset: 'UTF-8',
          Data: `Please follow the link to reset your password: ${config.dashboard.baseURL}/prelogin/resetpassword?token=${encodeURIComponent(token)} `,
        },
      },
      Subject: {
        Charset: 'UTF-8',
        Data: 'Reset password link- Tryio',
      },
    },
    Source: config.aws.ses.senderEmail,

  };

  // eslint-disable-next-line no-unused-vars
  ses.sendEmail(params, (err, data) => {
    if (err) {
      console.log(err);
    }
  });
};



module.exports.bookmydemo = (email,name,message,company,receiver) => {
  const params = {
    Destination: {
      ToAddresses: [receiver],
    },
    Message: {
      Body: {
        Text: {
          Charset: 'UTF-8',
          Data:  message+"\n\nName: "+name+"\nEmail: "+email+"\nCompany: "+company
          ,
        },///////////
        
        //////////
      },
      Subject: {
        Charset: 'UTF-8',
        Data: 'Book A Demo',
      },
    },
    Source: config.aws.ses.senderEmail,

  };

  // eslint-disable-next-line no-unused-vars
  ses.sendEmail(params, (err, data) => {
    if (err) {
      console.log(err);
    }
  });
};

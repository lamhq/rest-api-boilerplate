import { StringValue } from 'ms';
import { MailerOptions } from '@nestjs-modules/mailer';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';

/**
 * Contains a set of properties that are used to configure the application
 */
export interface IConfiguration {
  // the port number on which the application will run
  port: number;

  // value of NODE_ENV variable, use by express and other libraries
  // possible values: `development`, `production`
  nodeEnv: string;

  // runtime environment in which the application is run.
  // possible values: 'local' | 'dev' | 'staging' | 'prod'
  environment: string;

  // name of the system
  appName: string;

  // config for sending emails
  mail: MailerOptions & { senderEmail: string };

  // authentication options
  auth: {
    // Access token lifetime, expressed in a string
    // describing a time span: [zeit/ms](https://github.com/zeit/ms.js).
    // E.g.: 60, "2 days", "10h", "7d"
    accessTokenLifetime: StringValue;

    // secret to generate jwt
    jwtSecret: string;
  };
}

export const configFactory = (): IConfiguration => ({
  port: parseInt(process.env.PORT || '3000', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  environment: process.env.RUNTIME_ENV || 'local',
  appName: 'API Boilerplate',
  mail: {
    transport: {
      host: process.env.SMTP_HOST || 'localhost',
      port: (process.env.SMTP_PORT && parseInt(process.env.SMTP_PORT, 10)) || 1025,
      auth: process.env.SMTP_USER
        ? {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PWD || '',
          }
        : undefined,
    },
    defaults: {
      from: process.env.FROM_EMAIL,
    },
    template: {
      adapter: new EjsAdapter(),
      dir: `${__dirname}/assets/email-templates`,
      options: {
        strict: false,
      },
    },
    senderEmail: 'support@example.com',
  },
  auth: {
    accessTokenLifetime: '3d',
    jwtSecret: 'tPmdfvPWW6dH4qb7',
  },
});

export default configFactory;

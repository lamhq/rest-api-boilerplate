// import { TypeOrmModuleOptions } from '@nestjs/typeorm';
// import { MailerOptions } from '@nestjs-modules/mailer';
// import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';

export interface IConfiguration {
  // value of NODE_ENV variable, use by express and other libraries
  // can be `development`, `production`
  nodeEnv: string;

  // runtime environment: 'demo' | 'local' | 'dev' | 'staging' | 'prod'
  environment: string;

  appName: string;

  notificationEmail: string;
  supportEmail: string;
  address: string;
  auth: {
    // Access token lifetime, expressed in seconds
    // or a string describing a time span:
    // [zeit/ms](https://github.com/zeit/ms.js).
    // Eg: 60, "2 days", "10h", "7d"
    accessTokenLifetime: string | number;
    resetPasswordTokenLifetime: string | number;
    // secret to generate token
    secret: string;
  };
  // typeorm: TypeOrmModuleOptions;
  // mail: TypeOrmModuleOptions & { senderEmail: string };
}

export const configFactory = (): IConfiguration => ({
  nodeEnv: process.env.NODE_ENV || 'development',
  environment: process.env.ENV || 'local',
  appName: 'API Boilerplate',
  notificationEmail: process.env.NOTIFICATION_EMAIL || 'notifications@gravitylabs.co',
  supportEmail: process.env.SUPPORT_EMAIL || 'support@gravitylabs.co',
  address: process.env.ADDRESS || 'Gravity Labs, 3350 Virginia St., Miami, FL',
  auth: {
    accessTokenLifetime: '1y',
    secret: 'tPmdfvPWW6dH4qb7',
    resetPasswordTokenLifetime: '15m',
  },
  // typeorm: {
  //   type: 'postgres',
  //   url: process.env.DB_URI || 'postgresql://localhost:5432/gravity',
  //   autoLoadEntities: true,
  // },
  // mail: {
  //   transport: {
  //     host: process.env.SMTP_HOST || 'localhost',
  //     port: (process.env.SMTP_PORT && parseInt(process.env.SMTP_PORT, 10)) || 1025,
  //     auth: process.env.SMTP_USER
  //       ? {
  //           user: process.env.SMTP_USER,
  //           pass: process.env.SMTP_PWD || '',
  //         }
  //       : undefined,
  //   },
  //   defaults: {
  //     from: process.env.FROM_EMAIL,
  //   },
  //   template: {
  //     adapter: new EjsAdapter(),
  //     dir: `${__dirname}/assets/email-templates`,
  //     options: {
  //       strict: false,
  //     },
  //   },
  // senderEmail: process.env.SENDER_EMAIL || 'gravity@gravitylabs.co',
  // },
});

export default configFactory;

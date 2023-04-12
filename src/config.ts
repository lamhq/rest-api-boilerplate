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
}

export const configFactory = (): IConfiguration => ({
  port: parseInt(process.env.PORT || '3000', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  environment: process.env.RUNTIME_ENV || 'local',
  appName: 'API Boilerplate',
});

export default configFactory;

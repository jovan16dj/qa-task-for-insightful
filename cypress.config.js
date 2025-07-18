import { defineConfig } from 'cypress';
import webpack from '@cypress/webpack-preprocessor';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  e2e: {
    defaultCommandTimeout: 20000,  // added these insane timeouts due to *very* slow load times
    pageLoadTimeout: 60000, 
    setupNodeEvents(on, config) {
      const options = {
        webpackOptions: {
          resolve: {
            extensions: ['.js', '.jsx', '.ts', '.tsx', '.mjs'],
            alias: {
              '@pages': path.resolve('./cypress/pages'),
              '@routes': path.resolve('./cypress/support/routes.js'),
              '@support': path.resolve('./cypress/support'),
              '@fixtures': path.resolve('./cypress/fixtures'),
              '@basepages': path.resolve('./cypress/pages/base'),
            },
          },
          module: {
            rules: [
              {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                  loader: 'babel-loader',
                  options: {
                    presets: ['@babel/preset-env'],
                    sourceType: 'unambiguous',
                  },
                },
              },
            ],
          },
        },
      };
      on('file:preprocessor', webpack(options));
      return config;
    },
    baseUrl: 'https://opensource-demo.orangehrmlive.com',
    env: {
      username: process.env.USERNAME,
      password: process.env.PASSWORD,
    },
    specPattern: 'cypress/e2e/**/*.cy.js',
    supportFile: 'cypress/support/e2e.js',
  },
  downloadsFolder: 'cypress/downloads',
  retries: {
    runMode: 1,
    openMode: 0,
  },
  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: 'cypress/reports',
    overwrite: false,
    html: true,
    json: true,
  },
});

import * as webpackConfig from '../../webpack.config';
import * as webpack from 'webpack';
let project = require('../aurelia.json');
import {  } from "../";
import {CLIOptions, Configuration} from 'aurelia-cli';
import * as gulp from 'gulp';
import configureEnvironment from './environment';
import * as del from 'del';

const buildOptions = new Configuration(project.build.options);
const production = CLIOptions.getEnvironment() === 'prod';
const server = buildOptions.isApplicable('server');
const extractCss = buildOptions.isApplicable('extractCss');
const coverage = buildOptions.isApplicable('coverage');

const prepare = gulp.series(
  clearDist,
  configureEnvironment
);

function clearDist() {
  return del([project.platform.output]);
}

export {
    prepare as default
};

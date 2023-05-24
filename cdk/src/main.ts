#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { ShopStack } from './main/app/shop-stack';

const app = new cdk.App();
new ShopStack(app, 'ShopStack', {});

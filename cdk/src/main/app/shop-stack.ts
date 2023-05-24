import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { aws_s3 as s3 } from 'aws-cdk-lib';
import * as S3Deployment from 'aws-cdk-lib/aws-s3-deployment';
import * as path from "path";

export class ShopStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const bucket = new s3.Bucket(this, 'ShopStaticSiteServeBucket', {
      versioned: true,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
      websiteIndexDocument: 'index.html',
      websiteErrorDocument: 'index.html',
      // TODO remove it after cloudfront setup
      publicReadAccess: true,
    });

    new S3Deployment.BucketDeployment(this, 'ShopStaticSiteServeBucketDeployment', {
      destinationBucket: bucket,
      sources: [S3Deployment.Source.asset(path.resolve(__dirname, '..', '..', '..', '..', 'dist'))],
    });

    new cdk.CfnOutput(this, 'bucketUrl', {
      value: bucket.bucketWebsiteUrl,
      description: 'The URL of the bucket',
      exportName: 'ShopStaticSiteServeBucketURL',
    });
  }
}

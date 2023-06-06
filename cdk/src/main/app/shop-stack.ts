import * as cdk from 'aws-cdk-lib';
import { aws_s3 as s3 } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as S3Deployment from 'aws-cdk-lib/aws-s3-deployment';
import * as path from "path";
import {
  CloudFrontWebDistribution,
  OriginAccessIdentity,
} from 'aws-cdk-lib/aws-cloudfront';

export class ShopStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const bucket = new s3.Bucket(this, 'ShopStaticSiteServeBucket', {
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
      accessControl: s3.BucketAccessControl.BUCKET_OWNER_FULL_CONTROL,
      websiteIndexDocument: "index.html",
      websiteErrorDocument: "index.html",
    });

    const originAccessIdentity = new OriginAccessIdentity(this, 'OriginAccessIdentity');
    bucket.grantRead(originAccessIdentity);

    const cloudFrontDistribution = new CloudFrontWebDistribution(
        this,
        'ShopWebDistribution',
        {
          originConfigs: [
            {
              s3OriginSource: {
                s3BucketSource: bucket,
                originAccessIdentity: originAccessIdentity,
              },
              behaviors: [{ isDefaultBehavior: true }],
            },
          ],
        }
    );

    new S3Deployment.BucketDeployment(this, 'ShopStaticSiteServeBucketDeployment', {
      destinationBucket: bucket,
      sources: [S3Deployment.Source.asset(path.resolve(__dirname, '..', '..', '..', '..', 'dist'))],
      distribution: cloudFrontDistribution,
      distributionPaths: ['/*'],
    });

    new cdk.CfnOutput(this, 'bucketUrl', {
      value: bucket.bucketWebsiteUrl,
      exportName: 'ShopStaticSiteServeBucketURL',
    });

    new cdk.CfnOutput(this, 'cloudfrontUrl', {
      value: cloudFrontDistribution.distributionDomainName,
      exportName: 'CloudFrontDistributionURL',
    });
  }
}

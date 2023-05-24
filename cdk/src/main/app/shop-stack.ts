import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { aws_s3 as s3 } from 'aws-cdk-lib';
import * as S3Deployment from 'aws-cdk-lib/aws-s3-deployment';
import * as path from "path";
import { Distribution, OriginAccessIdentity } from 'aws-cdk-lib/aws-cloudfront';
import { S3Origin } from 'aws-cdk-lib/aws-cloudfront-origins';

export class ShopStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const bucket = new s3.Bucket(this, 'ShopStaticSiteServeBucket', {
      versioned: true,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
      accessControl: s3.BucketAccessControl.PRIVATE,
    });

    new S3Deployment.BucketDeployment(this, 'ShopStaticSiteServeBucketDeployment', {
      destinationBucket: bucket,
      sources: [S3Deployment.Source.asset(path.resolve(__dirname, '..', '..', '..', '..', 'dist'))],
    });

    const originAccessIdentity = new OriginAccessIdentity(this, 'OriginAccessIdentity');
    bucket.grantRead(originAccessIdentity);

    const cloudFrontDistribution = new Distribution(this, 'Distribution', {
      defaultRootObject: 'index.html',
      defaultBehavior: {
        origin: new S3Origin(bucket, {originAccessIdentity}),
      },
    })

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

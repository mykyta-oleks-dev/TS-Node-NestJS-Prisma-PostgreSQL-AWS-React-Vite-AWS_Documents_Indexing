export interface SQSRecord {
	eventName: string;
	awsRegion: string;
	eventSource: string;
}

export const s3Events = ['ObjectCreated:Put', 'ObjectRemoved:Delete'] as const;

export type S3Event = (typeof s3Events)[number];

export interface S3Record extends SQSRecord {
	s3: {
		configurationId: string;
		bucket: {
			name: string;
			arn: string;
		};
		object: {
			key: string;
			size: number;
			eTag: string;
			versionId?: string;
		};
	};
	eventName: S3Event;
}

export const isS3Record = (record: SQSRecord): record is S3Record => {
	return (
		record.eventSource === 'aws:s3' &&
		record.eventName in s3Events &&
		's3' in record
	);
};

export interface SQSBodyParsed {
	Records: SQSRecord[];
}

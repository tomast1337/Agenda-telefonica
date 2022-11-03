import { S3 } from 'aws-sdk';
import { Logger, Injectable } from '@nestjs/common';

@Injectable()
export class FileUploadService {
    private readonly s3: S3;
    private readonly bucketName: string;

    constructor() {
        this.s3 = new S3({
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            region: process.env.AWS_REGION,
        });
        this.bucketName = process.env.AWS_S3_BUCKET;
    }
    /* Enviar arquivo para o S3 e retornar a URL */
    async uploadFile(file: Express.Multer.File): Promise<string> {
        const result = await this.s3
            .upload({
                Bucket: this.bucketName,
                Key: file.originalname,
                Body: file.buffer,
                ACL: 'public-read',
            })
            .promise();
        return result.Location;
    }

    /* Deletar arquivo do S3 */
    async deleteFile(fileKey: string): Promise<void> {
        await this.s3
            .deleteObject({
                Bucket: this.bucketName,
                Key: fileKey,
            })
            .promise();
    }
}

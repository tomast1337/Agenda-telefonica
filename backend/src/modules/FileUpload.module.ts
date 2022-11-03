import { Module } from '@nestjs/common';
import { FileUploadService } from '../services/FileUpload.service';

@Module({
    imports: [],
    controllers: [],
    providers: [FileUploadService],
    exports: [FileUploadService],
})
export class FileUploadModule {}

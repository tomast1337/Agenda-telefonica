import {
    Controller,
    Req,
    Res,
    Get,
    Post,
    Put,
    Delete,
    UseInterceptors,
    UploadedFile,
} from '@nestjs/common';
import { Contato, ContatoInfo } from '../entities/Contato.entity';
import { Agenda } from '../entities/Agenda.entity';
import { Request, Response } from 'express';
import { ContatoService } from 'src/services/Contato.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileUploadService } from '../services/FileUpload.service';
@Controller('contatos')
export class ContatoController {
    constructor(
        private readonly contatoService: ContatoService,
        private readonly fileUploadService: FileUploadService,
    ) {}

    @Get(':agendaId')
    async index(
        @Req() request: Request,
        @Res() response: Response<any[] | { message: string }>,
    ): Promise<Response> {
        const { agendaId } = request.params;
        const contatos = await this.contatoService.findAllByAgendaId(
            parseInt(agendaId),
        );
        return response.json(
            contatos.map((contato) => {
                return {
                    id: contato.id,
                    nome: contato.nome,
                    email: contato.email,
                    telefone: contato.telefone,
                    imagem: contato.imagem || null,
                    //agendaId: contato.agenda.id,
                } as ContatoInfo;
            }),
        );
    }

    @Get('/:agendaId/:contatoId')
    async findById(
        @Req() request: Request<{ contatoId: number }>,
        @Res() response: Response<ContatoInfo | { message: string }>,
    ): Promise<Response> {
        try {
            const { contatoId } = request.params;
            const contato = await this.contatoService.findById(contatoId);
            return response.json({
                id: contato.id,
                nome: contato.nome,
                email: contato.email,
                telefone: contato.telefone,
                imagem: contato.imagem || null,
                //agendaId: contato.agenda.id,
            } as ContatoInfo);
        } catch (error) {
            return response
                .status(404)
                .json({ message: 'Contato não encontrado' });
        }
    }

    @Post()
    async create(
        @Req() request: Request<ContatoInfo>,
        @Res() response: Response<Contato>,
    ): Promise<Response> {
        const contato = new Contato();
        contato.nome = request.body.nome;
        contato.telefone = request.body.telefone;
        contato.agenda = new Agenda();
        contato.agenda.id = request.body.agendaId;
        contato.imagem = null;
        contato.email = request.body.email;
        const contatoCreated = await this.contatoService.create(contato);
        return response.status(201).json(contatoCreated);
    }

    @Put(':id')
    async update(
        @Req() request: Request<Contato>,
        @Res() response: Response<Contato | { message: string }>,
    ): Promise<Response> {
        const contato = new Contato();
        contato.id = request.params.id;
        contato.nome = request.body.nome;
        contato.telefone = request.body.telefone;
        contato.agenda = new Agenda();
        contato.agenda.id = request.body.agendaId;
        try {
            const contatoUpdated = await this.contatoService.update(contato);
            return response.status(200).json(contatoUpdated);
        } catch (error) {
            return response.status(404).json({ message: error.message });
        }
    }

    @Delete(':id')
    async delete(
        @Req() request: Request<{ id: number }>,
        @Res() response: Response<{ message: string }>,
    ): Promise<Response> {
        try {
            await this.contatoService.delete(request.params.id);
        } catch (error) {
            return response.status(404).json({ message: 'Contato not found' });
        }
        return response.status(200).json({
            message: 'Contato deleted successfully',
        });
    }

    @Put(':idContato/imagem')
    @UseInterceptors(
        FileInterceptor('imagem', {
            dest: 'uploads',
            // Change filename
            limits: {
                fileSize: 1024 * 1024 * 20, // 50MB
                files: 1, // 1 file
                fieldNameSize: 255, // 255 characters
            },
            fileFilter: (req, file, cb) => {
                // Verify if file is an image and change filename to idContato + extension
                if (file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
                    const { idContato } = req.params;
                    const extension = file.mimetype.split('/')[1];
                    file.fieldname = `${idContato}-${Date.now()}.${extension}`;
                    //file.filename = filename;
                    cb(null, true);
                } else {
                    cb(new Error('Invalid file type'), false);
                }
            },
        }),
    )
    async uploadImage(
        @UploadedFile() file,
        @Req() request: Request<{ idContato: number }>,
        @Res() response: Response<Contato | { message: string; url?: string }>,
    ): Promise<Response> {
        const { idContato } = request.params;
        const { imagem } = await this.contatoService.findById(idContato); // Get current image
        try {
            const url = await this.fileUploadService.uploadFile(file);
            if (imagem) {
                await this.fileUploadService.deleteFile(imagem); // Delete current image
            }
            try {
                const contato = await this.contatoService.updateImage(
                    idContato,
                    url,
                ); // Update image
                return response.status(200).json({
                    message: 'Image uploaded successfully',
                    url: contato.imagem,
                }); // Return new image
            } catch (error) {
                return response
                    .status(500)
                    .json({ message: 'Error updating image' });
            }
        } catch (error) {
            return response
                .status(500)
                .json({ message: 'Error uploading image' });
        }
    }
}

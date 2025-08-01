import { Injectable } from '@nestjs/common';
import { CreateResumoDto } from '../dto/create-resumo.dto';
import { UpdateResumoDto } from '../dto/update-resumo.dto';

@Injectable()
export class ResumoService {
  create(createResumoDto: CreateResumoDto) {
    return 'This action adds a new resumo';
  }

  findAll() {
    return `This action returns all resumo`;
  }

  findOne(id: number) {
    return `This action returns a #${id} resumo`;
  }

  update(id: number, updateResumoDto: UpdateResumoDto) {
    return `This action updates a #${id} resumo`;
  }

  remove(id: number) {
    return `This action removes a #${id} resumo`;
  }
}

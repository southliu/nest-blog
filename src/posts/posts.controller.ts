import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';

class CreatePostsDto {
  @ApiProperty({ name: '标题' })
  title: string;
  @ApiProperty({ name: '内容' })
  content: string;
}

@Controller('posts')
@ApiTags('文章')
export class PostsController {
  @Get()
  @ApiOperation({ summary: '获取分页' })
  index() {
    return [{ id: 1 }, { id: 2 }];
  }

  @Post()
  @ApiOperation({ summary: '新增文章' })
  create(@Body() body: CreatePostsDto) {
    return {
      body,
      message: 'success',
    };
  }

  @Get(':id')
  @ApiOperation({ summary: '获取详情' })
  detail() {
    return {
      id: 1,
      message: 'success',
    };
  }

  @Put(':id')
  @ApiOperation({ summary: '修改文章' })
  update(@Param('id') id: string, @Body() body: CreatePostsDto) {
    return {
      id,
      body,
      message: 'success',
    };
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除文章' })
  remove(@Param('id') id: string) {
    return {
      id,
      message: 'success',
    };
  }
}

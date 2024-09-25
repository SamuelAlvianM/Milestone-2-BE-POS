/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductCategoryDto, UpdateProductCategoryDto } from './dto/productCategory.dto';
import { product_category } from '@prisma/client';

@Injectable()
export class ProductCategoryService {
  constructor(private prisma: PrismaService) {}

  async createNewCategory(data: CreateProductCategoryDto, outlet_id: string) {
    return this.prisma.product_category.create({
      data: {
        ...data,
        outlet: {
          connect: {outlet_id: outlet_id},
        },
      },

    });
  }

  async getAllProductCategory(page: number, limit: number, filter?: string, sortField?: string, sortOrder?: 'asc' | 'desc') {
    const maxLimit = 10;
    const normalLimit = Math.min(limit, maxLimit)
    const skip = (page - 1) * normalLimit;

    const condition: any = {
      deleted_at: null,
    };

    if (filter) {
      condition.category_name = {
        contains: filter,
        mode: 'insensitive',
      };
    }

    const sort: any = {};
    if (sortField) {
      sort[sortField] = sortOrder || 'asc';
    } else {
      sort['created_at'] = 'asc'; 
    }
    
    const [productCategories, totalCount] = await this.prisma.$transaction([
      this.prisma.product_category.findMany({
        where: condition,
        skip: skip,
        take: normalLimit,
        orderBy: sort,
        include: {
          product: true,
        },
      }),
      this.prisma.product_category.count({
        where: condition,
      }),
    ]);

    return {
      data: productCategories,
      meta: {
        currentPage: page,
        itemsPerPage: normalLimit,
        totalPages: Math.ceil(totalCount / normalLimit ),
        totalItems: totalCount,
      },
    };
  }

  async getProductCategoryById(product_category_id: number): Promise<product_category> {
    const category = await this.prisma.product_category.findFirst({
      where:{
        product_category_id: product_category_id,
        deleted_at: null
      },
      include: {
        product: true,
      },
    });
    
    if (!category) {
      throw new NotFoundException(`Category Product with ID ${product_category_id} not found or has been deleted.`);
    }
    
    
    return category;
  }


  async updateCategory(product_category_id: number, update_dto: UpdateProductCategoryDto) {
    return this.prisma.product_category.update({
      where: { product_category_id: product_category_id },
      data: {
        category_name: update_dto.category_name,
      },
    });
  }

  async softDeleteProductCategory(product_category_id: number){
    return this.prisma.product_category.update({
      where: {
        product_category_id: product_category_id
      },
      data: {
        deleted_at: new Date()
      },
    })
  }
}
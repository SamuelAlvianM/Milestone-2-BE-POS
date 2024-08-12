/* eslint-disable prettier/prettier */
import {unauthorized_response, unauthorized_role_response, get_all_promos_response, get_all_promo_bad_request_response, create_promo_response, create_promo_bad_request_response, get_promo_by_id_response, get_promo_by_id_bad_request_response, update_promo_response, update_promo_bad_request_response, apply_promo_response, apply_promo_bad_request_response, delete_promo_response, delete_promo_bad_request_response} from '../../tests/swagger/promo.swagger';
import { Controller, Get, Post, Body, Param, Patch, Delete, HttpStatus, HttpCode, UseGuards, ParseIntPipe, NotFoundException,} from '@nestjs/common';
import { PromoService } from './promo.service';
import { ApplyPromoDto, CreatePromoDto, UnapplyPromoDto, UpdatePromoDto } from './dto/promo.dto';
import { Role } from '@prisma/client';
import { RolesGuard } from 'src/utils/guard/roles.guard';
import { Roles } from 'src/utils/decorator/roles.decorator';
import { ApiResponse, ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/utils/guard/jwt.guard';

@ApiTags('Promos')
@Controller('promos')
@UseGuards(JwtAuthGuard, RolesGuard)
export class PromoController {
  constructor(private readonly promoService: PromoService) {}

  
  @Post()
  @Roles(Role.SUPER_ADMIN, Role.OWNER)
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse(create_promo_response)
  @ApiResponse(unauthorized_response)
  @ApiResponse(unauthorized_role_response)
  @ApiResponse(create_promo_bad_request_response)
  @ApiBearerAuth('JWT')
  async createPromo(@Body() createPromoDto: CreatePromoDto) {
      const promo = await this.promoService.createPromo(createPromoDto);
      return {
        message: 'Promo Data Created Successfully!',
        data: promo,
      };
  }
      
  @Roles(Role.SUPER_ADMIN, Role.OWNER, Role.STAFF)
  @HttpCode(HttpStatus.OK)
  @ApiResponse(get_all_promos_response)
  @ApiResponse(unauthorized_response)
  @ApiResponse(unauthorized_role_response)
  @ApiResponse(get_all_promo_bad_request_response)
  @ApiBearerAuth('JWT')
  @Get()
  async getAllPromos() {
    const promos = await this.promoService.getAllPromos();
    return {
      message: 'Fetch Data Promo Success',
      data: promos,
    };
  }

  @Roles(Role.SUPER_ADMIN, Role.OWNER, Role.STAFF)
  @HttpCode(HttpStatus.OK)
  @ApiResponse(get_promo_by_id_response)
  @ApiResponse(unauthorized_response)
  @ApiResponse(unauthorized_role_response)
  @ApiResponse(get_promo_by_id_bad_request_response)
  @ApiBearerAuth('JWT')
  @Get(':id')
  async getPromoById(@Param('id', ParseIntPipe) id: number) {
    const promo = await this.promoService.getPromoById(id);
    return {
      message: 'Fetch Data Promo Success',
      data: promo,
    };
  }

  @Roles(Role.SUPER_ADMIN, Role.OWNER)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse(update_promo_response)
  @ApiResponse(unauthorized_response)
  @ApiResponse(unauthorized_role_response)
  @ApiResponse(update_promo_bad_request_response)
  @ApiBearerAuth('JWT')
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updatePromoDto: UpdatePromoDto) {
    const result_update = await this.promoService.updatePromo(+id, updatePromoDto);
    return {
      message: 'Data Promo Successfully Updated!',
      data: result_update,
    };
  }

  @Roles(Role.SUPER_ADMIN, Role.OWNER)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse(delete_promo_response)
  @ApiResponse(unauthorized_response)
  @ApiResponse(unauthorized_role_response)
  @ApiResponse(delete_promo_bad_request_response)
  @ApiBearerAuth('JWT')
  @Delete(':id')
  async softDeletePromo(@Param('id') id: string) {
    const promos = await this.promoService.softDeletePromo(+id);
    if (!promos) {
      throw new NotFoundException("Promo Data Not Found!")
    }
    return {
      statusCode: HttpStatus.NO_CONTENT,
      message: "Delete Data Promo Success!",
      data: promos,
    }
  }

  @Roles(Role.SUPER_ADMIN, Role.OWNER)
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse(apply_promo_response)
  @ApiResponse(unauthorized_response)
  @ApiResponse(unauthorized_role_response)
  @ApiResponse(apply_promo_bad_request_response)
  @ApiBearerAuth('JWT')
  @Post('apply')
  async applyPromo(@Body() applyPromoDto: ApplyPromoDto) {
    const applied_promos = await this.promoService.applyPromo(applyPromoDto);
    return {
      message: 'Apply Promo to Product Success!!',
      data: applied_promos,
    };
  }
  // @Roles(Role.SUPER_ADMIN, Role.OWNER)
  // @HttpCode(HttpStatus.CREATED)
  // @ApiResponse(apply_promo_response)
  // @ApiResponse(unauthorized_response)
  // @ApiResponse(unauthorized_role_response)
  // @ApiResponse(apply_promo_bad_request_response)
  // @ApiBearerAuth('JWT')
  // @Get('apply/:productId')
  // async getApplyPromoToProduct(@Param('productId', ParseIntPipe) productId: number) {
  //   return this.promoService.getProductWithPromo(productId);
  // }

  // @Post('unapply')
  // async unapplyPromo(@Body() unapplyPromoDto: UnapplyPromoDto) {
  //   return this.promoService.unapplyPromo(unapplyPromoDto);
  // }
}
import * as Inputs from "../../inputs";
import { prisma } from "../../../../../prisma/schema/builder";
import { builder } from '../../../builder';
import { defineQuery, defineQueryFunction, defineQueryPrismaObject } from '../../utils';

export const findFirstAdminQueryArgs = builder.args((t) => ({
  where: t.field({ type: Inputs.AdminWhereInput, required: false }),
  orderBy: t.field({ type: [Inputs.AdminOrderByWithRelationInput], required: false }),
  cursor: t.field({ type: Inputs.AdminWhereUniqueInput, required: false }),
  take: t.field({ type: 'Int', required: false }),
  skip: t.field({ type: 'Int', required: false }),
  distinct: t.field({ type: [Inputs.AdminScalarFieldEnum], required: false }),
}))

export const findFirstAdminQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: 'Admin',
    nullable: true,
    args: findFirstAdminQueryArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.admin.findFirst({
        where: args.where || undefined,
        cursor: args.cursor || undefined,
        take: args.take || undefined,
        distinct: args.distinct || undefined,
        skip: args.skip || undefined,
        orderBy: args.orderBy || undefined,
        ...query,
      }),
  }),
);

export const findFirstAdminQuery = defineQuery((t) => ({
  findFirstAdmin: t.prismaField(findFirstAdminQueryObject(t)),
}));

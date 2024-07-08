import * as Inputs from "../../inputs";
import { prisma } from "../../../../../prisma/schema/builder";
import { builder } from '../../../builder';
import { defineQuery, defineQueryFunction, defineQueryPrismaObject } from '../../utils';

export const findUniqueAdminQueryArgs = builder.args((t) => ({ where: t.field({ type: Inputs.AdminWhereUniqueInput, required: true }) }))

export const findUniqueAdminQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: 'Admin',
    nullable: true,
    args: findUniqueAdminQueryArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.admin.findUnique({ where: args.where, ...query }),
  }),
);

export const findUniqueAdminQuery = defineQuery((t) => ({
  findUniqueAdmin: t.prismaField(findUniqueAdminQueryObject(t)),
}));

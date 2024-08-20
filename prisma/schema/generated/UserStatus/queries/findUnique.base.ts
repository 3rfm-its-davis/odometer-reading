import * as Inputs from "../../inputs";
import { prisma } from "../../../../../prisma/schema/builder";
import { builder } from '../../../builder';
import { defineQuery, defineQueryFunction, defineQueryPrismaObject } from '../../utils';

export const findUniqueUserStatusQueryArgs = builder.args((t) => ({ where: t.field({ type: Inputs.UserStatusWhereUniqueInput, required: true }) }))

export const findUniqueUserStatusQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: 'UserStatus',
    nullable: true,
    args: findUniqueUserStatusQueryArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.userStatus.findUnique({ where: args.where, ...query }),
  }),
);

export const findUniqueUserStatusQuery = defineQuery((t) => ({
  findUniqueUserStatus: t.prismaField(findUniqueUserStatusQueryObject(t)),
}));

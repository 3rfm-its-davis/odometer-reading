import * as Inputs from "../../inputs";
import { prisma } from "../../../../../prisma/schema/builder";
import { builder } from '../../../builder';
import { defineQuery, defineQueryFunction, defineQueryPrismaObject } from '../../utils';

export const findUniqueUserStateQueryArgs = builder.args((t) => ({ where: t.field({ type: Inputs.UserStateWhereUniqueInput, required: true }) }))

export const findUniqueUserStateQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: 'UserState',
    nullable: true,
    args: findUniqueUserStateQueryArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.userState.findUnique({ where: args.where, ...query }),
  }),
);

export const findUniqueUserStateQuery = defineQuery((t) => ({
  findUniqueUserState: t.prismaField(findUniqueUserStateQueryObject(t)),
}));

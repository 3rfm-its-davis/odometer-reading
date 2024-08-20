import * as Inputs from "../../inputs";
import { prisma } from "../../../../../prisma/schema/builder";
import { builder } from '../../../builder';
import { defineQuery, defineQueryFunction, defineQueryPrismaObject } from '../../utils';

export const findManyUserStateQueryArgs = builder.args((t) => ({
  where: t.field({ type: Inputs.UserStateWhereInput, required: false }),
  orderBy: t.field({ type: [Inputs.UserStateOrderByWithRelationInput], required: false }),
  cursor: t.field({ type: Inputs.UserStateWhereUniqueInput, required: false }),
  take: t.field({ type: 'Int', required: false }),
  skip: t.field({ type: 'Int', required: false }),
  distinct: t.field({ type: [Inputs.UserStateScalarFieldEnum], required: false }),
}))

export const findManyUserStateQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: ['UserState'],
    nullable: false,
    args: findManyUserStateQueryArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.userState.findMany({
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

export const findManyUserStateQuery = defineQuery((t) => ({
  findManyUserState: t.prismaField(findManyUserStateQueryObject(t)),
}));

import * as Inputs from "../../inputs";
import { prisma } from "../../../../../prisma/schema/builder";
import { builder } from '../../../builder';
import { defineQuery, defineQueryFunction, defineQueryPrismaObject } from '../../utils';

export const findFirstUserStatusQueryArgs = builder.args((t) => ({
  where: t.field({ type: Inputs.UserStatusWhereInput, required: false }),
  orderBy: t.field({ type: [Inputs.UserStatusOrderByWithRelationInput], required: false }),
  cursor: t.field({ type: Inputs.UserStatusWhereUniqueInput, required: false }),
  take: t.field({ type: 'Int', required: false }),
  skip: t.field({ type: 'Int', required: false }),
  distinct: t.field({ type: [Inputs.UserStatusScalarFieldEnum], required: false }),
}))

export const findFirstUserStatusQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: 'UserStatus',
    nullable: true,
    args: findFirstUserStatusQueryArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.userStatus.findFirst({
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

export const findFirstUserStatusQuery = defineQuery((t) => ({
  findFirstUserStatus: t.prismaField(findFirstUserStatusQueryObject(t)),
}));

import * as Inputs from "../../inputs";
import { prisma } from "../../../../../prisma/schema/builder";
import { builder } from '../../../builder';
import { defineQuery, defineQueryFunction, defineQueryObject } from '../../utils';

export const countUserStatusQueryArgs = builder.args((t) => ({
  where: t.field({ type: Inputs.UserStatusWhereInput, required: false }),
  orderBy: t.field({ type: [Inputs.UserStatusOrderByWithRelationInput], required: false }),
  cursor: t.field({ type: Inputs.UserStatusWhereUniqueInput, required: false }),
  take: t.field({ type: 'Int', required: false }),
  skip: t.field({ type: 'Int', required: false }),
  distinct: t.field({ type: [Inputs.UserStatusScalarFieldEnum], required: false }),
}))

export const countUserStatusQueryObject = defineQueryFunction((t) =>
  defineQueryObject({
    type: 'Int',
    nullable: false,
    args: countUserStatusQueryArgs,
    resolve: async (_root, args, _context, _info) =>
      await prisma.userStatus.count({
        where: args.where || undefined,
        cursor: args.cursor || undefined,
        take: args.take || undefined,
        skip: args.skip || undefined,
        orderBy: args.orderBy || undefined,
      }),
  }),
);

export const countUserStatusQuery = defineQuery((t) => ({
  countUserStatus: t.field(countUserStatusQueryObject(t)),
}));

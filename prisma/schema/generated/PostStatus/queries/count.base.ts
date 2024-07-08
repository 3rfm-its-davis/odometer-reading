import * as Inputs from "../../inputs";
import { prisma } from "../../../../../prisma/schema/builder";
import { builder } from '../../../builder';
import { defineQuery, defineQueryFunction, defineQueryObject } from '../../utils';

export const countPostStatusQueryArgs = builder.args((t) => ({
  where: t.field({ type: Inputs.PostStatusWhereInput, required: false }),
  orderBy: t.field({ type: [Inputs.PostStatusOrderByWithRelationInput], required: false }),
  cursor: t.field({ type: Inputs.PostStatusWhereUniqueInput, required: false }),
  take: t.field({ type: 'Int', required: false }),
  skip: t.field({ type: 'Int', required: false }),
  distinct: t.field({ type: [Inputs.PostStatusScalarFieldEnum], required: false }),
}))

export const countPostStatusQueryObject = defineQueryFunction((t) =>
  defineQueryObject({
    type: 'Int',
    nullable: false,
    args: countPostStatusQueryArgs,
    resolve: async (_root, args, _context, _info) =>
      await prisma.postStatus.count({
        where: args.where || undefined,
        cursor: args.cursor || undefined,
        take: args.take || undefined,
        skip: args.skip || undefined,
        orderBy: args.orderBy || undefined,
      }),
  }),
);

export const countPostStatusQuery = defineQuery((t) => ({
  countPostStatus: t.field(countPostStatusQueryObject(t)),
}));

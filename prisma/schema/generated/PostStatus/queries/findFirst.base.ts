import * as Inputs from "../../inputs";
import { prisma } from "../../../../../prisma/schema/builder";
import { builder } from '../../../builder';
import { defineQuery, defineQueryFunction, defineQueryPrismaObject } from '../../utils';

export const findFirstPostStatusQueryArgs = builder.args((t) => ({
  where: t.field({ type: Inputs.PostStatusWhereInput, required: false }),
  orderBy: t.field({ type: [Inputs.PostStatusOrderByWithRelationInput], required: false }),
  cursor: t.field({ type: Inputs.PostStatusWhereUniqueInput, required: false }),
  take: t.field({ type: 'Int', required: false }),
  skip: t.field({ type: 'Int', required: false }),
  distinct: t.field({ type: [Inputs.PostStatusScalarFieldEnum], required: false }),
}))

export const findFirstPostStatusQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: 'PostStatus',
    nullable: true,
    args: findFirstPostStatusQueryArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.postStatus.findFirst({
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

export const findFirstPostStatusQuery = defineQuery((t) => ({
  findFirstPostStatus: t.prismaField(findFirstPostStatusQueryObject(t)),
}));

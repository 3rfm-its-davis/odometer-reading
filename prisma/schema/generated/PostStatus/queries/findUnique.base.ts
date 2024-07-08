import * as Inputs from "../../inputs";
import { prisma } from "../../../../../prisma/schema/builder";
import { builder } from '../../../builder';
import { defineQuery, defineQueryFunction, defineQueryPrismaObject } from '../../utils';

export const findUniquePostStatusQueryArgs = builder.args((t) => ({ where: t.field({ type: Inputs.PostStatusWhereUniqueInput, required: true }) }))

export const findUniquePostStatusQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: 'PostStatus',
    nullable: true,
    args: findUniquePostStatusQueryArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.postStatus.findUnique({ where: args.where, ...query }),
  }),
);

export const findUniquePostStatusQuery = defineQuery((t) => ({
  findUniquePostStatus: t.prismaField(findUniquePostStatusQueryObject(t)),
}));

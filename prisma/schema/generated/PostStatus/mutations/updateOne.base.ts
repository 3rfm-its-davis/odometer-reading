import * as Inputs from "../../inputs";
import { prisma } from "../../../../../prisma/schema/builder";
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const updateOnePostStatusMutationArgs = builder.args((t) => ({
      where: t.field({ type: Inputs.PostStatusWhereUniqueInput, required: true }),
      data: t.field({ type: Inputs.PostStatusUpdateInput, required: true }),
    }))

export const updateOnePostStatusMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'PostStatus',
    nullable: true,
    args: updateOnePostStatusMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.postStatus.update({ where: args.where, data: args.data, ...query }),
  }),
);

export const updateOnePostStatusMutation = defineMutation((t) => ({
  updateOnePostStatus: t.prismaField(updateOnePostStatusMutationObject(t)),
}));

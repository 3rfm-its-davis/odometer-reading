import * as Inputs from "../../inputs";
import { prisma } from "../../../../../src/schema/builder";
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const deleteOnePostStatusMutationArgs = builder.args((t) => ({ where: t.field({ type: Inputs.PostStatusWhereUniqueInput, required: true }) }))

export const deleteOnePostStatusMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'PostStatus',
    nullable: true,
    args: deleteOnePostStatusMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.postStatus.delete({ where: args.where, ...query }),
  }),
);

export const deleteOnePostStatusMutation = defineMutation((t) => ({
  deleteOnePostStatus: t.prismaField(deleteOnePostStatusMutationObject(t)),
}));

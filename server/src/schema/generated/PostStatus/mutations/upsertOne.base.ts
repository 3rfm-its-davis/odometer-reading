import * as Inputs from "../../inputs";
import { prisma } from "../../../../../src/schema/builder";
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const upsertOnePostStatusMutationArgs = builder.args((t) => ({
      where: t.field({ type: Inputs.PostStatusWhereUniqueInput, required: true }),
      create: t.field({ type: Inputs.PostStatusCreateInput, required: true }),
      update: t.field({ type: Inputs.PostStatusUpdateInput, required: true }),
    }))

export const upsertOnePostStatusMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'PostStatus',
    nullable: false,
    args: upsertOnePostStatusMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.postStatus.upsert({
        where: args.where,
        create: args.create,
        update: args.update,
        ...query,
      }),
  }),
);

export const upsertOnePostStatusMutation = defineMutation((t) => ({
  upsertOnePostStatus: t.prismaField(upsertOnePostStatusMutationObject(t)),
}));

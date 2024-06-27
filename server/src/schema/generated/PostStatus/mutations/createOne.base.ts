import * as Inputs from "../../inputs";
import { prisma } from "../../../../../src/schema/builder";
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const createOnePostStatusMutationArgs = builder.args((t) => ({ data: t.field({ type: Inputs.PostStatusCreateInput, required: true }) }))

export const createOnePostStatusMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'PostStatus',
    nullable: false,
    args: createOnePostStatusMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.postStatus.create({ data: args.data, ...query }),
  }),
);

export const createOnePostStatusMutation = defineMutation((t) => ({
  createOnePostStatus: t.prismaField(createOnePostStatusMutationObject(t)),
}));

import * as Inputs from "../../inputs";
import { prisma } from "../../../../../src/schema/builder";
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const createManyPostStatusMutationArgs = builder.args((t) => ({ data: t.field({ type: [Inputs.PostStatusCreateInput], required: true }) }))

export const createManyPostStatusMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: ['PostStatus'],
    nullable: false,
    args: createManyPostStatusMutationArgs,
    resolve: async (_query, _root, args, _context, _info) =>
      await prisma.$transaction(args.data.map((data) => prisma.postStatus.create({ data }))),
  }),
);

export const createManyPostStatusMutation = defineMutation((t) => ({
  createManyPostStatus: t.prismaField(createManyPostStatusMutationObject(t)),
}));

import * as Inputs from "../../inputs";
import { prisma } from "../../../../../prisma/schema/builder";
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const createManyPostMutationArgs = builder.args((t) => ({ data: t.field({ type: [Inputs.PostCreateInput], required: true }) }))

export const createManyPostMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: ['Post'],
    nullable: false,
    args: createManyPostMutationArgs,
    resolve: async (_query, _root, args, _context, _info) =>
      await prisma.$transaction(args.data.map((data) => prisma.post.create({ data }))),
  }),
);

export const createManyPostMutation = defineMutation((t) => ({
  createManyPost: t.prismaField(createManyPostMutationObject(t)),
}));

import * as Inputs from "../../inputs";
import { prisma } from "../../../../../prisma/schema/builder";
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const createManyAdminMutationArgs = builder.args((t) => ({ data: t.field({ type: [Inputs.AdminCreateInput], required: true }) }))

export const createManyAdminMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: ['Admin'],
    nullable: false,
    args: createManyAdminMutationArgs,
    resolve: async (_query, _root, args, _context, _info) =>
      await prisma.$transaction(args.data.map((data) => prisma.admin.create({ data }))),
  }),
);

export const createManyAdminMutation = defineMutation((t) => ({
  createManyAdmin: t.prismaField(createManyAdminMutationObject(t)),
}));

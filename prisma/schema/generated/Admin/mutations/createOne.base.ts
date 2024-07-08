import * as Inputs from "../../inputs";
import { prisma } from "../../../../../prisma/schema/builder";
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const createOneAdminMutationArgs = builder.args((t) => ({ data: t.field({ type: Inputs.AdminCreateInput, required: true }) }))

export const createOneAdminMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'Admin',
    nullable: false,
    args: createOneAdminMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.admin.create({ data: args.data, ...query }),
  }),
);

export const createOneAdminMutation = defineMutation((t) => ({
  createOneAdmin: t.prismaField(createOneAdminMutationObject(t)),
}));

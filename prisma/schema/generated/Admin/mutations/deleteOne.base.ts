import * as Inputs from "../../inputs";
import { prisma } from "../../../../../prisma/schema/builder";
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const deleteOneAdminMutationArgs = builder.args((t) => ({ where: t.field({ type: Inputs.AdminWhereUniqueInput, required: true }) }))

export const deleteOneAdminMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'Admin',
    nullable: true,
    args: deleteOneAdminMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.admin.delete({ where: args.where, ...query }),
  }),
);

export const deleteOneAdminMutation = defineMutation((t) => ({
  deleteOneAdmin: t.prismaField(deleteOneAdminMutationObject(t)),
}));

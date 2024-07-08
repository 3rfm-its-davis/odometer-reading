import * as Inputs from "../../inputs";
import { prisma } from "../../../../../prisma/schema/builder";
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const updateOneAdminMutationArgs = builder.args((t) => ({
      where: t.field({ type: Inputs.AdminWhereUniqueInput, required: true }),
      data: t.field({ type: Inputs.AdminUpdateInput, required: true }),
    }))

export const updateOneAdminMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'Admin',
    nullable: true,
    args: updateOneAdminMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.admin.update({ where: args.where, data: args.data, ...query }),
  }),
);

export const updateOneAdminMutation = defineMutation((t) => ({
  updateOneAdmin: t.prismaField(updateOneAdminMutationObject(t)),
}));

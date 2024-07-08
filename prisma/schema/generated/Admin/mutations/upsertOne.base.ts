import * as Inputs from "../../inputs";
import { prisma } from "../../../../../prisma/schema/builder";
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const upsertOneAdminMutationArgs = builder.args((t) => ({
      where: t.field({ type: Inputs.AdminWhereUniqueInput, required: true }),
      create: t.field({ type: Inputs.AdminCreateInput, required: true }),
      update: t.field({ type: Inputs.AdminUpdateInput, required: true }),
    }))

export const upsertOneAdminMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'Admin',
    nullable: false,
    args: upsertOneAdminMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.admin.upsert({
        where: args.where,
        create: args.create,
        update: args.update,
        ...query,
      }),
  }),
);

export const upsertOneAdminMutation = defineMutation((t) => ({
  upsertOneAdmin: t.prismaField(upsertOneAdminMutationObject(t)),
}));

import * as Inputs from "../../inputs";
import { prisma } from "../../../../../prisma/schema/builder";
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const upsertOneUserMutationArgs = builder.args((t) => ({
      where: t.field({ type: Inputs.UserWhereUniqueInput, required: true }),
      create: t.field({ type: Inputs.UserCreateInput, required: true }),
      update: t.field({ type: Inputs.UserUpdateInput, required: true }),
    }))

export const upsertOneUserMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'User',
    nullable: false,
    args: upsertOneUserMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.user.upsert({
        where: args.where,
        create: args.create,
        update: args.update,
        ...query,
      }),
  }),
);

export const upsertOneUserMutation = defineMutation((t) => ({
  upsertOneUser: t.prismaField(upsertOneUserMutationObject(t)),
}));

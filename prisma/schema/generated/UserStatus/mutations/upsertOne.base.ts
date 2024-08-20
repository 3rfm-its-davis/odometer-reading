import * as Inputs from "../../inputs";
import { prisma } from "../../../../../prisma/schema/builder";
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const upsertOneUserStatusMutationArgs = builder.args((t) => ({
      where: t.field({ type: Inputs.UserStatusWhereUniqueInput, required: true }),
      create: t.field({ type: Inputs.UserStatusCreateInput, required: true }),
      update: t.field({ type: Inputs.UserStatusUpdateInput, required: true }),
    }))

export const upsertOneUserStatusMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'UserStatus',
    nullable: false,
    args: upsertOneUserStatusMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.userStatus.upsert({
        where: args.where,
        create: args.create,
        update: args.update,
        ...query,
      }),
  }),
);

export const upsertOneUserStatusMutation = defineMutation((t) => ({
  upsertOneUserStatus: t.prismaField(upsertOneUserStatusMutationObject(t)),
}));

import * as Inputs from "../../inputs";
import { prisma } from "../../../../../prisma/schema/builder";
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const updateOneUserStatusMutationArgs = builder.args((t) => ({
      where: t.field({ type: Inputs.UserStatusWhereUniqueInput, required: true }),
      data: t.field({ type: Inputs.UserStatusUpdateInput, required: true }),
    }))

export const updateOneUserStatusMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'UserStatus',
    nullable: true,
    args: updateOneUserStatusMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.userStatus.update({ where: args.where, data: args.data, ...query }),
  }),
);

export const updateOneUserStatusMutation = defineMutation((t) => ({
  updateOneUserStatus: t.prismaField(updateOneUserStatusMutationObject(t)),
}));

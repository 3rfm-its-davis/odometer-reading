import * as Inputs from "../../inputs";
import { prisma } from "../../../../../prisma/schema/builder";
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const deleteOneUserStatusMutationArgs = builder.args((t) => ({ where: t.field({ type: Inputs.UserStatusWhereUniqueInput, required: true }) }))

export const deleteOneUserStatusMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'UserStatus',
    nullable: true,
    args: deleteOneUserStatusMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.userStatus.delete({ where: args.where, ...query }),
  }),
);

export const deleteOneUserStatusMutation = defineMutation((t) => ({
  deleteOneUserStatus: t.prismaField(deleteOneUserStatusMutationObject(t)),
}));

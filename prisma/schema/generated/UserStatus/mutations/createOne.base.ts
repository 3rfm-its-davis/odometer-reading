import * as Inputs from "../../inputs";
import { prisma } from "../../../../../prisma/schema/builder";
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const createOneUserStatusMutationArgs = builder.args((t) => ({ data: t.field({ type: Inputs.UserStatusCreateInput, required: true }) }))

export const createOneUserStatusMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'UserStatus',
    nullable: false,
    args: createOneUserStatusMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.userStatus.create({ data: args.data, ...query }),
  }),
);

export const createOneUserStatusMutation = defineMutation((t) => ({
  createOneUserStatus: t.prismaField(createOneUserStatusMutationObject(t)),
}));

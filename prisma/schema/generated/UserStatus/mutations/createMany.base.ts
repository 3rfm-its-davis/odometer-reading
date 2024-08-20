import * as Inputs from "../../inputs";
import { prisma } from "../../../../../prisma/schema/builder";
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const createManyUserStatusMutationArgs = builder.args((t) => ({ data: t.field({ type: [Inputs.UserStatusCreateInput], required: true }) }))

export const createManyUserStatusMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: ['UserStatus'],
    nullable: false,
    args: createManyUserStatusMutationArgs,
    resolve: async (_query, _root, args, _context, _info) =>
      await prisma.$transaction(args.data.map((data) => prisma.userStatus.create({ data }))),
  }),
);

export const createManyUserStatusMutation = defineMutation((t) => ({
  createManyUserStatus: t.prismaField(createManyUserStatusMutationObject(t)),
}));

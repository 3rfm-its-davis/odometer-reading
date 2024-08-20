import * as Inputs from "../../inputs";
import { prisma } from "../../../../../prisma/schema/builder";
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const updateOneUserStateMutationArgs = builder.args((t) => ({
      where: t.field({ type: Inputs.UserStateWhereUniqueInput, required: true }),
      data: t.field({ type: Inputs.UserStateUpdateInput, required: true }),
    }))

export const updateOneUserStateMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'UserState',
    nullable: true,
    args: updateOneUserStateMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.userState.update({ where: args.where, data: args.data, ...query }),
  }),
);

export const updateOneUserStateMutation = defineMutation((t) => ({
  updateOneUserState: t.prismaField(updateOneUserStateMutationObject(t)),
}));

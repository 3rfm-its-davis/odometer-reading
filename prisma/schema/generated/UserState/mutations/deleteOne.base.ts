import * as Inputs from "../../inputs";
import { prisma } from "../../../../../prisma/schema/builder";
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const deleteOneUserStateMutationArgs = builder.args((t) => ({ where: t.field({ type: Inputs.UserStateWhereUniqueInput, required: true }) }))

export const deleteOneUserStateMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'UserState',
    nullable: true,
    args: deleteOneUserStateMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.userState.delete({ where: args.where, ...query }),
  }),
);

export const deleteOneUserStateMutation = defineMutation((t) => ({
  deleteOneUserState: t.prismaField(deleteOneUserStateMutationObject(t)),
}));

import * as Inputs from "../../inputs";
import { prisma } from "../../../../../prisma/schema/builder";
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const createOneUserStateMutationArgs = builder.args((t) => ({ data: t.field({ type: Inputs.UserStateCreateInput, required: true }) }))

export const createOneUserStateMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'UserState',
    nullable: false,
    args: createOneUserStateMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.userState.create({ data: args.data, ...query }),
  }),
);

export const createOneUserStateMutation = defineMutation((t) => ({
  createOneUserState: t.prismaField(createOneUserStateMutationObject(t)),
}));

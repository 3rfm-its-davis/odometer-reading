import * as Inputs from "../../inputs";
import { prisma } from "../../../../../prisma/schema/builder";
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const upsertOneUserStateMutationArgs = builder.args((t) => ({
      where: t.field({ type: Inputs.UserStateWhereUniqueInput, required: true }),
      create: t.field({ type: Inputs.UserStateCreateInput, required: true }),
      update: t.field({ type: Inputs.UserStateUpdateInput, required: true }),
    }))

export const upsertOneUserStateMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'UserState',
    nullable: false,
    args: upsertOneUserStateMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.userState.upsert({
        where: args.where,
        create: args.create,
        update: args.update,
        ...query,
      }),
  }),
);

export const upsertOneUserStateMutation = defineMutation((t) => ({
  upsertOneUserState: t.prismaField(upsertOneUserStateMutationObject(t)),
}));

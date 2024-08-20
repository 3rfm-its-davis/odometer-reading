import * as Inputs from "../../inputs";
import { prisma } from "../../../../../prisma/schema/builder";
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const createManyUserStateMutationArgs = builder.args((t) => ({ data: t.field({ type: [Inputs.UserStateCreateInput], required: true }) }))

export const createManyUserStateMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: ['UserState'],
    nullable: false,
    args: createManyUserStateMutationArgs,
    resolve: async (_query, _root, args, _context, _info) =>
      await prisma.$transaction(args.data.map((data) => prisma.userState.create({ data }))),
  }),
);

export const createManyUserStateMutation = defineMutation((t) => ({
  createManyUserState: t.prismaField(createManyUserStateMutationObject(t)),
}));

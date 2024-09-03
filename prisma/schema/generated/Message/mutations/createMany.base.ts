import * as Inputs from "../../inputs";
import { prisma } from "../../../../../prisma/schema/builder";
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const createManyMessageMutationArgs = builder.args((t) => ({ data: t.field({ type: [Inputs.MessageCreateInput], required: true }) }))

export const createManyMessageMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: ['Message'],
    nullable: false,
    args: createManyMessageMutationArgs,
    resolve: async (_query, _root, args, _context, _info) =>
      await prisma.$transaction(args.data.map((data) => prisma.message.create({ data }))),
  }),
);

export const createManyMessageMutation = defineMutation((t) => ({
  createManyMessage: t.prismaField(createManyMessageMutationObject(t)),
}));

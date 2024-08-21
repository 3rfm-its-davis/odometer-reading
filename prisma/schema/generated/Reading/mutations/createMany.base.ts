import * as Inputs from "../../inputs";
import { prisma } from "../../../../../prisma/schema/builder";
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const createManyReadingMutationArgs = builder.args((t) => ({ data: t.field({ type: [Inputs.ReadingCreateInput], required: true }) }))

export const createManyReadingMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: ['Reading'],
    nullable: false,
    args: createManyReadingMutationArgs,
    resolve: async (_query, _root, args, _context, _info) =>
      await prisma.$transaction(args.data.map((data) => prisma.reading.create({ data }))),
  }),
);

export const createManyReadingMutation = defineMutation((t) => ({
  createManyReading: t.prismaField(createManyReadingMutationObject(t)),
}));

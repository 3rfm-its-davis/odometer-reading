import * as Inputs from "../../inputs";
import { prisma } from "../../../../../prisma/schema/builder";
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const createOneReadingMutationArgs = builder.args((t) => ({ data: t.field({ type: Inputs.ReadingCreateInput, required: true }) }))

export const createOneReadingMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'Reading',
    nullable: false,
    args: createOneReadingMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.reading.create({ data: args.data, ...query }),
  }),
);

export const createOneReadingMutation = defineMutation((t) => ({
  createOneReading: t.prismaField(createOneReadingMutationObject(t)),
}));

import * as Inputs from "../../inputs";

import { BatchPayload } from '../../objects';import { prisma } from "../../../../../prisma/schema/builder";
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationObject } from '../../utils';

export const deleteManyReadingMutationArgs = builder.args((t) => ({ where: t.field({ type: Inputs.ReadingWhereInput, required: true }) }))

export const deleteManyReadingMutationObject = defineMutationFunction((t) =>
  defineMutationObject({
    type: BatchPayload,
    nullable: true,
    args: deleteManyReadingMutationArgs,
    resolve: async (_root, args, _context, _info) =>
      await prisma.reading.deleteMany({ where: args.where }),
  }),
);

export const deleteManyReadingMutation = defineMutation((t) => ({
  deleteManyReading: t.field(deleteManyReadingMutationObject(t)),
}));

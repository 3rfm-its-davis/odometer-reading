import * as Inputs from "../../inputs";

import { BatchPayload } from '../../objects';import { prisma } from "../../../../../prisma/schema/builder";
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationObject } from '../../utils';

export const updateManyReadingMutationArgs = builder.args((t) => ({
      where: t.field({ type: Inputs.ReadingWhereInput, required: false }),
      data: t.field({ type: Inputs.ReadingUpdateManyMutationInput, required: true }),
    }))

export const updateManyReadingMutationObject = defineMutationFunction((t) =>
  defineMutationObject({
    type: BatchPayload,
    nullable: false,
    args: updateManyReadingMutationArgs,
    resolve: async (_root, args, _context, _info) =>
      await prisma.reading.updateMany({ where: args.where || undefined, data: args.data }),
  }),
);

export const updateManyReadingMutation = defineMutation((t) => ({
  updateManyReading: t.field(updateManyReadingMutationObject(t)),
}));

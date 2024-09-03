import * as Inputs from "../../inputs";

import { BatchPayload } from '../../objects';import { prisma } from "../../../../../prisma/schema/builder";
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationObject } from '../../utils';

export const deleteManyMessageMutationArgs = builder.args((t) => ({ where: t.field({ type: Inputs.MessageWhereInput, required: true }) }))

export const deleteManyMessageMutationObject = defineMutationFunction((t) =>
  defineMutationObject({
    type: BatchPayload,
    nullable: true,
    args: deleteManyMessageMutationArgs,
    resolve: async (_root, args, _context, _info) =>
      await prisma.message.deleteMany({ where: args.where }),
  }),
);

export const deleteManyMessageMutation = defineMutation((t) => ({
  deleteManyMessage: t.field(deleteManyMessageMutationObject(t)),
}));

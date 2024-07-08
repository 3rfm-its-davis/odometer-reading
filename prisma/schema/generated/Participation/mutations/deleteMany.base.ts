import * as Inputs from "../../inputs";

import { BatchPayload } from '../../objects';import { prisma } from "../../../../../prisma/schema/builder";
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationObject } from '../../utils';

export const deleteManyParticipationMutationArgs = builder.args((t) => ({ where: t.field({ type: Inputs.ParticipationWhereInput, required: true }) }))

export const deleteManyParticipationMutationObject = defineMutationFunction((t) =>
  defineMutationObject({
    type: BatchPayload,
    nullable: true,
    args: deleteManyParticipationMutationArgs,
    resolve: async (_root, args, _context, _info) =>
      await prisma.participation.deleteMany({ where: args.where }),
  }),
);

export const deleteManyParticipationMutation = defineMutation((t) => ({
  deleteManyParticipation: t.field(deleteManyParticipationMutationObject(t)),
}));

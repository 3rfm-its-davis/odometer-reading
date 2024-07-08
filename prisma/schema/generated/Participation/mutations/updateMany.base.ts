import * as Inputs from "../../inputs";

import { BatchPayload } from '../../objects';import { prisma } from "../../../../../prisma/schema/builder";
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationObject } from '../../utils';

export const updateManyParticipationMutationArgs = builder.args((t) => ({
      where: t.field({ type: Inputs.ParticipationWhereInput, required: false }),
      data: t.field({ type: Inputs.ParticipationUpdateManyMutationInput, required: true }),
    }))

export const updateManyParticipationMutationObject = defineMutationFunction((t) =>
  defineMutationObject({
    type: BatchPayload,
    nullable: false,
    args: updateManyParticipationMutationArgs,
    resolve: async (_root, args, _context, _info) =>
      await prisma.participation.updateMany({ where: args.where || undefined, data: args.data }),
  }),
);

export const updateManyParticipationMutation = defineMutation((t) => ({
  updateManyParticipation: t.field(updateManyParticipationMutationObject(t)),
}));

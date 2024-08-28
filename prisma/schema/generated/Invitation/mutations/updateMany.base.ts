import * as Inputs from "../../inputs";

import { BatchPayload } from '../../objects';import { prisma } from "../../../../../prisma/schema/builder";
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationObject } from '../../utils';

export const updateManyInvitationMutationArgs = builder.args((t) => ({
      where: t.field({ type: Inputs.InvitationWhereInput, required: false }),
      data: t.field({ type: Inputs.InvitationUpdateManyMutationInput, required: true }),
    }))

export const updateManyInvitationMutationObject = defineMutationFunction((t) =>
  defineMutationObject({
    type: BatchPayload,
    nullable: false,
    args: updateManyInvitationMutationArgs,
    resolve: async (_root, args, _context, _info) =>
      await prisma.invitation.updateMany({ where: args.where || undefined, data: args.data }),
  }),
);

export const updateManyInvitationMutation = defineMutation((t) => ({
  updateManyInvitation: t.field(updateManyInvitationMutationObject(t)),
}));

import * as Inputs from "../../inputs";

import { BatchPayload } from '../../objects';import { prisma } from "../../../../../prisma/schema/builder";
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationObject } from '../../utils';

export const deleteManyInvitationMutationArgs = builder.args((t) => ({ where: t.field({ type: Inputs.InvitationWhereInput, required: true }) }))

export const deleteManyInvitationMutationObject = defineMutationFunction((t) =>
  defineMutationObject({
    type: BatchPayload,
    nullable: true,
    args: deleteManyInvitationMutationArgs,
    resolve: async (_root, args, _context, _info) =>
      await prisma.invitation.deleteMany({ where: args.where }),
  }),
);

export const deleteManyInvitationMutation = defineMutation((t) => ({
  deleteManyInvitation: t.field(deleteManyInvitationMutationObject(t)),
}));

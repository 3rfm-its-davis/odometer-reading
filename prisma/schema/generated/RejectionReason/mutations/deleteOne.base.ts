import * as Inputs from "../../inputs";
import { prisma } from "../../../../../prisma/schema/builder";
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const deleteOneRejectionReasonMutationArgs = builder.args((t) => ({ where: t.field({ type: Inputs.RejectionReasonWhereUniqueInput, required: true }) }))

export const deleteOneRejectionReasonMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'RejectionReason',
    nullable: true,
    args: deleteOneRejectionReasonMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.rejectionReason.delete({ where: args.where, ...query }),
  }),
);

export const deleteOneRejectionReasonMutation = defineMutation((t) => ({
  deleteOneRejectionReason: t.prismaField(deleteOneRejectionReasonMutationObject(t)),
}));

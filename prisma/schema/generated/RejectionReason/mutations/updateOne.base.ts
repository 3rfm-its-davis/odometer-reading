import * as Inputs from "../../inputs";
import { prisma } from "../../../../../prisma/schema/builder";
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const updateOneRejectionReasonMutationArgs = builder.args((t) => ({
      where: t.field({ type: Inputs.RejectionReasonWhereUniqueInput, required: true }),
      data: t.field({ type: Inputs.RejectionReasonUpdateInput, required: true }),
    }))

export const updateOneRejectionReasonMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'RejectionReason',
    nullable: true,
    args: updateOneRejectionReasonMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.rejectionReason.update({ where: args.where, data: args.data, ...query }),
  }),
);

export const updateOneRejectionReasonMutation = defineMutation((t) => ({
  updateOneRejectionReason: t.prismaField(updateOneRejectionReasonMutationObject(t)),
}));

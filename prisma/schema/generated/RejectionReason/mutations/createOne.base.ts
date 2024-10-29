import * as Inputs from "../../inputs";
import { prisma } from "../../../../../prisma/schema/builder";
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const createOneRejectionReasonMutationArgs = builder.args((t) => ({ data: t.field({ type: Inputs.RejectionReasonCreateInput, required: true }) }))

export const createOneRejectionReasonMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'RejectionReason',
    nullable: false,
    args: createOneRejectionReasonMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.rejectionReason.create({ data: args.data, ...query }),
  }),
);

export const createOneRejectionReasonMutation = defineMutation((t) => ({
  createOneRejectionReason: t.prismaField(createOneRejectionReasonMutationObject(t)),
}));

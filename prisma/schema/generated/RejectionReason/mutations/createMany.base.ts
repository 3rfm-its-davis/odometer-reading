import * as Inputs from "../../inputs";
import { prisma } from "../../../../../prisma/schema/builder";
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const createManyRejectionReasonMutationArgs = builder.args((t) => ({ data: t.field({ type: [Inputs.RejectionReasonCreateInput], required: true }) }))

export const createManyRejectionReasonMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: ['RejectionReason'],
    nullable: false,
    args: createManyRejectionReasonMutationArgs,
    resolve: async (_query, _root, args, _context, _info) =>
      await prisma.$transaction(args.data.map((data) => prisma.rejectionReason.create({ data }))),
  }),
);

export const createManyRejectionReasonMutation = defineMutation((t) => ({
  createManyRejectionReason: t.prismaField(createManyRejectionReasonMutationObject(t)),
}));

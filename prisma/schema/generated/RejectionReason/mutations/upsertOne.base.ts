import * as Inputs from "../../inputs";
import { prisma } from "../../../../../prisma/schema/builder";
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const upsertOneRejectionReasonMutationArgs = builder.args((t) => ({
      where: t.field({ type: Inputs.RejectionReasonWhereUniqueInput, required: true }),
      create: t.field({ type: Inputs.RejectionReasonCreateInput, required: true }),
      update: t.field({ type: Inputs.RejectionReasonUpdateInput, required: true }),
    }))

export const upsertOneRejectionReasonMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'RejectionReason',
    nullable: false,
    args: upsertOneRejectionReasonMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.rejectionReason.upsert({
        where: args.where,
        create: args.create,
        update: args.update,
        ...query,
      }),
  }),
);

export const upsertOneRejectionReasonMutation = defineMutation((t) => ({
  upsertOneRejectionReason: t.prismaField(upsertOneRejectionReasonMutationObject(t)),
}));

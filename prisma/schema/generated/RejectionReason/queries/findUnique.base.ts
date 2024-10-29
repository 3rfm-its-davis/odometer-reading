import * as Inputs from "../../inputs";
import { prisma } from "../../../../../prisma/schema/builder";
import { builder } from '../../../builder';
import { defineQuery, defineQueryFunction, defineQueryPrismaObject } from '../../utils';

export const findUniqueRejectionReasonQueryArgs = builder.args((t) => ({ where: t.field({ type: Inputs.RejectionReasonWhereUniqueInput, required: true }) }))

export const findUniqueRejectionReasonQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: 'RejectionReason',
    nullable: true,
    args: findUniqueRejectionReasonQueryArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.rejectionReason.findUnique({ where: args.where, ...query }),
  }),
);

export const findUniqueRejectionReasonQuery = defineQuery((t) => ({
  findUniqueRejectionReason: t.prismaField(findUniqueRejectionReasonQueryObject(t)),
}));

import * as Inputs from "../../inputs";
import { prisma } from "../../../../../prisma/schema/builder";
import { builder } from '../../../builder';
import { defineQuery, defineQueryFunction, defineQueryObject } from '../../utils';

export const countRejectionReasonQueryArgs = builder.args((t) => ({
  where: t.field({ type: Inputs.RejectionReasonWhereInput, required: false }),
  orderBy: t.field({ type: [Inputs.RejectionReasonOrderByWithRelationInput], required: false }),
  cursor: t.field({ type: Inputs.RejectionReasonWhereUniqueInput, required: false }),
  take: t.field({ type: 'Int', required: false }),
  skip: t.field({ type: 'Int', required: false }),
  distinct: t.field({ type: [Inputs.RejectionReasonScalarFieldEnum], required: false }),
}))

export const countRejectionReasonQueryObject = defineQueryFunction((t) =>
  defineQueryObject({
    type: 'Int',
    nullable: false,
    args: countRejectionReasonQueryArgs,
    resolve: async (_root, args, _context, _info) =>
      await prisma.rejectionReason.count({
        where: args.where || undefined,
        cursor: args.cursor || undefined,
        take: args.take || undefined,
        skip: args.skip || undefined,
        orderBy: args.orderBy || undefined,
      }),
  }),
);

export const countRejectionReasonQuery = defineQuery((t) => ({
  countRejectionReason: t.field(countRejectionReasonQueryObject(t)),
}));

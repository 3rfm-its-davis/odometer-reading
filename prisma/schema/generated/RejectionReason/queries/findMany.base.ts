import * as Inputs from "../../inputs";
import { prisma } from "../../../../../prisma/schema/builder";
import { builder } from '../../../builder';
import { defineQuery, defineQueryFunction, defineQueryPrismaObject } from '../../utils';

export const findManyRejectionReasonQueryArgs = builder.args((t) => ({
  where: t.field({ type: Inputs.RejectionReasonWhereInput, required: false }),
  orderBy: t.field({ type: [Inputs.RejectionReasonOrderByWithRelationInput], required: false }),
  cursor: t.field({ type: Inputs.RejectionReasonWhereUniqueInput, required: false }),
  take: t.field({ type: 'Int', required: false }),
  skip: t.field({ type: 'Int', required: false }),
  distinct: t.field({ type: [Inputs.RejectionReasonScalarFieldEnum], required: false }),
}))

export const findManyRejectionReasonQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: ['RejectionReason'],
    nullable: false,
    args: findManyRejectionReasonQueryArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.rejectionReason.findMany({
        where: args.where || undefined,
        cursor: args.cursor || undefined,
        take: args.take || undefined,
        distinct: args.distinct || undefined,
        skip: args.skip || undefined,
        orderBy: args.orderBy || undefined,
        ...query,
      }),
  }),
);

export const findManyRejectionReasonQuery = defineQuery((t) => ({
  findManyRejectionReason: t.prismaField(findManyRejectionReasonQueryObject(t)),
}));

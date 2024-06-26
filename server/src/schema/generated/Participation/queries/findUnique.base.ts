import * as Inputs from "../../inputs";
import { prisma } from "../../../../../src/schema/builder";
import { builder } from '../../../builder';
import { defineQuery, defineQueryFunction, defineQueryPrismaObject } from '../../utils';

export const findUniqueParticipationQueryArgs = builder.args((t) => ({ where: t.field({ type: Inputs.ParticipationWhereUniqueInput, required: true }) }))

export const findUniqueParticipationQueryObject = defineQueryFunction((t) =>
  defineQueryPrismaObject({
    type: 'Participation',
    nullable: true,
    args: findUniqueParticipationQueryArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.participation.findUnique({ where: args.where, ...query }),
  }),
);

export const findUniqueParticipationQuery = defineQuery((t) => ({
  findUniqueParticipation: t.prismaField(findUniqueParticipationQueryObject(t)),
}));

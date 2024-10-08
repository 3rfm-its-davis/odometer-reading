import * as Inputs from "../../inputs";
import { prisma } from "../../../../../prisma/schema/builder";
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const updateOneMessageMutationArgs = builder.args((t) => ({
      where: t.field({ type: Inputs.MessageWhereUniqueInput, required: true }),
      data: t.field({ type: Inputs.MessageUpdateInput, required: true }),
    }))

export const updateOneMessageMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'Message',
    nullable: true,
    args: updateOneMessageMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.message.update({ where: args.where, data: args.data, ...query }),
  }),
);

export const updateOneMessageMutation = defineMutation((t) => ({
  updateOneMessage: t.prismaField(updateOneMessageMutationObject(t)),
}));

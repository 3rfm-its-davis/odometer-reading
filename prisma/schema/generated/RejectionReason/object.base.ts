import * as Inputs from "../inputs";

import { builder } from '../../builder';
import {
  definePrismaObject,
  defineFieldObject,
  defineRelationFunction,
  defineRelationObject,
} from '../utils';

export const RejectionReasonObject = definePrismaObject('RejectionReason', {
  description: undefined,
  findUnique: ({ id }) => ({ id }),
  fields: (t) => ({
    id: t.field(RejectionReasonIdFieldObject),
    createdAt: t.field(RejectionReasonCreatedAtFieldObject),
    Post: t.relation('Post', RejectionReasonPostFieldObject(t)),
  }),
});

export const RejectionReasonIdFieldObject = defineFieldObject('RejectionReason', {
  type: "ID",
  description: undefined,
  nullable: false,
  resolve: (parent) => String(parent.id),
});

export const RejectionReasonCreatedAtFieldObject = defineFieldObject('RejectionReason', {
  type: Inputs.DateTime,
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.createdAt,
});

export const RejectionReasonPostFieldArgs = builder.args((t) => ({
  where: t.field({ type: Inputs.PostWhereInput, required: false }),
  orderBy: t.field({ type: [Inputs.PostOrderByWithRelationInput], required: false }),
  cursor: t.field({ type: Inputs.PostWhereUniqueInput, required: false }),
  take: t.field({ type: 'Int', required: false }),
  skip: t.field({ type: 'Int', required: false }),
  distinct: t.field({ type: [Inputs.PostScalarFieldEnum], required: false }),
}))

export const RejectionReasonPostFieldObject = defineRelationFunction('RejectionReason', (t) =>
  defineRelationObject('RejectionReason', 'Post', {
    description: undefined,
    nullable: false,
    args: RejectionReasonPostFieldArgs,
    query: (args) => ({
      where: args.where || undefined,
      cursor: args.cursor || undefined,
      take: args.take || undefined,
      distinct: args.distinct || undefined,
      skip: args.skip || undefined,
      orderBy: args.orderBy || undefined,
    }),
  }),
);

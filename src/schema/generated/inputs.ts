// @ts-nocheck
import { Prisma } from "@prisma/client";

import { builder } from '../builder';

type Filters = {
  string: Prisma.StringFieldUpdateOperationsInput;
  nullableString: Prisma.NullableStringFieldUpdateOperationsInput;
  dateTime: Prisma.DateTimeFieldUpdateOperationsInput;
  nullableDateTime: Prisma.NullableDateTimeFieldUpdateOperationsInput;
  int: Prisma.IntFieldUpdateOperationsInput;
  nullableInt: Prisma.NullableIntFieldUpdateOperationsInput;
  bool: Prisma.BoolFieldUpdateOperationsInput;
  nullableBool: Prisma.NullableBoolFieldUpdateOperationsInput;
  bigInt: Prisma.BigIntFieldUpdateOperationsInput;
  nullableBigInt: Prisma.NullableBigIntFieldUpdateOperationsInput;
  bytes: Prisma.BytesFieldUpdateOperationsInput;
  nullableBytes: Prisma.NullableBytesFieldUpdateOperationsInput;
  float: Prisma.FloatFieldUpdateOperationsInput;
  nullableFloat: Prisma.NullableFloatFieldUpdateOperationsInput;
  decimal: Prisma.DecimalFieldUpdateOperationsInput;
  nullableDecimal: Prisma.NullableDecimalFieldUpdateOperationsInput;
};

type ApplyFilters<InputField> = {
  [F in keyof Filters]: 0 extends 1 & Filters[F]
    ? never
    : Filters[F] extends InputField
    ? Filters[F]
    : never;
}[keyof Filters];

type PrismaUpdateOperationsInputFilter<T extends object> = {
  [K in keyof T]: [ApplyFilters<T[K]>] extends [never] ? T[K] : ApplyFilters<T[K]>
};

export const DateTime = builder.scalarType('DateTime', {
  parseValue: (value) => {
    try {
      const date = new Date(value)
      if (date.toString() === 'Invalid Date') throw new Error('Invalid Date')
      return date
    } catch (error) {
      throw new Error('Invalid Date');
    }
  },
  serialize: (value) => value ? new Date(value) : null,
});

export const Bytes = builder.scalarType('Bytes', {
  serialize: (value) => value,
  parseValue: (value) => {
    if (Array.isArray(value)) return Buffer.from(value);
    if (typeof value === 'string') return Buffer.from(value, 'utf8');
    throw new Error('Bytes must be string or array');
  },
});

export const TransactionIsolationLevel = builder.enumType('TransactionIsolationLevel', {
  values: ["ReadUncommitted","ReadCommitted","RepeatableRead","Serializable","Snapshot"] as const,
});

export const UserScalarFieldEnum = builder.enumType('UserScalarFieldEnum', {
  values: ["id","createdAt","updatedAt","name","phoneNumber","accessCode"] as const,
});

export const PostScalarFieldEnum = builder.enumType('PostScalarFieldEnum', {
  values: ["id","createdAt","image","reading","postStatusId","postedById"] as const,
});

export const PostStatusScalarFieldEnum = builder.enumType('PostStatusScalarFieldEnum', {
  values: ["id","createdAt","type"] as const,
});

export const ParticipationScalarFieldEnum = builder.enumType('ParticipationScalarFieldEnum', {
  values: ["id","createdAt","updatedAt","totalIncentive","userId"] as const,
});

export const IncentiveTableScalarFieldEnum = builder.enumType('IncentiveTableScalarFieldEnum', {
  values: ["id","index","incentive"] as const,
});

export const SortOrder = builder.enumType('SortOrder', {
  values: ["asc","desc"] as const,
});

export const NullsOrder = builder.enumType('NullsOrder', {
  values: ["first","last"] as const,
});

export const UserWhereInputFields = (t: any) => ({
  AND: t.field({"required":false,"type":[UserWhereInput]}),
  OR: t.field({"required":false,"type":[UserWhereInput]}),
  NOT: t.field({"required":false,"type":[UserWhereInput]}),
  id: t.field({"required":false,"type":StringFilter}),
  createdAt: t.field({"required":false,"type":DateTimeFilter}),
  updatedAt: t.field({"required":false,"type":DateTimeFilter}),
  name: t.field({"required":false,"type":StringNullableFilter}),
  phoneNumber: t.field({"required":false,"type":StringNullableFilter}),
  accessCode: t.field({"required":false,"type":StringFilter}),
  posts: t.field({"required":false,"type":PostListRelationFilter}),
  participation: t.field({"required":false,"type":ParticipationWhereInput}),
});
export const UserWhereInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.UserWhereInput>, false>('UserWhereInput').implement({
  fields: UserWhereInputFields,
});

export const UserOrderByWithRelationInputFields = (t: any) => ({
  id: t.field({"required":false,"type":SortOrder}),
  createdAt: t.field({"required":false,"type":SortOrder}),
  updatedAt: t.field({"required":false,"type":SortOrder}),
  name: t.field({"required":false,"type":SortOrder}),
  phoneNumber: t.field({"required":false,"type":SortOrder}),
  accessCode: t.field({"required":false,"type":SortOrder}),
  posts: t.field({"required":false,"type":PostOrderByRelationAggregateInput}),
  participation: t.field({"required":false,"type":ParticipationOrderByWithRelationInput}),
});
export const UserOrderByWithRelationInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.UserOrderByWithRelationInput>, false>('UserOrderByWithRelationInput').implement({
  fields: UserOrderByWithRelationInputFields,
});

export const UserWhereUniqueInputFields = (t: any) => ({
  id: t.string({"required":false}),
  phoneNumber: t.string({"required":false}),
  accessCode: t.string({"required":false}),
  AND: t.field({"required":false,"type":[UserWhereInput]}),
  OR: t.field({"required":false,"type":[UserWhereInput]}),
  NOT: t.field({"required":false,"type":[UserWhereInput]}),
  createdAt: t.field({"required":false,"type":DateTimeFilter}),
  updatedAt: t.field({"required":false,"type":DateTimeFilter}),
  name: t.field({"required":false,"type":StringNullableFilter}),
  posts: t.field({"required":false,"type":PostListRelationFilter}),
  participation: t.field({"required":false,"type":ParticipationWhereInput}),
});
export const UserWhereUniqueInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.UserWhereUniqueInput>, false>('UserWhereUniqueInput').implement({
  fields: UserWhereUniqueInputFields,
});

export const UserOrderByWithAggregationInputFields = (t: any) => ({
  id: t.field({"required":false,"type":SortOrder}),
  createdAt: t.field({"required":false,"type":SortOrder}),
  updatedAt: t.field({"required":false,"type":SortOrder}),
  name: t.field({"required":false,"type":SortOrder}),
  phoneNumber: t.field({"required":false,"type":SortOrder}),
  accessCode: t.field({"required":false,"type":SortOrder}),
  _count: t.field({"required":false,"type":UserCountOrderByAggregateInput}),
  _max: t.field({"required":false,"type":UserMaxOrderByAggregateInput}),
  _min: t.field({"required":false,"type":UserMinOrderByAggregateInput}),
});
export const UserOrderByWithAggregationInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.UserOrderByWithAggregationInput>, false>('UserOrderByWithAggregationInput').implement({
  fields: UserOrderByWithAggregationInputFields,
});

export const UserScalarWhereWithAggregatesInputFields = (t: any) => ({
  AND: t.field({"required":false,"type":[UserScalarWhereWithAggregatesInput]}),
  OR: t.field({"required":false,"type":[UserScalarWhereWithAggregatesInput]}),
  NOT: t.field({"required":false,"type":[UserScalarWhereWithAggregatesInput]}),
  id: t.field({"required":false,"type":StringWithAggregatesFilter}),
  createdAt: t.field({"required":false,"type":DateTimeWithAggregatesFilter}),
  updatedAt: t.field({"required":false,"type":DateTimeWithAggregatesFilter}),
  name: t.field({"required":false,"type":StringNullableWithAggregatesFilter}),
  phoneNumber: t.field({"required":false,"type":StringNullableWithAggregatesFilter}),
  accessCode: t.field({"required":false,"type":StringWithAggregatesFilter}),
});
export const UserScalarWhereWithAggregatesInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.UserScalarWhereWithAggregatesInput>, false>('UserScalarWhereWithAggregatesInput').implement({
  fields: UserScalarWhereWithAggregatesInputFields,
});

export const PostWhereInputFields = (t: any) => ({
  AND: t.field({"required":false,"type":[PostWhereInput]}),
  OR: t.field({"required":false,"type":[PostWhereInput]}),
  NOT: t.field({"required":false,"type":[PostWhereInput]}),
  id: t.field({"required":false,"type":StringFilter}),
  createdAt: t.field({"required":false,"type":DateTimeFilter}),
  image: t.field({"required":false,"type":BytesFilter}),
  reading: t.field({"required":false,"type":FloatNullableFilter}),
  postStatusId: t.field({"required":false,"type":StringFilter}),
  postedById: t.field({"required":false,"type":StringFilter}),
  postStatus: t.field({"required":false,"type":PostStatusWhereInput}),
  postedBy: t.field({"required":false,"type":UserWhereInput}),
});
export const PostWhereInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.PostWhereInput>, false>('PostWhereInput').implement({
  fields: PostWhereInputFields,
});

export const PostOrderByWithRelationInputFields = (t: any) => ({
  id: t.field({"required":false,"type":SortOrder}),
  createdAt: t.field({"required":false,"type":SortOrder}),
  image: t.field({"required":false,"type":SortOrder}),
  reading: t.field({"required":false,"type":SortOrder}),
  postStatusId: t.field({"required":false,"type":SortOrder}),
  postedById: t.field({"required":false,"type":SortOrder}),
  postStatus: t.field({"required":false,"type":PostStatusOrderByWithRelationInput}),
  postedBy: t.field({"required":false,"type":UserOrderByWithRelationInput}),
});
export const PostOrderByWithRelationInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.PostOrderByWithRelationInput>, false>('PostOrderByWithRelationInput').implement({
  fields: PostOrderByWithRelationInputFields,
});

export const PostWhereUniqueInputFields = (t: any) => ({
  id: t.string({"required":false}),
  AND: t.field({"required":false,"type":[PostWhereInput]}),
  OR: t.field({"required":false,"type":[PostWhereInput]}),
  NOT: t.field({"required":false,"type":[PostWhereInput]}),
  createdAt: t.field({"required":false,"type":DateTimeFilter}),
  image: t.field({"required":false,"type":BytesFilter}),
  reading: t.field({"required":false,"type":FloatNullableFilter}),
  postStatusId: t.field({"required":false,"type":StringFilter}),
  postedById: t.field({"required":false,"type":StringFilter}),
  postStatus: t.field({"required":false,"type":PostStatusWhereInput}),
  postedBy: t.field({"required":false,"type":UserWhereInput}),
});
export const PostWhereUniqueInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.PostWhereUniqueInput>, false>('PostWhereUniqueInput').implement({
  fields: PostWhereUniqueInputFields,
});

export const PostOrderByWithAggregationInputFields = (t: any) => ({
  id: t.field({"required":false,"type":SortOrder}),
  createdAt: t.field({"required":false,"type":SortOrder}),
  image: t.field({"required":false,"type":SortOrder}),
  reading: t.field({"required":false,"type":SortOrder}),
  postStatusId: t.field({"required":false,"type":SortOrder}),
  postedById: t.field({"required":false,"type":SortOrder}),
  _count: t.field({"required":false,"type":PostCountOrderByAggregateInput}),
  _avg: t.field({"required":false,"type":PostAvgOrderByAggregateInput}),
  _max: t.field({"required":false,"type":PostMaxOrderByAggregateInput}),
  _min: t.field({"required":false,"type":PostMinOrderByAggregateInput}),
  _sum: t.field({"required":false,"type":PostSumOrderByAggregateInput}),
});
export const PostOrderByWithAggregationInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.PostOrderByWithAggregationInput>, false>('PostOrderByWithAggregationInput').implement({
  fields: PostOrderByWithAggregationInputFields,
});

export const PostScalarWhereWithAggregatesInputFields = (t: any) => ({
  AND: t.field({"required":false,"type":[PostScalarWhereWithAggregatesInput]}),
  OR: t.field({"required":false,"type":[PostScalarWhereWithAggregatesInput]}),
  NOT: t.field({"required":false,"type":[PostScalarWhereWithAggregatesInput]}),
  id: t.field({"required":false,"type":StringWithAggregatesFilter}),
  createdAt: t.field({"required":false,"type":DateTimeWithAggregatesFilter}),
  image: t.field({"required":false,"type":BytesWithAggregatesFilter}),
  reading: t.field({"required":false,"type":FloatNullableWithAggregatesFilter}),
  postStatusId: t.field({"required":false,"type":StringWithAggregatesFilter}),
  postedById: t.field({"required":false,"type":StringWithAggregatesFilter}),
});
export const PostScalarWhereWithAggregatesInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.PostScalarWhereWithAggregatesInput>, false>('PostScalarWhereWithAggregatesInput').implement({
  fields: PostScalarWhereWithAggregatesInputFields,
});

export const PostStatusWhereInputFields = (t: any) => ({
  AND: t.field({"required":false,"type":[PostStatusWhereInput]}),
  OR: t.field({"required":false,"type":[PostStatusWhereInput]}),
  NOT: t.field({"required":false,"type":[PostStatusWhereInput]}),
  id: t.field({"required":false,"type":StringFilter}),
  createdAt: t.field({"required":false,"type":DateTimeFilter}),
  type: t.field({"required":false,"type":StringFilter}),
  Post: t.field({"required":false,"type":PostListRelationFilter}),
});
export const PostStatusWhereInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.PostStatusWhereInput>, false>('PostStatusWhereInput').implement({
  fields: PostStatusWhereInputFields,
});

export const PostStatusOrderByWithRelationInputFields = (t: any) => ({
  id: t.field({"required":false,"type":SortOrder}),
  createdAt: t.field({"required":false,"type":SortOrder}),
  type: t.field({"required":false,"type":SortOrder}),
  Post: t.field({"required":false,"type":PostOrderByRelationAggregateInput}),
});
export const PostStatusOrderByWithRelationInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.PostStatusOrderByWithRelationInput>, false>('PostStatusOrderByWithRelationInput').implement({
  fields: PostStatusOrderByWithRelationInputFields,
});

export const PostStatusWhereUniqueInputFields = (t: any) => ({
  id: t.string({"required":false}),
  AND: t.field({"required":false,"type":[PostStatusWhereInput]}),
  OR: t.field({"required":false,"type":[PostStatusWhereInput]}),
  NOT: t.field({"required":false,"type":[PostStatusWhereInput]}),
  createdAt: t.field({"required":false,"type":DateTimeFilter}),
  type: t.field({"required":false,"type":StringFilter}),
  Post: t.field({"required":false,"type":PostListRelationFilter}),
});
export const PostStatusWhereUniqueInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.PostStatusWhereUniqueInput>, false>('PostStatusWhereUniqueInput').implement({
  fields: PostStatusWhereUniqueInputFields,
});

export const PostStatusOrderByWithAggregationInputFields = (t: any) => ({
  id: t.field({"required":false,"type":SortOrder}),
  createdAt: t.field({"required":false,"type":SortOrder}),
  type: t.field({"required":false,"type":SortOrder}),
  _count: t.field({"required":false,"type":PostStatusCountOrderByAggregateInput}),
  _max: t.field({"required":false,"type":PostStatusMaxOrderByAggregateInput}),
  _min: t.field({"required":false,"type":PostStatusMinOrderByAggregateInput}),
});
export const PostStatusOrderByWithAggregationInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.PostStatusOrderByWithAggregationInput>, false>('PostStatusOrderByWithAggregationInput').implement({
  fields: PostStatusOrderByWithAggregationInputFields,
});

export const PostStatusScalarWhereWithAggregatesInputFields = (t: any) => ({
  AND: t.field({"required":false,"type":[PostStatusScalarWhereWithAggregatesInput]}),
  OR: t.field({"required":false,"type":[PostStatusScalarWhereWithAggregatesInput]}),
  NOT: t.field({"required":false,"type":[PostStatusScalarWhereWithAggregatesInput]}),
  id: t.field({"required":false,"type":StringWithAggregatesFilter}),
  createdAt: t.field({"required":false,"type":DateTimeWithAggregatesFilter}),
  type: t.field({"required":false,"type":StringWithAggregatesFilter}),
});
export const PostStatusScalarWhereWithAggregatesInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.PostStatusScalarWhereWithAggregatesInput>, false>('PostStatusScalarWhereWithAggregatesInput').implement({
  fields: PostStatusScalarWhereWithAggregatesInputFields,
});

export const ParticipationWhereInputFields = (t: any) => ({
  AND: t.field({"required":false,"type":[ParticipationWhereInput]}),
  OR: t.field({"required":false,"type":[ParticipationWhereInput]}),
  NOT: t.field({"required":false,"type":[ParticipationWhereInput]}),
  id: t.field({"required":false,"type":StringFilter}),
  createdAt: t.field({"required":false,"type":DateTimeFilter}),
  updatedAt: t.field({"required":false,"type":DateTimeFilter}),
  totalIncentive: t.field({"required":false,"type":FloatFilter}),
  userId: t.field({"required":false,"type":StringFilter}),
  user: t.field({"required":false,"type":UserWhereInput}),
});
export const ParticipationWhereInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.ParticipationWhereInput>, false>('ParticipationWhereInput').implement({
  fields: ParticipationWhereInputFields,
});

export const ParticipationOrderByWithRelationInputFields = (t: any) => ({
  id: t.field({"required":false,"type":SortOrder}),
  createdAt: t.field({"required":false,"type":SortOrder}),
  updatedAt: t.field({"required":false,"type":SortOrder}),
  totalIncentive: t.field({"required":false,"type":SortOrder}),
  userId: t.field({"required":false,"type":SortOrder}),
  user: t.field({"required":false,"type":UserOrderByWithRelationInput}),
});
export const ParticipationOrderByWithRelationInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.ParticipationOrderByWithRelationInput>, false>('ParticipationOrderByWithRelationInput').implement({
  fields: ParticipationOrderByWithRelationInputFields,
});

export const ParticipationWhereUniqueInputFields = (t: any) => ({
  id: t.string({"required":false}),
  userId: t.string({"required":false}),
  AND: t.field({"required":false,"type":[ParticipationWhereInput]}),
  OR: t.field({"required":false,"type":[ParticipationWhereInput]}),
  NOT: t.field({"required":false,"type":[ParticipationWhereInput]}),
  createdAt: t.field({"required":false,"type":DateTimeFilter}),
  updatedAt: t.field({"required":false,"type":DateTimeFilter}),
  totalIncentive: t.field({"required":false,"type":FloatFilter}),
  user: t.field({"required":false,"type":UserWhereInput}),
});
export const ParticipationWhereUniqueInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.ParticipationWhereUniqueInput>, false>('ParticipationWhereUniqueInput').implement({
  fields: ParticipationWhereUniqueInputFields,
});

export const ParticipationOrderByWithAggregationInputFields = (t: any) => ({
  id: t.field({"required":false,"type":SortOrder}),
  createdAt: t.field({"required":false,"type":SortOrder}),
  updatedAt: t.field({"required":false,"type":SortOrder}),
  totalIncentive: t.field({"required":false,"type":SortOrder}),
  userId: t.field({"required":false,"type":SortOrder}),
  _count: t.field({"required":false,"type":ParticipationCountOrderByAggregateInput}),
  _avg: t.field({"required":false,"type":ParticipationAvgOrderByAggregateInput}),
  _max: t.field({"required":false,"type":ParticipationMaxOrderByAggregateInput}),
  _min: t.field({"required":false,"type":ParticipationMinOrderByAggregateInput}),
  _sum: t.field({"required":false,"type":ParticipationSumOrderByAggregateInput}),
});
export const ParticipationOrderByWithAggregationInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.ParticipationOrderByWithAggregationInput>, false>('ParticipationOrderByWithAggregationInput').implement({
  fields: ParticipationOrderByWithAggregationInputFields,
});

export const ParticipationScalarWhereWithAggregatesInputFields = (t: any) => ({
  AND: t.field({"required":false,"type":[ParticipationScalarWhereWithAggregatesInput]}),
  OR: t.field({"required":false,"type":[ParticipationScalarWhereWithAggregatesInput]}),
  NOT: t.field({"required":false,"type":[ParticipationScalarWhereWithAggregatesInput]}),
  id: t.field({"required":false,"type":StringWithAggregatesFilter}),
  createdAt: t.field({"required":false,"type":DateTimeWithAggregatesFilter}),
  updatedAt: t.field({"required":false,"type":DateTimeWithAggregatesFilter}),
  totalIncentive: t.field({"required":false,"type":FloatWithAggregatesFilter}),
  userId: t.field({"required":false,"type":StringWithAggregatesFilter}),
});
export const ParticipationScalarWhereWithAggregatesInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.ParticipationScalarWhereWithAggregatesInput>, false>('ParticipationScalarWhereWithAggregatesInput').implement({
  fields: ParticipationScalarWhereWithAggregatesInputFields,
});

export const IncentiveTableWhereInputFields = (t: any) => ({
  AND: t.field({"required":false,"type":[IncentiveTableWhereInput]}),
  OR: t.field({"required":false,"type":[IncentiveTableWhereInput]}),
  NOT: t.field({"required":false,"type":[IncentiveTableWhereInput]}),
  id: t.field({"required":false,"type":StringFilter}),
  index: t.field({"required":false,"type":IntFilter}),
  incentive: t.field({"required":false,"type":FloatFilter}),
});
export const IncentiveTableWhereInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.IncentiveTableWhereInput>, false>('IncentiveTableWhereInput').implement({
  fields: IncentiveTableWhereInputFields,
});

export const IncentiveTableOrderByWithRelationInputFields = (t: any) => ({
  id: t.field({"required":false,"type":SortOrder}),
  index: t.field({"required":false,"type":SortOrder}),
  incentive: t.field({"required":false,"type":SortOrder}),
});
export const IncentiveTableOrderByWithRelationInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.IncentiveTableOrderByWithRelationInput>, false>('IncentiveTableOrderByWithRelationInput').implement({
  fields: IncentiveTableOrderByWithRelationInputFields,
});

export const IncentiveTableWhereUniqueInputFields = (t: any) => ({
  id: t.string({"required":false}),
  AND: t.field({"required":false,"type":[IncentiveTableWhereInput]}),
  OR: t.field({"required":false,"type":[IncentiveTableWhereInput]}),
  NOT: t.field({"required":false,"type":[IncentiveTableWhereInput]}),
  index: t.field({"required":false,"type":IntFilter}),
  incentive: t.field({"required":false,"type":FloatFilter}),
});
export const IncentiveTableWhereUniqueInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.IncentiveTableWhereUniqueInput>, false>('IncentiveTableWhereUniqueInput').implement({
  fields: IncentiveTableWhereUniqueInputFields,
});

export const IncentiveTableOrderByWithAggregationInputFields = (t: any) => ({
  id: t.field({"required":false,"type":SortOrder}),
  index: t.field({"required":false,"type":SortOrder}),
  incentive: t.field({"required":false,"type":SortOrder}),
  _count: t.field({"required":false,"type":IncentiveTableCountOrderByAggregateInput}),
  _avg: t.field({"required":false,"type":IncentiveTableAvgOrderByAggregateInput}),
  _max: t.field({"required":false,"type":IncentiveTableMaxOrderByAggregateInput}),
  _min: t.field({"required":false,"type":IncentiveTableMinOrderByAggregateInput}),
  _sum: t.field({"required":false,"type":IncentiveTableSumOrderByAggregateInput}),
});
export const IncentiveTableOrderByWithAggregationInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.IncentiveTableOrderByWithAggregationInput>, false>('IncentiveTableOrderByWithAggregationInput').implement({
  fields: IncentiveTableOrderByWithAggregationInputFields,
});

export const IncentiveTableScalarWhereWithAggregatesInputFields = (t: any) => ({
  AND: t.field({"required":false,"type":[IncentiveTableScalarWhereWithAggregatesInput]}),
  OR: t.field({"required":false,"type":[IncentiveTableScalarWhereWithAggregatesInput]}),
  NOT: t.field({"required":false,"type":[IncentiveTableScalarWhereWithAggregatesInput]}),
  id: t.field({"required":false,"type":StringWithAggregatesFilter}),
  index: t.field({"required":false,"type":IntWithAggregatesFilter}),
  incentive: t.field({"required":false,"type":FloatWithAggregatesFilter}),
});
export const IncentiveTableScalarWhereWithAggregatesInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.IncentiveTableScalarWhereWithAggregatesInput>, false>('IncentiveTableScalarWhereWithAggregatesInput').implement({
  fields: IncentiveTableScalarWhereWithAggregatesInputFields,
});

export const UserCreateInputFields = (t: any) => ({
  id: t.string({"required":false}),
  createdAt: t.field({"required":false,"type":DateTime}),
  updatedAt: t.field({"required":false,"type":DateTime}),
  name: t.string({"required":false}),
  phoneNumber: t.string({"required":false}),
  accessCode: t.string({"required":true}),
  posts: t.field({"required":false,"type":PostCreateNestedManyWithoutPostedByInput}),
  participation: t.field({"required":false,"type":ParticipationCreateNestedOneWithoutUserInput}),
});
export const UserCreateInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.UserCreateInput>, false>('UserCreateInput').implement({
  fields: UserCreateInputFields,
});

export const UserUpdateInputFields = (t: any) => ({
  id: t.field({"required":false,"type":StringFieldUpdateOperationsInput}),
  createdAt: t.field({"required":false,"type":DateTimeFieldUpdateOperationsInput}),
  updatedAt: t.field({"required":false,"type":DateTimeFieldUpdateOperationsInput}),
  name: t.field({"required":false,"type":NullableStringFieldUpdateOperationsInput}),
  phoneNumber: t.field({"required":false,"type":NullableStringFieldUpdateOperationsInput}),
  accessCode: t.field({"required":false,"type":StringFieldUpdateOperationsInput}),
  posts: t.field({"required":false,"type":PostUpdateManyWithoutPostedByNestedInput}),
  participation: t.field({"required":false,"type":ParticipationUpdateOneWithoutUserNestedInput}),
});
export const UserUpdateInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.UserUpdateInput>, false>('UserUpdateInput').implement({
  fields: UserUpdateInputFields,
});

export const UserCreateManyInputFields = (t: any) => ({
  id: t.string({"required":false}),
  createdAt: t.field({"required":false,"type":DateTime}),
  updatedAt: t.field({"required":false,"type":DateTime}),
  name: t.string({"required":false}),
  phoneNumber: t.string({"required":false}),
  accessCode: t.string({"required":true}),
});
export const UserCreateManyInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.UserCreateManyInput>, false>('UserCreateManyInput').implement({
  fields: UserCreateManyInputFields,
});

export const UserUpdateManyMutationInputFields = (t: any) => ({
  id: t.field({"required":false,"type":StringFieldUpdateOperationsInput}),
  createdAt: t.field({"required":false,"type":DateTimeFieldUpdateOperationsInput}),
  updatedAt: t.field({"required":false,"type":DateTimeFieldUpdateOperationsInput}),
  name: t.field({"required":false,"type":NullableStringFieldUpdateOperationsInput}),
  phoneNumber: t.field({"required":false,"type":NullableStringFieldUpdateOperationsInput}),
  accessCode: t.field({"required":false,"type":StringFieldUpdateOperationsInput}),
});
export const UserUpdateManyMutationInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.UserUpdateManyMutationInput>, false>('UserUpdateManyMutationInput').implement({
  fields: UserUpdateManyMutationInputFields,
});

export const PostCreateInputFields = (t: any) => ({
  id: t.string({"required":false}),
  createdAt: t.field({"required":false,"type":DateTime}),
  image: t.field({"required":true,"type":Bytes}),
  reading: t.float({"required":false}),
  postStatus: t.field({"required":true,"type":PostStatusCreateNestedOneWithoutPostInput}),
  postedBy: t.field({"required":true,"type":UserCreateNestedOneWithoutPostsInput}),
});
export const PostCreateInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.PostCreateInput>, false>('PostCreateInput').implement({
  fields: PostCreateInputFields,
});

export const PostUpdateInputFields = (t: any) => ({
  id: t.field({"required":false,"type":StringFieldUpdateOperationsInput}),
  createdAt: t.field({"required":false,"type":DateTimeFieldUpdateOperationsInput}),
  image: t.field({"required":false,"type":BytesFieldUpdateOperationsInput}),
  reading: t.field({"required":false,"type":NullableFloatFieldUpdateOperationsInput}),
  postStatus: t.field({"required":false,"type":PostStatusUpdateOneRequiredWithoutPostNestedInput}),
  postedBy: t.field({"required":false,"type":UserUpdateOneRequiredWithoutPostsNestedInput}),
});
export const PostUpdateInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.PostUpdateInput>, false>('PostUpdateInput').implement({
  fields: PostUpdateInputFields,
});

export const PostCreateManyInputFields = (t: any) => ({
  id: t.string({"required":false}),
  createdAt: t.field({"required":false,"type":DateTime}),
  image: t.field({"required":true,"type":Bytes}),
  reading: t.float({"required":false}),
  postStatusId: t.string({"required":true}),
  postedById: t.string({"required":true}),
});
export const PostCreateManyInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.PostCreateManyInput>, false>('PostCreateManyInput').implement({
  fields: PostCreateManyInputFields,
});

export const PostUpdateManyMutationInputFields = (t: any) => ({
  id: t.field({"required":false,"type":StringFieldUpdateOperationsInput}),
  createdAt: t.field({"required":false,"type":DateTimeFieldUpdateOperationsInput}),
  image: t.field({"required":false,"type":BytesFieldUpdateOperationsInput}),
  reading: t.field({"required":false,"type":NullableFloatFieldUpdateOperationsInput}),
});
export const PostUpdateManyMutationInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.PostUpdateManyMutationInput>, false>('PostUpdateManyMutationInput').implement({
  fields: PostUpdateManyMutationInputFields,
});

export const PostStatusCreateInputFields = (t: any) => ({
  id: t.string({"required":false}),
  createdAt: t.field({"required":false,"type":DateTime}),
  type: t.string({"required":true}),
  Post: t.field({"required":false,"type":PostCreateNestedManyWithoutPostStatusInput}),
});
export const PostStatusCreateInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.PostStatusCreateInput>, false>('PostStatusCreateInput').implement({
  fields: PostStatusCreateInputFields,
});

export const PostStatusUpdateInputFields = (t: any) => ({
  id: t.field({"required":false,"type":StringFieldUpdateOperationsInput}),
  createdAt: t.field({"required":false,"type":DateTimeFieldUpdateOperationsInput}),
  type: t.field({"required":false,"type":StringFieldUpdateOperationsInput}),
  Post: t.field({"required":false,"type":PostUpdateManyWithoutPostStatusNestedInput}),
});
export const PostStatusUpdateInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.PostStatusUpdateInput>, false>('PostStatusUpdateInput').implement({
  fields: PostStatusUpdateInputFields,
});

export const PostStatusCreateManyInputFields = (t: any) => ({
  id: t.string({"required":false}),
  createdAt: t.field({"required":false,"type":DateTime}),
  type: t.string({"required":true}),
});
export const PostStatusCreateManyInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.PostStatusCreateManyInput>, false>('PostStatusCreateManyInput').implement({
  fields: PostStatusCreateManyInputFields,
});

export const PostStatusUpdateManyMutationInputFields = (t: any) => ({
  id: t.field({"required":false,"type":StringFieldUpdateOperationsInput}),
  createdAt: t.field({"required":false,"type":DateTimeFieldUpdateOperationsInput}),
  type: t.field({"required":false,"type":StringFieldUpdateOperationsInput}),
});
export const PostStatusUpdateManyMutationInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.PostStatusUpdateManyMutationInput>, false>('PostStatusUpdateManyMutationInput').implement({
  fields: PostStatusUpdateManyMutationInputFields,
});

export const ParticipationCreateInputFields = (t: any) => ({
  id: t.string({"required":false}),
  createdAt: t.field({"required":false,"type":DateTime}),
  updatedAt: t.field({"required":false,"type":DateTime}),
  totalIncentive: t.float({"required":true}),
  user: t.field({"required":true,"type":UserCreateNestedOneWithoutParticipationInput}),
});
export const ParticipationCreateInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.ParticipationCreateInput>, false>('ParticipationCreateInput').implement({
  fields: ParticipationCreateInputFields,
});

export const ParticipationUpdateInputFields = (t: any) => ({
  id: t.field({"required":false,"type":StringFieldUpdateOperationsInput}),
  createdAt: t.field({"required":false,"type":DateTimeFieldUpdateOperationsInput}),
  updatedAt: t.field({"required":false,"type":DateTimeFieldUpdateOperationsInput}),
  totalIncentive: t.field({"required":false,"type":FloatFieldUpdateOperationsInput}),
  user: t.field({"required":false,"type":UserUpdateOneRequiredWithoutParticipationNestedInput}),
});
export const ParticipationUpdateInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.ParticipationUpdateInput>, false>('ParticipationUpdateInput').implement({
  fields: ParticipationUpdateInputFields,
});

export const ParticipationCreateManyInputFields = (t: any) => ({
  id: t.string({"required":false}),
  createdAt: t.field({"required":false,"type":DateTime}),
  updatedAt: t.field({"required":false,"type":DateTime}),
  totalIncentive: t.float({"required":true}),
  userId: t.string({"required":true}),
});
export const ParticipationCreateManyInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.ParticipationCreateManyInput>, false>('ParticipationCreateManyInput').implement({
  fields: ParticipationCreateManyInputFields,
});

export const ParticipationUpdateManyMutationInputFields = (t: any) => ({
  id: t.field({"required":false,"type":StringFieldUpdateOperationsInput}),
  createdAt: t.field({"required":false,"type":DateTimeFieldUpdateOperationsInput}),
  updatedAt: t.field({"required":false,"type":DateTimeFieldUpdateOperationsInput}),
  totalIncentive: t.field({"required":false,"type":FloatFieldUpdateOperationsInput}),
});
export const ParticipationUpdateManyMutationInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.ParticipationUpdateManyMutationInput>, false>('ParticipationUpdateManyMutationInput').implement({
  fields: ParticipationUpdateManyMutationInputFields,
});

export const IncentiveTableCreateInputFields = (t: any) => ({
  id: t.string({"required":false}),
  index: t.int({"required":true}),
  incentive: t.float({"required":true}),
});
export const IncentiveTableCreateInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.IncentiveTableCreateInput>, false>('IncentiveTableCreateInput').implement({
  fields: IncentiveTableCreateInputFields,
});

export const IncentiveTableUpdateInputFields = (t: any) => ({
  id: t.field({"required":false,"type":StringFieldUpdateOperationsInput}),
  index: t.field({"required":false,"type":IntFieldUpdateOperationsInput}),
  incentive: t.field({"required":false,"type":FloatFieldUpdateOperationsInput}),
});
export const IncentiveTableUpdateInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.IncentiveTableUpdateInput>, false>('IncentiveTableUpdateInput').implement({
  fields: IncentiveTableUpdateInputFields,
});

export const IncentiveTableCreateManyInputFields = (t: any) => ({
  id: t.string({"required":false}),
  index: t.int({"required":true}),
  incentive: t.float({"required":true}),
});
export const IncentiveTableCreateManyInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.IncentiveTableCreateManyInput>, false>('IncentiveTableCreateManyInput').implement({
  fields: IncentiveTableCreateManyInputFields,
});

export const IncentiveTableUpdateManyMutationInputFields = (t: any) => ({
  id: t.field({"required":false,"type":StringFieldUpdateOperationsInput}),
  index: t.field({"required":false,"type":IntFieldUpdateOperationsInput}),
  incentive: t.field({"required":false,"type":FloatFieldUpdateOperationsInput}),
});
export const IncentiveTableUpdateManyMutationInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.IncentiveTableUpdateManyMutationInput>, false>('IncentiveTableUpdateManyMutationInput').implement({
  fields: IncentiveTableUpdateManyMutationInputFields,
});

export const StringFilterFields = (t: any) => ({
  equals: t.string({"required":false}),
  in: t.stringList({"required":false}),
  notIn: t.stringList({"required":false}),
  lt: t.string({"required":false}),
  lte: t.string({"required":false}),
  gt: t.string({"required":false}),
  gte: t.string({"required":false}),
  contains: t.string({"required":false}),
  startsWith: t.string({"required":false}),
  endsWith: t.string({"required":false}),
  not: t.field({"required":false,"type":NestedStringFilter}),
});
export const StringFilter = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.StringFilter>, false>('StringFilter').implement({
  fields: StringFilterFields,
});

export const DateTimeFilterFields = (t: any) => ({
  equals: t.field({"required":false,"type":DateTime}),
  in: t.field({"required":false,"type":[DateTime]}),
  notIn: t.field({"required":false,"type":[DateTime]}),
  lt: t.field({"required":false,"type":DateTime}),
  lte: t.field({"required":false,"type":DateTime}),
  gt: t.field({"required":false,"type":DateTime}),
  gte: t.field({"required":false,"type":DateTime}),
  not: t.field({"required":false,"type":NestedDateTimeFilter}),
});
export const DateTimeFilter = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.DateTimeFilter>, false>('DateTimeFilter').implement({
  fields: DateTimeFilterFields,
});

export const StringNullableFilterFields = (t: any) => ({
  equals: t.string({"required":false}),
  in: t.stringList({"required":false}),
  notIn: t.stringList({"required":false}),
  lt: t.string({"required":false}),
  lte: t.string({"required":false}),
  gt: t.string({"required":false}),
  gte: t.string({"required":false}),
  contains: t.string({"required":false}),
  startsWith: t.string({"required":false}),
  endsWith: t.string({"required":false}),
  not: t.field({"required":false,"type":NestedStringNullableFilter}),
});
export const StringNullableFilter = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.StringNullableFilter>, false>('StringNullableFilter').implement({
  fields: StringNullableFilterFields,
});

export const PostListRelationFilterFields = (t: any) => ({
  every: t.field({"required":false,"type":PostWhereInput}),
  some: t.field({"required":false,"type":PostWhereInput}),
  none: t.field({"required":false,"type":PostWhereInput}),
});
export const PostListRelationFilter = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.PostListRelationFilter>, false>('PostListRelationFilter').implement({
  fields: PostListRelationFilterFields,
});

export const ParticipationNullableRelationFilterFields = (t: any) => ({
  is: t.field({"required":false,"type":ParticipationWhereInput}),
  isNot: t.field({"required":false,"type":ParticipationWhereInput}),
});
export const ParticipationNullableRelationFilter = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.ParticipationNullableRelationFilter>, false>('ParticipationNullableRelationFilter').implement({
  fields: ParticipationNullableRelationFilterFields,
});

export const PostOrderByRelationAggregateInputFields = (t: any) => ({
  _count: t.field({"required":false,"type":SortOrder}),
});
export const PostOrderByRelationAggregateInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.PostOrderByRelationAggregateInput>, false>('PostOrderByRelationAggregateInput').implement({
  fields: PostOrderByRelationAggregateInputFields,
});

export const UserCountOrderByAggregateInputFields = (t: any) => ({
  id: t.field({"required":false,"type":SortOrder}),
  createdAt: t.field({"required":false,"type":SortOrder}),
  updatedAt: t.field({"required":false,"type":SortOrder}),
  name: t.field({"required":false,"type":SortOrder}),
  phoneNumber: t.field({"required":false,"type":SortOrder}),
  accessCode: t.field({"required":false,"type":SortOrder}),
});
export const UserCountOrderByAggregateInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.UserCountOrderByAggregateInput>, false>('UserCountOrderByAggregateInput').implement({
  fields: UserCountOrderByAggregateInputFields,
});

export const UserMaxOrderByAggregateInputFields = (t: any) => ({
  id: t.field({"required":false,"type":SortOrder}),
  createdAt: t.field({"required":false,"type":SortOrder}),
  updatedAt: t.field({"required":false,"type":SortOrder}),
  name: t.field({"required":false,"type":SortOrder}),
  phoneNumber: t.field({"required":false,"type":SortOrder}),
  accessCode: t.field({"required":false,"type":SortOrder}),
});
export const UserMaxOrderByAggregateInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.UserMaxOrderByAggregateInput>, false>('UserMaxOrderByAggregateInput').implement({
  fields: UserMaxOrderByAggregateInputFields,
});

export const UserMinOrderByAggregateInputFields = (t: any) => ({
  id: t.field({"required":false,"type":SortOrder}),
  createdAt: t.field({"required":false,"type":SortOrder}),
  updatedAt: t.field({"required":false,"type":SortOrder}),
  name: t.field({"required":false,"type":SortOrder}),
  phoneNumber: t.field({"required":false,"type":SortOrder}),
  accessCode: t.field({"required":false,"type":SortOrder}),
});
export const UserMinOrderByAggregateInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.UserMinOrderByAggregateInput>, false>('UserMinOrderByAggregateInput').implement({
  fields: UserMinOrderByAggregateInputFields,
});

export const StringWithAggregatesFilterFields = (t: any) => ({
  equals: t.string({"required":false}),
  in: t.stringList({"required":false}),
  notIn: t.stringList({"required":false}),
  lt: t.string({"required":false}),
  lte: t.string({"required":false}),
  gt: t.string({"required":false}),
  gte: t.string({"required":false}),
  contains: t.string({"required":false}),
  startsWith: t.string({"required":false}),
  endsWith: t.string({"required":false}),
  not: t.field({"required":false,"type":NestedStringWithAggregatesFilter}),
  _count: t.field({"required":false,"type":NestedIntFilter}),
  _min: t.field({"required":false,"type":NestedStringFilter}),
  _max: t.field({"required":false,"type":NestedStringFilter}),
});
export const StringWithAggregatesFilter = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.StringWithAggregatesFilter>, false>('StringWithAggregatesFilter').implement({
  fields: StringWithAggregatesFilterFields,
});

export const DateTimeWithAggregatesFilterFields = (t: any) => ({
  equals: t.field({"required":false,"type":DateTime}),
  in: t.field({"required":false,"type":[DateTime]}),
  notIn: t.field({"required":false,"type":[DateTime]}),
  lt: t.field({"required":false,"type":DateTime}),
  lte: t.field({"required":false,"type":DateTime}),
  gt: t.field({"required":false,"type":DateTime}),
  gte: t.field({"required":false,"type":DateTime}),
  not: t.field({"required":false,"type":NestedDateTimeWithAggregatesFilter}),
  _count: t.field({"required":false,"type":NestedIntFilter}),
  _min: t.field({"required":false,"type":NestedDateTimeFilter}),
  _max: t.field({"required":false,"type":NestedDateTimeFilter}),
});
export const DateTimeWithAggregatesFilter = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.DateTimeWithAggregatesFilter>, false>('DateTimeWithAggregatesFilter').implement({
  fields: DateTimeWithAggregatesFilterFields,
});

export const StringNullableWithAggregatesFilterFields = (t: any) => ({
  equals: t.string({"required":false}),
  in: t.stringList({"required":false}),
  notIn: t.stringList({"required":false}),
  lt: t.string({"required":false}),
  lte: t.string({"required":false}),
  gt: t.string({"required":false}),
  gte: t.string({"required":false}),
  contains: t.string({"required":false}),
  startsWith: t.string({"required":false}),
  endsWith: t.string({"required":false}),
  not: t.field({"required":false,"type":NestedStringNullableWithAggregatesFilter}),
  _count: t.field({"required":false,"type":NestedIntNullableFilter}),
  _min: t.field({"required":false,"type":NestedStringNullableFilter}),
  _max: t.field({"required":false,"type":NestedStringNullableFilter}),
});
export const StringNullableWithAggregatesFilter = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.StringNullableWithAggregatesFilter>, false>('StringNullableWithAggregatesFilter').implement({
  fields: StringNullableWithAggregatesFilterFields,
});

export const BytesFilterFields = (t: any) => ({
  equals: t.field({"required":false,"type":Bytes}),
  in: t.field({"required":false,"type":[Bytes]}),
  notIn: t.field({"required":false,"type":[Bytes]}),
  not: t.field({"required":false,"type":NestedBytesFilter}),
});
export const BytesFilter = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.BytesFilter>, false>('BytesFilter').implement({
  fields: BytesFilterFields,
});

export const FloatNullableFilterFields = (t: any) => ({
  equals: t.float({"required":false}),
  in: t.floatList({"required":false}),
  notIn: t.floatList({"required":false}),
  lt: t.float({"required":false}),
  lte: t.float({"required":false}),
  gt: t.float({"required":false}),
  gte: t.float({"required":false}),
  not: t.field({"required":false,"type":NestedFloatNullableFilter}),
});
export const FloatNullableFilter = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.FloatNullableFilter>, false>('FloatNullableFilter').implement({
  fields: FloatNullableFilterFields,
});

export const PostStatusRelationFilterFields = (t: any) => ({
  is: t.field({"required":false,"type":PostStatusWhereInput}),
  isNot: t.field({"required":false,"type":PostStatusWhereInput}),
});
export const PostStatusRelationFilter = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.PostStatusRelationFilter>, false>('PostStatusRelationFilter').implement({
  fields: PostStatusRelationFilterFields,
});

export const UserRelationFilterFields = (t: any) => ({
  is: t.field({"required":false,"type":UserWhereInput}),
  isNot: t.field({"required":false,"type":UserWhereInput}),
});
export const UserRelationFilter = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.UserRelationFilter>, false>('UserRelationFilter').implement({
  fields: UserRelationFilterFields,
});

export const PostCountOrderByAggregateInputFields = (t: any) => ({
  id: t.field({"required":false,"type":SortOrder}),
  createdAt: t.field({"required":false,"type":SortOrder}),
  image: t.field({"required":false,"type":SortOrder}),
  reading: t.field({"required":false,"type":SortOrder}),
  postStatusId: t.field({"required":false,"type":SortOrder}),
  postedById: t.field({"required":false,"type":SortOrder}),
});
export const PostCountOrderByAggregateInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.PostCountOrderByAggregateInput>, false>('PostCountOrderByAggregateInput').implement({
  fields: PostCountOrderByAggregateInputFields,
});

export const PostAvgOrderByAggregateInputFields = (t: any) => ({
  reading: t.field({"required":false,"type":SortOrder}),
});
export const PostAvgOrderByAggregateInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.PostAvgOrderByAggregateInput>, false>('PostAvgOrderByAggregateInput').implement({
  fields: PostAvgOrderByAggregateInputFields,
});

export const PostMaxOrderByAggregateInputFields = (t: any) => ({
  id: t.field({"required":false,"type":SortOrder}),
  createdAt: t.field({"required":false,"type":SortOrder}),
  image: t.field({"required":false,"type":SortOrder}),
  reading: t.field({"required":false,"type":SortOrder}),
  postStatusId: t.field({"required":false,"type":SortOrder}),
  postedById: t.field({"required":false,"type":SortOrder}),
});
export const PostMaxOrderByAggregateInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.PostMaxOrderByAggregateInput>, false>('PostMaxOrderByAggregateInput').implement({
  fields: PostMaxOrderByAggregateInputFields,
});

export const PostMinOrderByAggregateInputFields = (t: any) => ({
  id: t.field({"required":false,"type":SortOrder}),
  createdAt: t.field({"required":false,"type":SortOrder}),
  image: t.field({"required":false,"type":SortOrder}),
  reading: t.field({"required":false,"type":SortOrder}),
  postStatusId: t.field({"required":false,"type":SortOrder}),
  postedById: t.field({"required":false,"type":SortOrder}),
});
export const PostMinOrderByAggregateInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.PostMinOrderByAggregateInput>, false>('PostMinOrderByAggregateInput').implement({
  fields: PostMinOrderByAggregateInputFields,
});

export const PostSumOrderByAggregateInputFields = (t: any) => ({
  reading: t.field({"required":false,"type":SortOrder}),
});
export const PostSumOrderByAggregateInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.PostSumOrderByAggregateInput>, false>('PostSumOrderByAggregateInput').implement({
  fields: PostSumOrderByAggregateInputFields,
});

export const BytesWithAggregatesFilterFields = (t: any) => ({
  equals: t.field({"required":false,"type":Bytes}),
  in: t.field({"required":false,"type":[Bytes]}),
  notIn: t.field({"required":false,"type":[Bytes]}),
  not: t.field({"required":false,"type":NestedBytesWithAggregatesFilter}),
  _count: t.field({"required":false,"type":NestedIntFilter}),
  _min: t.field({"required":false,"type":NestedBytesFilter}),
  _max: t.field({"required":false,"type":NestedBytesFilter}),
});
export const BytesWithAggregatesFilter = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.BytesWithAggregatesFilter>, false>('BytesWithAggregatesFilter').implement({
  fields: BytesWithAggregatesFilterFields,
});

export const FloatNullableWithAggregatesFilterFields = (t: any) => ({
  equals: t.float({"required":false}),
  in: t.floatList({"required":false}),
  notIn: t.floatList({"required":false}),
  lt: t.float({"required":false}),
  lte: t.float({"required":false}),
  gt: t.float({"required":false}),
  gte: t.float({"required":false}),
  not: t.field({"required":false,"type":NestedFloatNullableWithAggregatesFilter}),
  _count: t.field({"required":false,"type":NestedIntNullableFilter}),
  _avg: t.field({"required":false,"type":NestedFloatNullableFilter}),
  _sum: t.field({"required":false,"type":NestedFloatNullableFilter}),
  _min: t.field({"required":false,"type":NestedFloatNullableFilter}),
  _max: t.field({"required":false,"type":NestedFloatNullableFilter}),
});
export const FloatNullableWithAggregatesFilter = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.FloatNullableWithAggregatesFilter>, false>('FloatNullableWithAggregatesFilter').implement({
  fields: FloatNullableWithAggregatesFilterFields,
});

export const PostStatusCountOrderByAggregateInputFields = (t: any) => ({
  id: t.field({"required":false,"type":SortOrder}),
  createdAt: t.field({"required":false,"type":SortOrder}),
  type: t.field({"required":false,"type":SortOrder}),
});
export const PostStatusCountOrderByAggregateInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.PostStatusCountOrderByAggregateInput>, false>('PostStatusCountOrderByAggregateInput').implement({
  fields: PostStatusCountOrderByAggregateInputFields,
});

export const PostStatusMaxOrderByAggregateInputFields = (t: any) => ({
  id: t.field({"required":false,"type":SortOrder}),
  createdAt: t.field({"required":false,"type":SortOrder}),
  type: t.field({"required":false,"type":SortOrder}),
});
export const PostStatusMaxOrderByAggregateInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.PostStatusMaxOrderByAggregateInput>, false>('PostStatusMaxOrderByAggregateInput').implement({
  fields: PostStatusMaxOrderByAggregateInputFields,
});

export const PostStatusMinOrderByAggregateInputFields = (t: any) => ({
  id: t.field({"required":false,"type":SortOrder}),
  createdAt: t.field({"required":false,"type":SortOrder}),
  type: t.field({"required":false,"type":SortOrder}),
});
export const PostStatusMinOrderByAggregateInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.PostStatusMinOrderByAggregateInput>, false>('PostStatusMinOrderByAggregateInput').implement({
  fields: PostStatusMinOrderByAggregateInputFields,
});

export const FloatFilterFields = (t: any) => ({
  equals: t.float({"required":false}),
  in: t.floatList({"required":false}),
  notIn: t.floatList({"required":false}),
  lt: t.float({"required":false}),
  lte: t.float({"required":false}),
  gt: t.float({"required":false}),
  gte: t.float({"required":false}),
  not: t.field({"required":false,"type":NestedFloatFilter}),
});
export const FloatFilter = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.FloatFilter>, false>('FloatFilter').implement({
  fields: FloatFilterFields,
});

export const ParticipationCountOrderByAggregateInputFields = (t: any) => ({
  id: t.field({"required":false,"type":SortOrder}),
  createdAt: t.field({"required":false,"type":SortOrder}),
  updatedAt: t.field({"required":false,"type":SortOrder}),
  totalIncentive: t.field({"required":false,"type":SortOrder}),
  userId: t.field({"required":false,"type":SortOrder}),
});
export const ParticipationCountOrderByAggregateInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.ParticipationCountOrderByAggregateInput>, false>('ParticipationCountOrderByAggregateInput').implement({
  fields: ParticipationCountOrderByAggregateInputFields,
});

export const ParticipationAvgOrderByAggregateInputFields = (t: any) => ({
  totalIncentive: t.field({"required":false,"type":SortOrder}),
});
export const ParticipationAvgOrderByAggregateInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.ParticipationAvgOrderByAggregateInput>, false>('ParticipationAvgOrderByAggregateInput').implement({
  fields: ParticipationAvgOrderByAggregateInputFields,
});

export const ParticipationMaxOrderByAggregateInputFields = (t: any) => ({
  id: t.field({"required":false,"type":SortOrder}),
  createdAt: t.field({"required":false,"type":SortOrder}),
  updatedAt: t.field({"required":false,"type":SortOrder}),
  totalIncentive: t.field({"required":false,"type":SortOrder}),
  userId: t.field({"required":false,"type":SortOrder}),
});
export const ParticipationMaxOrderByAggregateInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.ParticipationMaxOrderByAggregateInput>, false>('ParticipationMaxOrderByAggregateInput').implement({
  fields: ParticipationMaxOrderByAggregateInputFields,
});

export const ParticipationMinOrderByAggregateInputFields = (t: any) => ({
  id: t.field({"required":false,"type":SortOrder}),
  createdAt: t.field({"required":false,"type":SortOrder}),
  updatedAt: t.field({"required":false,"type":SortOrder}),
  totalIncentive: t.field({"required":false,"type":SortOrder}),
  userId: t.field({"required":false,"type":SortOrder}),
});
export const ParticipationMinOrderByAggregateInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.ParticipationMinOrderByAggregateInput>, false>('ParticipationMinOrderByAggregateInput').implement({
  fields: ParticipationMinOrderByAggregateInputFields,
});

export const ParticipationSumOrderByAggregateInputFields = (t: any) => ({
  totalIncentive: t.field({"required":false,"type":SortOrder}),
});
export const ParticipationSumOrderByAggregateInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.ParticipationSumOrderByAggregateInput>, false>('ParticipationSumOrderByAggregateInput').implement({
  fields: ParticipationSumOrderByAggregateInputFields,
});

export const FloatWithAggregatesFilterFields = (t: any) => ({
  equals: t.float({"required":false}),
  in: t.floatList({"required":false}),
  notIn: t.floatList({"required":false}),
  lt: t.float({"required":false}),
  lte: t.float({"required":false}),
  gt: t.float({"required":false}),
  gte: t.float({"required":false}),
  not: t.field({"required":false,"type":NestedFloatWithAggregatesFilter}),
  _count: t.field({"required":false,"type":NestedIntFilter}),
  _avg: t.field({"required":false,"type":NestedFloatFilter}),
  _sum: t.field({"required":false,"type":NestedFloatFilter}),
  _min: t.field({"required":false,"type":NestedFloatFilter}),
  _max: t.field({"required":false,"type":NestedFloatFilter}),
});
export const FloatWithAggregatesFilter = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.FloatWithAggregatesFilter>, false>('FloatWithAggregatesFilter').implement({
  fields: FloatWithAggregatesFilterFields,
});

export const IntFilterFields = (t: any) => ({
  equals: t.int({"required":false}),
  in: t.intList({"required":false}),
  notIn: t.intList({"required":false}),
  lt: t.int({"required":false}),
  lte: t.int({"required":false}),
  gt: t.int({"required":false}),
  gte: t.int({"required":false}),
  not: t.field({"required":false,"type":NestedIntFilter}),
});
export const IntFilter = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.IntFilter>, false>('IntFilter').implement({
  fields: IntFilterFields,
});

export const IncentiveTableCountOrderByAggregateInputFields = (t: any) => ({
  id: t.field({"required":false,"type":SortOrder}),
  index: t.field({"required":false,"type":SortOrder}),
  incentive: t.field({"required":false,"type":SortOrder}),
});
export const IncentiveTableCountOrderByAggregateInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.IncentiveTableCountOrderByAggregateInput>, false>('IncentiveTableCountOrderByAggregateInput').implement({
  fields: IncentiveTableCountOrderByAggregateInputFields,
});

export const IncentiveTableAvgOrderByAggregateInputFields = (t: any) => ({
  index: t.field({"required":false,"type":SortOrder}),
  incentive: t.field({"required":false,"type":SortOrder}),
});
export const IncentiveTableAvgOrderByAggregateInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.IncentiveTableAvgOrderByAggregateInput>, false>('IncentiveTableAvgOrderByAggregateInput').implement({
  fields: IncentiveTableAvgOrderByAggregateInputFields,
});

export const IncentiveTableMaxOrderByAggregateInputFields = (t: any) => ({
  id: t.field({"required":false,"type":SortOrder}),
  index: t.field({"required":false,"type":SortOrder}),
  incentive: t.field({"required":false,"type":SortOrder}),
});
export const IncentiveTableMaxOrderByAggregateInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.IncentiveTableMaxOrderByAggregateInput>, false>('IncentiveTableMaxOrderByAggregateInput').implement({
  fields: IncentiveTableMaxOrderByAggregateInputFields,
});

export const IncentiveTableMinOrderByAggregateInputFields = (t: any) => ({
  id: t.field({"required":false,"type":SortOrder}),
  index: t.field({"required":false,"type":SortOrder}),
  incentive: t.field({"required":false,"type":SortOrder}),
});
export const IncentiveTableMinOrderByAggregateInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.IncentiveTableMinOrderByAggregateInput>, false>('IncentiveTableMinOrderByAggregateInput').implement({
  fields: IncentiveTableMinOrderByAggregateInputFields,
});

export const IncentiveTableSumOrderByAggregateInputFields = (t: any) => ({
  index: t.field({"required":false,"type":SortOrder}),
  incentive: t.field({"required":false,"type":SortOrder}),
});
export const IncentiveTableSumOrderByAggregateInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.IncentiveTableSumOrderByAggregateInput>, false>('IncentiveTableSumOrderByAggregateInput').implement({
  fields: IncentiveTableSumOrderByAggregateInputFields,
});

export const IntWithAggregatesFilterFields = (t: any) => ({
  equals: t.int({"required":false}),
  in: t.intList({"required":false}),
  notIn: t.intList({"required":false}),
  lt: t.int({"required":false}),
  lte: t.int({"required":false}),
  gt: t.int({"required":false}),
  gte: t.int({"required":false}),
  not: t.field({"required":false,"type":NestedIntWithAggregatesFilter}),
  _count: t.field({"required":false,"type":NestedIntFilter}),
  _avg: t.field({"required":false,"type":NestedFloatFilter}),
  _sum: t.field({"required":false,"type":NestedIntFilter}),
  _min: t.field({"required":false,"type":NestedIntFilter}),
  _max: t.field({"required":false,"type":NestedIntFilter}),
});
export const IntWithAggregatesFilter = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.IntWithAggregatesFilter>, false>('IntWithAggregatesFilter').implement({
  fields: IntWithAggregatesFilterFields,
});

export const PostCreateNestedManyWithoutPostedByInputFields = (t: any) => ({
  create: t.field({"required":false,"type":[PostCreateWithoutPostedByInput]}),
  connectOrCreate: t.field({"required":false,"type":[PostCreateOrConnectWithoutPostedByInput]}),
  createMany: t.field({"required":false,"type":PostCreateManyPostedByInputEnvelope}),
  connect: t.field({"required":false,"type":[PostWhereUniqueInput]}),
});
export const PostCreateNestedManyWithoutPostedByInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.PostCreateNestedManyWithoutPostedByInput>, false>('PostCreateNestedManyWithoutPostedByInput').implement({
  fields: PostCreateNestedManyWithoutPostedByInputFields,
});

export const ParticipationCreateNestedOneWithoutUserInputFields = (t: any) => ({
  create: t.field({"required":false,"type":ParticipationCreateWithoutUserInput}),
  connectOrCreate: t.field({"required":false,"type":ParticipationCreateOrConnectWithoutUserInput}),
  connect: t.field({"required":false,"type":ParticipationWhereUniqueInput}),
});
export const ParticipationCreateNestedOneWithoutUserInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.ParticipationCreateNestedOneWithoutUserInput>, false>('ParticipationCreateNestedOneWithoutUserInput').implement({
  fields: ParticipationCreateNestedOneWithoutUserInputFields,
});

export const StringFieldUpdateOperationsInputFields = (t: any) => ({
  set: t.string({"required":false}),
});
export const StringFieldUpdateOperationsInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.StringFieldUpdateOperationsInput>, false>('StringFieldUpdateOperationsInput').implement({
  fields: StringFieldUpdateOperationsInputFields,
});

export const DateTimeFieldUpdateOperationsInputFields = (t: any) => ({
  set: t.field({"required":false,"type":DateTime}),
});
export const DateTimeFieldUpdateOperationsInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.DateTimeFieldUpdateOperationsInput>, false>('DateTimeFieldUpdateOperationsInput').implement({
  fields: DateTimeFieldUpdateOperationsInputFields,
});

export const NullableStringFieldUpdateOperationsInputFields = (t: any) => ({
  set: t.string({"required":false}),
});
export const NullableStringFieldUpdateOperationsInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.NullableStringFieldUpdateOperationsInput>, false>('NullableStringFieldUpdateOperationsInput').implement({
  fields: NullableStringFieldUpdateOperationsInputFields,
});

export const PostUpdateManyWithoutPostedByNestedInputFields = (t: any) => ({
  create: t.field({"required":false,"type":[PostCreateWithoutPostedByInput]}),
  connectOrCreate: t.field({"required":false,"type":[PostCreateOrConnectWithoutPostedByInput]}),
  upsert: t.field({"required":false,"type":[PostUpsertWithWhereUniqueWithoutPostedByInput]}),
  createMany: t.field({"required":false,"type":PostCreateManyPostedByInputEnvelope}),
  set: t.field({"required":false,"type":[PostWhereUniqueInput]}),
  disconnect: t.field({"required":false,"type":[PostWhereUniqueInput]}),
  delete: t.field({"required":false,"type":[PostWhereUniqueInput]}),
  connect: t.field({"required":false,"type":[PostWhereUniqueInput]}),
  update: t.field({"required":false,"type":[PostUpdateWithWhereUniqueWithoutPostedByInput]}),
  updateMany: t.field({"required":false,"type":[PostUpdateManyWithWhereWithoutPostedByInput]}),
  deleteMany: t.field({"required":false,"type":[PostScalarWhereInput]}),
});
export const PostUpdateManyWithoutPostedByNestedInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.PostUpdateManyWithoutPostedByNestedInput>, false>('PostUpdateManyWithoutPostedByNestedInput').implement({
  fields: PostUpdateManyWithoutPostedByNestedInputFields,
});

export const ParticipationUpdateOneWithoutUserNestedInputFields = (t: any) => ({
  create: t.field({"required":false,"type":ParticipationCreateWithoutUserInput}),
  connectOrCreate: t.field({"required":false,"type":ParticipationCreateOrConnectWithoutUserInput}),
  upsert: t.field({"required":false,"type":ParticipationUpsertWithoutUserInput}),
  disconnect: t.field({"required":false,"type":ParticipationWhereInput}),
  delete: t.field({"required":false,"type":ParticipationWhereInput}),
  connect: t.field({"required":false,"type":ParticipationWhereUniqueInput}),
  update: t.field({"required":false,"type":ParticipationUpdateToOneWithWhereWithoutUserInput}),
});
export const ParticipationUpdateOneWithoutUserNestedInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.ParticipationUpdateOneWithoutUserNestedInput>, false>('ParticipationUpdateOneWithoutUserNestedInput').implement({
  fields: ParticipationUpdateOneWithoutUserNestedInputFields,
});

export const PostStatusCreateNestedOneWithoutPostInputFields = (t: any) => ({
  create: t.field({"required":false,"type":PostStatusCreateWithoutPostInput}),
  connectOrCreate: t.field({"required":false,"type":PostStatusCreateOrConnectWithoutPostInput}),
  connect: t.field({"required":false,"type":PostStatusWhereUniqueInput}),
});
export const PostStatusCreateNestedOneWithoutPostInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.PostStatusCreateNestedOneWithoutPostInput>, false>('PostStatusCreateNestedOneWithoutPostInput').implement({
  fields: PostStatusCreateNestedOneWithoutPostInputFields,
});

export const UserCreateNestedOneWithoutPostsInputFields = (t: any) => ({
  create: t.field({"required":false,"type":UserCreateWithoutPostsInput}),
  connectOrCreate: t.field({"required":false,"type":UserCreateOrConnectWithoutPostsInput}),
  connect: t.field({"required":false,"type":UserWhereUniqueInput}),
});
export const UserCreateNestedOneWithoutPostsInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.UserCreateNestedOneWithoutPostsInput>, false>('UserCreateNestedOneWithoutPostsInput').implement({
  fields: UserCreateNestedOneWithoutPostsInputFields,
});

export const BytesFieldUpdateOperationsInputFields = (t: any) => ({
  set: t.field({"required":false,"type":Bytes}),
});
export const BytesFieldUpdateOperationsInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.BytesFieldUpdateOperationsInput>, false>('BytesFieldUpdateOperationsInput').implement({
  fields: BytesFieldUpdateOperationsInputFields,
});

export const NullableFloatFieldUpdateOperationsInputFields = (t: any) => ({
  set: t.float({"required":false}),
  increment: t.float({"required":false}),
  decrement: t.float({"required":false}),
  multiply: t.float({"required":false}),
  divide: t.float({"required":false}),
});
export const NullableFloatFieldUpdateOperationsInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.NullableFloatFieldUpdateOperationsInput>, false>('NullableFloatFieldUpdateOperationsInput').implement({
  fields: NullableFloatFieldUpdateOperationsInputFields,
});

export const PostStatusUpdateOneRequiredWithoutPostNestedInputFields = (t: any) => ({
  create: t.field({"required":false,"type":PostStatusCreateWithoutPostInput}),
  connectOrCreate: t.field({"required":false,"type":PostStatusCreateOrConnectWithoutPostInput}),
  upsert: t.field({"required":false,"type":PostStatusUpsertWithoutPostInput}),
  connect: t.field({"required":false,"type":PostStatusWhereUniqueInput}),
  update: t.field({"required":false,"type":PostStatusUpdateToOneWithWhereWithoutPostInput}),
});
export const PostStatusUpdateOneRequiredWithoutPostNestedInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.PostStatusUpdateOneRequiredWithoutPostNestedInput>, false>('PostStatusUpdateOneRequiredWithoutPostNestedInput').implement({
  fields: PostStatusUpdateOneRequiredWithoutPostNestedInputFields,
});

export const UserUpdateOneRequiredWithoutPostsNestedInputFields = (t: any) => ({
  create: t.field({"required":false,"type":UserCreateWithoutPostsInput}),
  connectOrCreate: t.field({"required":false,"type":UserCreateOrConnectWithoutPostsInput}),
  upsert: t.field({"required":false,"type":UserUpsertWithoutPostsInput}),
  connect: t.field({"required":false,"type":UserWhereUniqueInput}),
  update: t.field({"required":false,"type":UserUpdateToOneWithWhereWithoutPostsInput}),
});
export const UserUpdateOneRequiredWithoutPostsNestedInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.UserUpdateOneRequiredWithoutPostsNestedInput>, false>('UserUpdateOneRequiredWithoutPostsNestedInput').implement({
  fields: UserUpdateOneRequiredWithoutPostsNestedInputFields,
});

export const PostCreateNestedManyWithoutPostStatusInputFields = (t: any) => ({
  create: t.field({"required":false,"type":[PostCreateWithoutPostStatusInput]}),
  connectOrCreate: t.field({"required":false,"type":[PostCreateOrConnectWithoutPostStatusInput]}),
  createMany: t.field({"required":false,"type":PostCreateManyPostStatusInputEnvelope}),
  connect: t.field({"required":false,"type":[PostWhereUniqueInput]}),
});
export const PostCreateNestedManyWithoutPostStatusInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.PostCreateNestedManyWithoutPostStatusInput>, false>('PostCreateNestedManyWithoutPostStatusInput').implement({
  fields: PostCreateNestedManyWithoutPostStatusInputFields,
});

export const PostUpdateManyWithoutPostStatusNestedInputFields = (t: any) => ({
  create: t.field({"required":false,"type":[PostCreateWithoutPostStatusInput]}),
  connectOrCreate: t.field({"required":false,"type":[PostCreateOrConnectWithoutPostStatusInput]}),
  upsert: t.field({"required":false,"type":[PostUpsertWithWhereUniqueWithoutPostStatusInput]}),
  createMany: t.field({"required":false,"type":PostCreateManyPostStatusInputEnvelope}),
  set: t.field({"required":false,"type":[PostWhereUniqueInput]}),
  disconnect: t.field({"required":false,"type":[PostWhereUniqueInput]}),
  delete: t.field({"required":false,"type":[PostWhereUniqueInput]}),
  connect: t.field({"required":false,"type":[PostWhereUniqueInput]}),
  update: t.field({"required":false,"type":[PostUpdateWithWhereUniqueWithoutPostStatusInput]}),
  updateMany: t.field({"required":false,"type":[PostUpdateManyWithWhereWithoutPostStatusInput]}),
  deleteMany: t.field({"required":false,"type":[PostScalarWhereInput]}),
});
export const PostUpdateManyWithoutPostStatusNestedInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.PostUpdateManyWithoutPostStatusNestedInput>, false>('PostUpdateManyWithoutPostStatusNestedInput').implement({
  fields: PostUpdateManyWithoutPostStatusNestedInputFields,
});

export const UserCreateNestedOneWithoutParticipationInputFields = (t: any) => ({
  create: t.field({"required":false,"type":UserCreateWithoutParticipationInput}),
  connectOrCreate: t.field({"required":false,"type":UserCreateOrConnectWithoutParticipationInput}),
  connect: t.field({"required":false,"type":UserWhereUniqueInput}),
});
export const UserCreateNestedOneWithoutParticipationInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.UserCreateNestedOneWithoutParticipationInput>, false>('UserCreateNestedOneWithoutParticipationInput').implement({
  fields: UserCreateNestedOneWithoutParticipationInputFields,
});

export const FloatFieldUpdateOperationsInputFields = (t: any) => ({
  set: t.float({"required":false}),
  increment: t.float({"required":false}),
  decrement: t.float({"required":false}),
  multiply: t.float({"required":false}),
  divide: t.float({"required":false}),
});
export const FloatFieldUpdateOperationsInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.FloatFieldUpdateOperationsInput>, false>('FloatFieldUpdateOperationsInput').implement({
  fields: FloatFieldUpdateOperationsInputFields,
});

export const UserUpdateOneRequiredWithoutParticipationNestedInputFields = (t: any) => ({
  create: t.field({"required":false,"type":UserCreateWithoutParticipationInput}),
  connectOrCreate: t.field({"required":false,"type":UserCreateOrConnectWithoutParticipationInput}),
  upsert: t.field({"required":false,"type":UserUpsertWithoutParticipationInput}),
  connect: t.field({"required":false,"type":UserWhereUniqueInput}),
  update: t.field({"required":false,"type":UserUpdateToOneWithWhereWithoutParticipationInput}),
});
export const UserUpdateOneRequiredWithoutParticipationNestedInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.UserUpdateOneRequiredWithoutParticipationNestedInput>, false>('UserUpdateOneRequiredWithoutParticipationNestedInput').implement({
  fields: UserUpdateOneRequiredWithoutParticipationNestedInputFields,
});

export const IntFieldUpdateOperationsInputFields = (t: any) => ({
  set: t.int({"required":false}),
  increment: t.int({"required":false}),
  decrement: t.int({"required":false}),
  multiply: t.int({"required":false}),
  divide: t.int({"required":false}),
});
export const IntFieldUpdateOperationsInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.IntFieldUpdateOperationsInput>, false>('IntFieldUpdateOperationsInput').implement({
  fields: IntFieldUpdateOperationsInputFields,
});

export const NestedStringFilterFields = (t: any) => ({
  equals: t.string({"required":false}),
  in: t.stringList({"required":false}),
  notIn: t.stringList({"required":false}),
  lt: t.string({"required":false}),
  lte: t.string({"required":false}),
  gt: t.string({"required":false}),
  gte: t.string({"required":false}),
  contains: t.string({"required":false}),
  startsWith: t.string({"required":false}),
  endsWith: t.string({"required":false}),
  not: t.field({"required":false,"type":NestedStringFilter}),
});
export const NestedStringFilter = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.NestedStringFilter>, false>('NestedStringFilter').implement({
  fields: NestedStringFilterFields,
});

export const NestedDateTimeFilterFields = (t: any) => ({
  equals: t.field({"required":false,"type":DateTime}),
  in: t.field({"required":false,"type":[DateTime]}),
  notIn: t.field({"required":false,"type":[DateTime]}),
  lt: t.field({"required":false,"type":DateTime}),
  lte: t.field({"required":false,"type":DateTime}),
  gt: t.field({"required":false,"type":DateTime}),
  gte: t.field({"required":false,"type":DateTime}),
  not: t.field({"required":false,"type":NestedDateTimeFilter}),
});
export const NestedDateTimeFilter = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.NestedDateTimeFilter>, false>('NestedDateTimeFilter').implement({
  fields: NestedDateTimeFilterFields,
});

export const NestedStringNullableFilterFields = (t: any) => ({
  equals: t.string({"required":false}),
  in: t.stringList({"required":false}),
  notIn: t.stringList({"required":false}),
  lt: t.string({"required":false}),
  lte: t.string({"required":false}),
  gt: t.string({"required":false}),
  gte: t.string({"required":false}),
  contains: t.string({"required":false}),
  startsWith: t.string({"required":false}),
  endsWith: t.string({"required":false}),
  not: t.field({"required":false,"type":NestedStringNullableFilter}),
});
export const NestedStringNullableFilter = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.NestedStringNullableFilter>, false>('NestedStringNullableFilter').implement({
  fields: NestedStringNullableFilterFields,
});

export const NestedStringWithAggregatesFilterFields = (t: any) => ({
  equals: t.string({"required":false}),
  in: t.stringList({"required":false}),
  notIn: t.stringList({"required":false}),
  lt: t.string({"required":false}),
  lte: t.string({"required":false}),
  gt: t.string({"required":false}),
  gte: t.string({"required":false}),
  contains: t.string({"required":false}),
  startsWith: t.string({"required":false}),
  endsWith: t.string({"required":false}),
  not: t.field({"required":false,"type":NestedStringWithAggregatesFilter}),
  _count: t.field({"required":false,"type":NestedIntFilter}),
  _min: t.field({"required":false,"type":NestedStringFilter}),
  _max: t.field({"required":false,"type":NestedStringFilter}),
});
export const NestedStringWithAggregatesFilter = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.NestedStringWithAggregatesFilter>, false>('NestedStringWithAggregatesFilter').implement({
  fields: NestedStringWithAggregatesFilterFields,
});

export const NestedIntFilterFields = (t: any) => ({
  equals: t.int({"required":false}),
  in: t.intList({"required":false}),
  notIn: t.intList({"required":false}),
  lt: t.int({"required":false}),
  lte: t.int({"required":false}),
  gt: t.int({"required":false}),
  gte: t.int({"required":false}),
  not: t.field({"required":false,"type":NestedIntFilter}),
});
export const NestedIntFilter = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.NestedIntFilter>, false>('NestedIntFilter').implement({
  fields: NestedIntFilterFields,
});

export const NestedDateTimeWithAggregatesFilterFields = (t: any) => ({
  equals: t.field({"required":false,"type":DateTime}),
  in: t.field({"required":false,"type":[DateTime]}),
  notIn: t.field({"required":false,"type":[DateTime]}),
  lt: t.field({"required":false,"type":DateTime}),
  lte: t.field({"required":false,"type":DateTime}),
  gt: t.field({"required":false,"type":DateTime}),
  gte: t.field({"required":false,"type":DateTime}),
  not: t.field({"required":false,"type":NestedDateTimeWithAggregatesFilter}),
  _count: t.field({"required":false,"type":NestedIntFilter}),
  _min: t.field({"required":false,"type":NestedDateTimeFilter}),
  _max: t.field({"required":false,"type":NestedDateTimeFilter}),
});
export const NestedDateTimeWithAggregatesFilter = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.NestedDateTimeWithAggregatesFilter>, false>('NestedDateTimeWithAggregatesFilter').implement({
  fields: NestedDateTimeWithAggregatesFilterFields,
});

export const NestedStringNullableWithAggregatesFilterFields = (t: any) => ({
  equals: t.string({"required":false}),
  in: t.stringList({"required":false}),
  notIn: t.stringList({"required":false}),
  lt: t.string({"required":false}),
  lte: t.string({"required":false}),
  gt: t.string({"required":false}),
  gte: t.string({"required":false}),
  contains: t.string({"required":false}),
  startsWith: t.string({"required":false}),
  endsWith: t.string({"required":false}),
  not: t.field({"required":false,"type":NestedStringNullableWithAggregatesFilter}),
  _count: t.field({"required":false,"type":NestedIntNullableFilter}),
  _min: t.field({"required":false,"type":NestedStringNullableFilter}),
  _max: t.field({"required":false,"type":NestedStringNullableFilter}),
});
export const NestedStringNullableWithAggregatesFilter = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.NestedStringNullableWithAggregatesFilter>, false>('NestedStringNullableWithAggregatesFilter').implement({
  fields: NestedStringNullableWithAggregatesFilterFields,
});

export const NestedIntNullableFilterFields = (t: any) => ({
  equals: t.int({"required":false}),
  in: t.intList({"required":false}),
  notIn: t.intList({"required":false}),
  lt: t.int({"required":false}),
  lte: t.int({"required":false}),
  gt: t.int({"required":false}),
  gte: t.int({"required":false}),
  not: t.field({"required":false,"type":NestedIntNullableFilter}),
});
export const NestedIntNullableFilter = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.NestedIntNullableFilter>, false>('NestedIntNullableFilter').implement({
  fields: NestedIntNullableFilterFields,
});

export const NestedBytesFilterFields = (t: any) => ({
  equals: t.field({"required":false,"type":Bytes}),
  in: t.field({"required":false,"type":[Bytes]}),
  notIn: t.field({"required":false,"type":[Bytes]}),
  not: t.field({"required":false,"type":NestedBytesFilter}),
});
export const NestedBytesFilter = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.NestedBytesFilter>, false>('NestedBytesFilter').implement({
  fields: NestedBytesFilterFields,
});

export const NestedFloatNullableFilterFields = (t: any) => ({
  equals: t.float({"required":false}),
  in: t.floatList({"required":false}),
  notIn: t.floatList({"required":false}),
  lt: t.float({"required":false}),
  lte: t.float({"required":false}),
  gt: t.float({"required":false}),
  gte: t.float({"required":false}),
  not: t.field({"required":false,"type":NestedFloatNullableFilter}),
});
export const NestedFloatNullableFilter = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.NestedFloatNullableFilter>, false>('NestedFloatNullableFilter').implement({
  fields: NestedFloatNullableFilterFields,
});

export const NestedBytesWithAggregatesFilterFields = (t: any) => ({
  equals: t.field({"required":false,"type":Bytes}),
  in: t.field({"required":false,"type":[Bytes]}),
  notIn: t.field({"required":false,"type":[Bytes]}),
  not: t.field({"required":false,"type":NestedBytesWithAggregatesFilter}),
  _count: t.field({"required":false,"type":NestedIntFilter}),
  _min: t.field({"required":false,"type":NestedBytesFilter}),
  _max: t.field({"required":false,"type":NestedBytesFilter}),
});
export const NestedBytesWithAggregatesFilter = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.NestedBytesWithAggregatesFilter>, false>('NestedBytesWithAggregatesFilter').implement({
  fields: NestedBytesWithAggregatesFilterFields,
});

export const NestedFloatNullableWithAggregatesFilterFields = (t: any) => ({
  equals: t.float({"required":false}),
  in: t.floatList({"required":false}),
  notIn: t.floatList({"required":false}),
  lt: t.float({"required":false}),
  lte: t.float({"required":false}),
  gt: t.float({"required":false}),
  gte: t.float({"required":false}),
  not: t.field({"required":false,"type":NestedFloatNullableWithAggregatesFilter}),
  _count: t.field({"required":false,"type":NestedIntNullableFilter}),
  _avg: t.field({"required":false,"type":NestedFloatNullableFilter}),
  _sum: t.field({"required":false,"type":NestedFloatNullableFilter}),
  _min: t.field({"required":false,"type":NestedFloatNullableFilter}),
  _max: t.field({"required":false,"type":NestedFloatNullableFilter}),
});
export const NestedFloatNullableWithAggregatesFilter = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.NestedFloatNullableWithAggregatesFilter>, false>('NestedFloatNullableWithAggregatesFilter').implement({
  fields: NestedFloatNullableWithAggregatesFilterFields,
});

export const NestedFloatFilterFields = (t: any) => ({
  equals: t.float({"required":false}),
  in: t.floatList({"required":false}),
  notIn: t.floatList({"required":false}),
  lt: t.float({"required":false}),
  lte: t.float({"required":false}),
  gt: t.float({"required":false}),
  gte: t.float({"required":false}),
  not: t.field({"required":false,"type":NestedFloatFilter}),
});
export const NestedFloatFilter = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.NestedFloatFilter>, false>('NestedFloatFilter').implement({
  fields: NestedFloatFilterFields,
});

export const NestedFloatWithAggregatesFilterFields = (t: any) => ({
  equals: t.float({"required":false}),
  in: t.floatList({"required":false}),
  notIn: t.floatList({"required":false}),
  lt: t.float({"required":false}),
  lte: t.float({"required":false}),
  gt: t.float({"required":false}),
  gte: t.float({"required":false}),
  not: t.field({"required":false,"type":NestedFloatWithAggregatesFilter}),
  _count: t.field({"required":false,"type":NestedIntFilter}),
  _avg: t.field({"required":false,"type":NestedFloatFilter}),
  _sum: t.field({"required":false,"type":NestedFloatFilter}),
  _min: t.field({"required":false,"type":NestedFloatFilter}),
  _max: t.field({"required":false,"type":NestedFloatFilter}),
});
export const NestedFloatWithAggregatesFilter = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.NestedFloatWithAggregatesFilter>, false>('NestedFloatWithAggregatesFilter').implement({
  fields: NestedFloatWithAggregatesFilterFields,
});

export const NestedIntWithAggregatesFilterFields = (t: any) => ({
  equals: t.int({"required":false}),
  in: t.intList({"required":false}),
  notIn: t.intList({"required":false}),
  lt: t.int({"required":false}),
  lte: t.int({"required":false}),
  gt: t.int({"required":false}),
  gte: t.int({"required":false}),
  not: t.field({"required":false,"type":NestedIntWithAggregatesFilter}),
  _count: t.field({"required":false,"type":NestedIntFilter}),
  _avg: t.field({"required":false,"type":NestedFloatFilter}),
  _sum: t.field({"required":false,"type":NestedIntFilter}),
  _min: t.field({"required":false,"type":NestedIntFilter}),
  _max: t.field({"required":false,"type":NestedIntFilter}),
});
export const NestedIntWithAggregatesFilter = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.NestedIntWithAggregatesFilter>, false>('NestedIntWithAggregatesFilter').implement({
  fields: NestedIntWithAggregatesFilterFields,
});

export const PostCreateWithoutPostedByInputFields = (t: any) => ({
  id: t.string({"required":false}),
  createdAt: t.field({"required":false,"type":DateTime}),
  image: t.field({"required":true,"type":Bytes}),
  reading: t.float({"required":false}),
  postStatus: t.field({"required":true,"type":PostStatusCreateNestedOneWithoutPostInput}),
});
export const PostCreateWithoutPostedByInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.PostCreateWithoutPostedByInput>, false>('PostCreateWithoutPostedByInput').implement({
  fields: PostCreateWithoutPostedByInputFields,
});

export const PostCreateOrConnectWithoutPostedByInputFields = (t: any) => ({
  where: t.field({"required":true,"type":PostWhereUniqueInput}),
  create: t.field({"required":true,"type":PostCreateWithoutPostedByInput}),
});
export const PostCreateOrConnectWithoutPostedByInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.PostCreateOrConnectWithoutPostedByInput>, false>('PostCreateOrConnectWithoutPostedByInput').implement({
  fields: PostCreateOrConnectWithoutPostedByInputFields,
});

export const PostCreateManyPostedByInputEnvelopeFields = (t: any) => ({
  data: t.field({"required":true,"type":[PostCreateManyPostedByInput]}),
});
export const PostCreateManyPostedByInputEnvelope = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.PostCreateManyPostedByInputEnvelope>, false>('PostCreateManyPostedByInputEnvelope').implement({
  fields: PostCreateManyPostedByInputEnvelopeFields,
});

export const ParticipationCreateWithoutUserInputFields = (t: any) => ({
  id: t.string({"required":false}),
  createdAt: t.field({"required":false,"type":DateTime}),
  updatedAt: t.field({"required":false,"type":DateTime}),
  totalIncentive: t.float({"required":true}),
});
export const ParticipationCreateWithoutUserInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.ParticipationCreateWithoutUserInput>, false>('ParticipationCreateWithoutUserInput').implement({
  fields: ParticipationCreateWithoutUserInputFields,
});

export const ParticipationCreateOrConnectWithoutUserInputFields = (t: any) => ({
  where: t.field({"required":true,"type":ParticipationWhereUniqueInput}),
  create: t.field({"required":true,"type":ParticipationCreateWithoutUserInput}),
});
export const ParticipationCreateOrConnectWithoutUserInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.ParticipationCreateOrConnectWithoutUserInput>, false>('ParticipationCreateOrConnectWithoutUserInput').implement({
  fields: ParticipationCreateOrConnectWithoutUserInputFields,
});

export const PostUpsertWithWhereUniqueWithoutPostedByInputFields = (t: any) => ({
  where: t.field({"required":true,"type":PostWhereUniqueInput}),
  update: t.field({"required":true,"type":PostUpdateWithoutPostedByInput}),
  create: t.field({"required":true,"type":PostCreateWithoutPostedByInput}),
});
export const PostUpsertWithWhereUniqueWithoutPostedByInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.PostUpsertWithWhereUniqueWithoutPostedByInput>, false>('PostUpsertWithWhereUniqueWithoutPostedByInput').implement({
  fields: PostUpsertWithWhereUniqueWithoutPostedByInputFields,
});

export const PostUpdateWithWhereUniqueWithoutPostedByInputFields = (t: any) => ({
  where: t.field({"required":true,"type":PostWhereUniqueInput}),
  data: t.field({"required":true,"type":PostUpdateWithoutPostedByInput}),
});
export const PostUpdateWithWhereUniqueWithoutPostedByInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.PostUpdateWithWhereUniqueWithoutPostedByInput>, false>('PostUpdateWithWhereUniqueWithoutPostedByInput').implement({
  fields: PostUpdateWithWhereUniqueWithoutPostedByInputFields,
});

export const PostUpdateManyWithWhereWithoutPostedByInputFields = (t: any) => ({
  where: t.field({"required":true,"type":PostScalarWhereInput}),
  data: t.field({"required":true,"type":PostUpdateManyMutationInput}),
});
export const PostUpdateManyWithWhereWithoutPostedByInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.PostUpdateManyWithWhereWithoutPostedByInput>, false>('PostUpdateManyWithWhereWithoutPostedByInput').implement({
  fields: PostUpdateManyWithWhereWithoutPostedByInputFields,
});

export const PostScalarWhereInputFields = (t: any) => ({
  AND: t.field({"required":false,"type":[PostScalarWhereInput]}),
  OR: t.field({"required":false,"type":[PostScalarWhereInput]}),
  NOT: t.field({"required":false,"type":[PostScalarWhereInput]}),
  id: t.field({"required":false,"type":StringFilter}),
  createdAt: t.field({"required":false,"type":DateTimeFilter}),
  image: t.field({"required":false,"type":BytesFilter}),
  reading: t.field({"required":false,"type":FloatNullableFilter}),
  postStatusId: t.field({"required":false,"type":StringFilter}),
  postedById: t.field({"required":false,"type":StringFilter}),
});
export const PostScalarWhereInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.PostScalarWhereInput>, false>('PostScalarWhereInput').implement({
  fields: PostScalarWhereInputFields,
});

export const ParticipationUpsertWithoutUserInputFields = (t: any) => ({
  update: t.field({"required":true,"type":ParticipationUpdateWithoutUserInput}),
  create: t.field({"required":true,"type":ParticipationCreateWithoutUserInput}),
  where: t.field({"required":false,"type":ParticipationWhereInput}),
});
export const ParticipationUpsertWithoutUserInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.ParticipationUpsertWithoutUserInput>, false>('ParticipationUpsertWithoutUserInput').implement({
  fields: ParticipationUpsertWithoutUserInputFields,
});

export const ParticipationUpdateToOneWithWhereWithoutUserInputFields = (t: any) => ({
  where: t.field({"required":false,"type":ParticipationWhereInput}),
  data: t.field({"required":true,"type":ParticipationUpdateWithoutUserInput}),
});
export const ParticipationUpdateToOneWithWhereWithoutUserInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.ParticipationUpdateToOneWithWhereWithoutUserInput>, false>('ParticipationUpdateToOneWithWhereWithoutUserInput').implement({
  fields: ParticipationUpdateToOneWithWhereWithoutUserInputFields,
});

export const ParticipationUpdateWithoutUserInputFields = (t: any) => ({
  id: t.field({"required":false,"type":StringFieldUpdateOperationsInput}),
  createdAt: t.field({"required":false,"type":DateTimeFieldUpdateOperationsInput}),
  updatedAt: t.field({"required":false,"type":DateTimeFieldUpdateOperationsInput}),
  totalIncentive: t.field({"required":false,"type":FloatFieldUpdateOperationsInput}),
});
export const ParticipationUpdateWithoutUserInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.ParticipationUpdateWithoutUserInput>, false>('ParticipationUpdateWithoutUserInput').implement({
  fields: ParticipationUpdateWithoutUserInputFields,
});

export const PostStatusCreateWithoutPostInputFields = (t: any) => ({
  id: t.string({"required":false}),
  createdAt: t.field({"required":false,"type":DateTime}),
  type: t.string({"required":true}),
});
export const PostStatusCreateWithoutPostInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.PostStatusCreateWithoutPostInput>, false>('PostStatusCreateWithoutPostInput').implement({
  fields: PostStatusCreateWithoutPostInputFields,
});

export const PostStatusCreateOrConnectWithoutPostInputFields = (t: any) => ({
  where: t.field({"required":true,"type":PostStatusWhereUniqueInput}),
  create: t.field({"required":true,"type":PostStatusCreateWithoutPostInput}),
});
export const PostStatusCreateOrConnectWithoutPostInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.PostStatusCreateOrConnectWithoutPostInput>, false>('PostStatusCreateOrConnectWithoutPostInput').implement({
  fields: PostStatusCreateOrConnectWithoutPostInputFields,
});

export const UserCreateWithoutPostsInputFields = (t: any) => ({
  id: t.string({"required":false}),
  createdAt: t.field({"required":false,"type":DateTime}),
  updatedAt: t.field({"required":false,"type":DateTime}),
  name: t.string({"required":false}),
  phoneNumber: t.string({"required":false}),
  accessCode: t.string({"required":true}),
  participation: t.field({"required":false,"type":ParticipationCreateNestedOneWithoutUserInput}),
});
export const UserCreateWithoutPostsInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.UserCreateWithoutPostsInput>, false>('UserCreateWithoutPostsInput').implement({
  fields: UserCreateWithoutPostsInputFields,
});

export const UserCreateOrConnectWithoutPostsInputFields = (t: any) => ({
  where: t.field({"required":true,"type":UserWhereUniqueInput}),
  create: t.field({"required":true,"type":UserCreateWithoutPostsInput}),
});
export const UserCreateOrConnectWithoutPostsInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.UserCreateOrConnectWithoutPostsInput>, false>('UserCreateOrConnectWithoutPostsInput').implement({
  fields: UserCreateOrConnectWithoutPostsInputFields,
});

export const PostStatusUpsertWithoutPostInputFields = (t: any) => ({
  update: t.field({"required":true,"type":PostStatusUpdateWithoutPostInput}),
  create: t.field({"required":true,"type":PostStatusCreateWithoutPostInput}),
  where: t.field({"required":false,"type":PostStatusWhereInput}),
});
export const PostStatusUpsertWithoutPostInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.PostStatusUpsertWithoutPostInput>, false>('PostStatusUpsertWithoutPostInput').implement({
  fields: PostStatusUpsertWithoutPostInputFields,
});

export const PostStatusUpdateToOneWithWhereWithoutPostInputFields = (t: any) => ({
  where: t.field({"required":false,"type":PostStatusWhereInput}),
  data: t.field({"required":true,"type":PostStatusUpdateWithoutPostInput}),
});
export const PostStatusUpdateToOneWithWhereWithoutPostInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.PostStatusUpdateToOneWithWhereWithoutPostInput>, false>('PostStatusUpdateToOneWithWhereWithoutPostInput').implement({
  fields: PostStatusUpdateToOneWithWhereWithoutPostInputFields,
});

export const PostStatusUpdateWithoutPostInputFields = (t: any) => ({
  id: t.field({"required":false,"type":StringFieldUpdateOperationsInput}),
  createdAt: t.field({"required":false,"type":DateTimeFieldUpdateOperationsInput}),
  type: t.field({"required":false,"type":StringFieldUpdateOperationsInput}),
});
export const PostStatusUpdateWithoutPostInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.PostStatusUpdateWithoutPostInput>, false>('PostStatusUpdateWithoutPostInput').implement({
  fields: PostStatusUpdateWithoutPostInputFields,
});

export const UserUpsertWithoutPostsInputFields = (t: any) => ({
  update: t.field({"required":true,"type":UserUpdateWithoutPostsInput}),
  create: t.field({"required":true,"type":UserCreateWithoutPostsInput}),
  where: t.field({"required":false,"type":UserWhereInput}),
});
export const UserUpsertWithoutPostsInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.UserUpsertWithoutPostsInput>, false>('UserUpsertWithoutPostsInput').implement({
  fields: UserUpsertWithoutPostsInputFields,
});

export const UserUpdateToOneWithWhereWithoutPostsInputFields = (t: any) => ({
  where: t.field({"required":false,"type":UserWhereInput}),
  data: t.field({"required":true,"type":UserUpdateWithoutPostsInput}),
});
export const UserUpdateToOneWithWhereWithoutPostsInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.UserUpdateToOneWithWhereWithoutPostsInput>, false>('UserUpdateToOneWithWhereWithoutPostsInput').implement({
  fields: UserUpdateToOneWithWhereWithoutPostsInputFields,
});

export const UserUpdateWithoutPostsInputFields = (t: any) => ({
  id: t.field({"required":false,"type":StringFieldUpdateOperationsInput}),
  createdAt: t.field({"required":false,"type":DateTimeFieldUpdateOperationsInput}),
  updatedAt: t.field({"required":false,"type":DateTimeFieldUpdateOperationsInput}),
  name: t.field({"required":false,"type":NullableStringFieldUpdateOperationsInput}),
  phoneNumber: t.field({"required":false,"type":NullableStringFieldUpdateOperationsInput}),
  accessCode: t.field({"required":false,"type":StringFieldUpdateOperationsInput}),
  participation: t.field({"required":false,"type":ParticipationUpdateOneWithoutUserNestedInput}),
});
export const UserUpdateWithoutPostsInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.UserUpdateWithoutPostsInput>, false>('UserUpdateWithoutPostsInput').implement({
  fields: UserUpdateWithoutPostsInputFields,
});

export const PostCreateWithoutPostStatusInputFields = (t: any) => ({
  id: t.string({"required":false}),
  createdAt: t.field({"required":false,"type":DateTime}),
  image: t.field({"required":true,"type":Bytes}),
  reading: t.float({"required":false}),
  postedBy: t.field({"required":true,"type":UserCreateNestedOneWithoutPostsInput}),
});
export const PostCreateWithoutPostStatusInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.PostCreateWithoutPostStatusInput>, false>('PostCreateWithoutPostStatusInput').implement({
  fields: PostCreateWithoutPostStatusInputFields,
});

export const PostCreateOrConnectWithoutPostStatusInputFields = (t: any) => ({
  where: t.field({"required":true,"type":PostWhereUniqueInput}),
  create: t.field({"required":true,"type":PostCreateWithoutPostStatusInput}),
});
export const PostCreateOrConnectWithoutPostStatusInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.PostCreateOrConnectWithoutPostStatusInput>, false>('PostCreateOrConnectWithoutPostStatusInput').implement({
  fields: PostCreateOrConnectWithoutPostStatusInputFields,
});

export const PostCreateManyPostStatusInputEnvelopeFields = (t: any) => ({
  data: t.field({"required":true,"type":[PostCreateManyPostStatusInput]}),
});
export const PostCreateManyPostStatusInputEnvelope = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.PostCreateManyPostStatusInputEnvelope>, false>('PostCreateManyPostStatusInputEnvelope').implement({
  fields: PostCreateManyPostStatusInputEnvelopeFields,
});

export const PostUpsertWithWhereUniqueWithoutPostStatusInputFields = (t: any) => ({
  where: t.field({"required":true,"type":PostWhereUniqueInput}),
  update: t.field({"required":true,"type":PostUpdateWithoutPostStatusInput}),
  create: t.field({"required":true,"type":PostCreateWithoutPostStatusInput}),
});
export const PostUpsertWithWhereUniqueWithoutPostStatusInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.PostUpsertWithWhereUniqueWithoutPostStatusInput>, false>('PostUpsertWithWhereUniqueWithoutPostStatusInput').implement({
  fields: PostUpsertWithWhereUniqueWithoutPostStatusInputFields,
});

export const PostUpdateWithWhereUniqueWithoutPostStatusInputFields = (t: any) => ({
  where: t.field({"required":true,"type":PostWhereUniqueInput}),
  data: t.field({"required":true,"type":PostUpdateWithoutPostStatusInput}),
});
export const PostUpdateWithWhereUniqueWithoutPostStatusInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.PostUpdateWithWhereUniqueWithoutPostStatusInput>, false>('PostUpdateWithWhereUniqueWithoutPostStatusInput').implement({
  fields: PostUpdateWithWhereUniqueWithoutPostStatusInputFields,
});

export const PostUpdateManyWithWhereWithoutPostStatusInputFields = (t: any) => ({
  where: t.field({"required":true,"type":PostScalarWhereInput}),
  data: t.field({"required":true,"type":PostUpdateManyMutationInput}),
});
export const PostUpdateManyWithWhereWithoutPostStatusInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.PostUpdateManyWithWhereWithoutPostStatusInput>, false>('PostUpdateManyWithWhereWithoutPostStatusInput').implement({
  fields: PostUpdateManyWithWhereWithoutPostStatusInputFields,
});

export const UserCreateWithoutParticipationInputFields = (t: any) => ({
  id: t.string({"required":false}),
  createdAt: t.field({"required":false,"type":DateTime}),
  updatedAt: t.field({"required":false,"type":DateTime}),
  name: t.string({"required":false}),
  phoneNumber: t.string({"required":false}),
  accessCode: t.string({"required":true}),
  posts: t.field({"required":false,"type":PostCreateNestedManyWithoutPostedByInput}),
});
export const UserCreateWithoutParticipationInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.UserCreateWithoutParticipationInput>, false>('UserCreateWithoutParticipationInput').implement({
  fields: UserCreateWithoutParticipationInputFields,
});

export const UserCreateOrConnectWithoutParticipationInputFields = (t: any) => ({
  where: t.field({"required":true,"type":UserWhereUniqueInput}),
  create: t.field({"required":true,"type":UserCreateWithoutParticipationInput}),
});
export const UserCreateOrConnectWithoutParticipationInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.UserCreateOrConnectWithoutParticipationInput>, false>('UserCreateOrConnectWithoutParticipationInput').implement({
  fields: UserCreateOrConnectWithoutParticipationInputFields,
});

export const UserUpsertWithoutParticipationInputFields = (t: any) => ({
  update: t.field({"required":true,"type":UserUpdateWithoutParticipationInput}),
  create: t.field({"required":true,"type":UserCreateWithoutParticipationInput}),
  where: t.field({"required":false,"type":UserWhereInput}),
});
export const UserUpsertWithoutParticipationInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.UserUpsertWithoutParticipationInput>, false>('UserUpsertWithoutParticipationInput').implement({
  fields: UserUpsertWithoutParticipationInputFields,
});

export const UserUpdateToOneWithWhereWithoutParticipationInputFields = (t: any) => ({
  where: t.field({"required":false,"type":UserWhereInput}),
  data: t.field({"required":true,"type":UserUpdateWithoutParticipationInput}),
});
export const UserUpdateToOneWithWhereWithoutParticipationInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.UserUpdateToOneWithWhereWithoutParticipationInput>, false>('UserUpdateToOneWithWhereWithoutParticipationInput').implement({
  fields: UserUpdateToOneWithWhereWithoutParticipationInputFields,
});

export const UserUpdateWithoutParticipationInputFields = (t: any) => ({
  id: t.field({"required":false,"type":StringFieldUpdateOperationsInput}),
  createdAt: t.field({"required":false,"type":DateTimeFieldUpdateOperationsInput}),
  updatedAt: t.field({"required":false,"type":DateTimeFieldUpdateOperationsInput}),
  name: t.field({"required":false,"type":NullableStringFieldUpdateOperationsInput}),
  phoneNumber: t.field({"required":false,"type":NullableStringFieldUpdateOperationsInput}),
  accessCode: t.field({"required":false,"type":StringFieldUpdateOperationsInput}),
  posts: t.field({"required":false,"type":PostUpdateManyWithoutPostedByNestedInput}),
});
export const UserUpdateWithoutParticipationInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.UserUpdateWithoutParticipationInput>, false>('UserUpdateWithoutParticipationInput').implement({
  fields: UserUpdateWithoutParticipationInputFields,
});

export const PostCreateManyPostedByInputFields = (t: any) => ({
  id: t.string({"required":false}),
  createdAt: t.field({"required":false,"type":DateTime}),
  image: t.field({"required":true,"type":Bytes}),
  reading: t.float({"required":false}),
  postStatusId: t.string({"required":true}),
});
export const PostCreateManyPostedByInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.PostCreateManyPostedByInput>, false>('PostCreateManyPostedByInput').implement({
  fields: PostCreateManyPostedByInputFields,
});

export const PostUpdateWithoutPostedByInputFields = (t: any) => ({
  id: t.field({"required":false,"type":StringFieldUpdateOperationsInput}),
  createdAt: t.field({"required":false,"type":DateTimeFieldUpdateOperationsInput}),
  image: t.field({"required":false,"type":BytesFieldUpdateOperationsInput}),
  reading: t.field({"required":false,"type":NullableFloatFieldUpdateOperationsInput}),
  postStatus: t.field({"required":false,"type":PostStatusUpdateOneRequiredWithoutPostNestedInput}),
});
export const PostUpdateWithoutPostedByInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.PostUpdateWithoutPostedByInput>, false>('PostUpdateWithoutPostedByInput').implement({
  fields: PostUpdateWithoutPostedByInputFields,
});

export const PostCreateManyPostStatusInputFields = (t: any) => ({
  id: t.string({"required":false}),
  createdAt: t.field({"required":false,"type":DateTime}),
  image: t.field({"required":true,"type":Bytes}),
  reading: t.float({"required":false}),
  postedById: t.string({"required":true}),
});
export const PostCreateManyPostStatusInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.PostCreateManyPostStatusInput>, false>('PostCreateManyPostStatusInput').implement({
  fields: PostCreateManyPostStatusInputFields,
});

export const PostUpdateWithoutPostStatusInputFields = (t: any) => ({
  id: t.field({"required":false,"type":StringFieldUpdateOperationsInput}),
  createdAt: t.field({"required":false,"type":DateTimeFieldUpdateOperationsInput}),
  image: t.field({"required":false,"type":BytesFieldUpdateOperationsInput}),
  reading: t.field({"required":false,"type":NullableFloatFieldUpdateOperationsInput}),
  postedBy: t.field({"required":false,"type":UserUpdateOneRequiredWithoutPostsNestedInput}),
});
export const PostUpdateWithoutPostStatusInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.PostUpdateWithoutPostStatusInput>, false>('PostUpdateWithoutPostStatusInput').implement({
  fields: PostUpdateWithoutPostStatusInputFields,
});
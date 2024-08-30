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
  values: ["id","email","createdAt","updatedAt","activatedAt","deletedAt","phoneNumber","accessCode","userStatusId"] as const,
});

export const UserStatusScalarFieldEnum = builder.enumType('UserStatusScalarFieldEnum', {
  values: ["id","createdAt"] as const,
});

export const AdminScalarFieldEnum = builder.enumType('AdminScalarFieldEnum', {
  values: ["id","email","password"] as const,
});

export const PostScalarFieldEnum = builder.enumType('PostScalarFieldEnum', {
  values: ["id","name","createdAt","image","reading","postStatusId","statusChangedById","postedById","notes","size"] as const,
});

export const PostStatusScalarFieldEnum = builder.enumType('PostStatusScalarFieldEnum', {
  values: ["id","createdAt"] as const,
});

export const ParticipationScalarFieldEnum = builder.enumType('ParticipationScalarFieldEnum', {
  values: ["id","createdAt","updatedAt","totalIncentive","userId"] as const,
});

export const IncentiveTableScalarFieldEnum = builder.enumType('IncentiveTableScalarFieldEnum', {
  values: ["id","index","incentive"] as const,
});

export const InvitationScalarFieldEnum = builder.enumType('InvitationScalarFieldEnum', {
  values: ["id","createdAt","sentById","sentToId"] as const,
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
  email: t.field({"required":false,"type":StringNullableFilter}),
  createdAt: t.field({"required":false,"type":DateTimeFilter}),
  updatedAt: t.field({"required":false,"type":DateTimeFilter}),
  activatedAt: t.field({"required":false,"type":DateTimeNullableFilter}),
  deletedAt: t.field({"required":false,"type":DateTimeNullableFilter}),
  phoneNumber: t.field({"required":false,"type":StringFilter}),
  accessCode: t.field({"required":false,"type":StringFilter}),
  userStatusId: t.field({"required":false,"type":StringFilter}),
  posts: t.field({"required":false,"type":PostListRelationFilter}),
  participation: t.field({"required":false,"type":ParticipationWhereInput}),
  userStatus: t.field({"required":false,"type":UserStatusWhereInput}),
  invitations: t.field({"required":false,"type":InvitationListRelationFilter}),
});
export const UserWhereInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.UserWhereInput>, false>('UserWhereInput').implement({
  fields: UserWhereInputFields,
});

export const UserOrderByWithRelationInputFields = (t: any) => ({
  id: t.field({"required":false,"type":SortOrder}),
  email: t.field({"required":false,"type":SortOrder}),
  createdAt: t.field({"required":false,"type":SortOrder}),
  updatedAt: t.field({"required":false,"type":SortOrder}),
  activatedAt: t.field({"required":false,"type":SortOrder}),
  deletedAt: t.field({"required":false,"type":SortOrder}),
  phoneNumber: t.field({"required":false,"type":SortOrder}),
  accessCode: t.field({"required":false,"type":SortOrder}),
  userStatusId: t.field({"required":false,"type":SortOrder}),
  posts: t.field({"required":false,"type":PostOrderByRelationAggregateInput}),
  participation: t.field({"required":false,"type":ParticipationOrderByWithRelationInput}),
  userStatus: t.field({"required":false,"type":UserStatusOrderByWithRelationInput}),
  invitations: t.field({"required":false,"type":InvitationOrderByRelationAggregateInput}),
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
  email: t.field({"required":false,"type":StringNullableFilter}),
  createdAt: t.field({"required":false,"type":DateTimeFilter}),
  updatedAt: t.field({"required":false,"type":DateTimeFilter}),
  activatedAt: t.field({"required":false,"type":DateTimeNullableFilter}),
  deletedAt: t.field({"required":false,"type":DateTimeNullableFilter}),
  userStatusId: t.field({"required":false,"type":StringFilter}),
  posts: t.field({"required":false,"type":PostListRelationFilter}),
  participation: t.field({"required":false,"type":ParticipationWhereInput}),
  userStatus: t.field({"required":false,"type":UserStatusWhereInput}),
  invitations: t.field({"required":false,"type":InvitationListRelationFilter}),
});
export const UserWhereUniqueInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.UserWhereUniqueInput>, false>('UserWhereUniqueInput').implement({
  fields: UserWhereUniqueInputFields,
});

export const UserOrderByWithAggregationInputFields = (t: any) => ({
  id: t.field({"required":false,"type":SortOrder}),
  email: t.field({"required":false,"type":SortOrder}),
  createdAt: t.field({"required":false,"type":SortOrder}),
  updatedAt: t.field({"required":false,"type":SortOrder}),
  activatedAt: t.field({"required":false,"type":SortOrder}),
  deletedAt: t.field({"required":false,"type":SortOrder}),
  phoneNumber: t.field({"required":false,"type":SortOrder}),
  accessCode: t.field({"required":false,"type":SortOrder}),
  userStatusId: t.field({"required":false,"type":SortOrder}),
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
  email: t.field({"required":false,"type":StringNullableWithAggregatesFilter}),
  createdAt: t.field({"required":false,"type":DateTimeWithAggregatesFilter}),
  updatedAt: t.field({"required":false,"type":DateTimeWithAggregatesFilter}),
  activatedAt: t.field({"required":false,"type":DateTimeNullableWithAggregatesFilter}),
  deletedAt: t.field({"required":false,"type":DateTimeNullableWithAggregatesFilter}),
  phoneNumber: t.field({"required":false,"type":StringWithAggregatesFilter}),
  accessCode: t.field({"required":false,"type":StringWithAggregatesFilter}),
  userStatusId: t.field({"required":false,"type":StringWithAggregatesFilter}),
});
export const UserScalarWhereWithAggregatesInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.UserScalarWhereWithAggregatesInput>, false>('UserScalarWhereWithAggregatesInput').implement({
  fields: UserScalarWhereWithAggregatesInputFields,
});

export const UserStatusWhereInputFields = (t: any) => ({
  AND: t.field({"required":false,"type":[UserStatusWhereInput]}),
  OR: t.field({"required":false,"type":[UserStatusWhereInput]}),
  NOT: t.field({"required":false,"type":[UserStatusWhereInput]}),
  id: t.field({"required":false,"type":StringFilter}),
  createdAt: t.field({"required":false,"type":DateTimeFilter}),
  User: t.field({"required":false,"type":UserListRelationFilter}),
});
export const UserStatusWhereInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.UserStatusWhereInput>, false>('UserStatusWhereInput').implement({
  fields: UserStatusWhereInputFields,
});

export const UserStatusOrderByWithRelationInputFields = (t: any) => ({
  id: t.field({"required":false,"type":SortOrder}),
  createdAt: t.field({"required":false,"type":SortOrder}),
  User: t.field({"required":false,"type":UserOrderByRelationAggregateInput}),
});
export const UserStatusOrderByWithRelationInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.UserStatusOrderByWithRelationInput>, false>('UserStatusOrderByWithRelationInput').implement({
  fields: UserStatusOrderByWithRelationInputFields,
});

export const UserStatusWhereUniqueInputFields = (t: any) => ({
  id: t.string({"required":false}),
  AND: t.field({"required":false,"type":[UserStatusWhereInput]}),
  OR: t.field({"required":false,"type":[UserStatusWhereInput]}),
  NOT: t.field({"required":false,"type":[UserStatusWhereInput]}),
  createdAt: t.field({"required":false,"type":DateTimeFilter}),
  User: t.field({"required":false,"type":UserListRelationFilter}),
});
export const UserStatusWhereUniqueInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.UserStatusWhereUniqueInput>, false>('UserStatusWhereUniqueInput').implement({
  fields: UserStatusWhereUniqueInputFields,
});

export const UserStatusOrderByWithAggregationInputFields = (t: any) => ({
  id: t.field({"required":false,"type":SortOrder}),
  createdAt: t.field({"required":false,"type":SortOrder}),
  _count: t.field({"required":false,"type":UserStatusCountOrderByAggregateInput}),
  _max: t.field({"required":false,"type":UserStatusMaxOrderByAggregateInput}),
  _min: t.field({"required":false,"type":UserStatusMinOrderByAggregateInput}),
});
export const UserStatusOrderByWithAggregationInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.UserStatusOrderByWithAggregationInput>, false>('UserStatusOrderByWithAggregationInput').implement({
  fields: UserStatusOrderByWithAggregationInputFields,
});

export const UserStatusScalarWhereWithAggregatesInputFields = (t: any) => ({
  AND: t.field({"required":false,"type":[UserStatusScalarWhereWithAggregatesInput]}),
  OR: t.field({"required":false,"type":[UserStatusScalarWhereWithAggregatesInput]}),
  NOT: t.field({"required":false,"type":[UserStatusScalarWhereWithAggregatesInput]}),
  id: t.field({"required":false,"type":StringWithAggregatesFilter}),
  createdAt: t.field({"required":false,"type":DateTimeWithAggregatesFilter}),
});
export const UserStatusScalarWhereWithAggregatesInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.UserStatusScalarWhereWithAggregatesInput>, false>('UserStatusScalarWhereWithAggregatesInput').implement({
  fields: UserStatusScalarWhereWithAggregatesInputFields,
});

export const AdminWhereInputFields = (t: any) => ({
  AND: t.field({"required":false,"type":[AdminWhereInput]}),
  OR: t.field({"required":false,"type":[AdminWhereInput]}),
  NOT: t.field({"required":false,"type":[AdminWhereInput]}),
  id: t.field({"required":false,"type":StringFilter}),
  email: t.field({"required":false,"type":StringFilter}),
  password: t.field({"required":false,"type":StringFilter}),
  post: t.field({"required":false,"type":PostListRelationFilter}),
  invitation: t.field({"required":false,"type":InvitationListRelationFilter}),
});
export const AdminWhereInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.AdminWhereInput>, false>('AdminWhereInput').implement({
  fields: AdminWhereInputFields,
});

export const AdminOrderByWithRelationInputFields = (t: any) => ({
  id: t.field({"required":false,"type":SortOrder}),
  email: t.field({"required":false,"type":SortOrder}),
  password: t.field({"required":false,"type":SortOrder}),
  post: t.field({"required":false,"type":PostOrderByRelationAggregateInput}),
  invitation: t.field({"required":false,"type":InvitationOrderByRelationAggregateInput}),
});
export const AdminOrderByWithRelationInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.AdminOrderByWithRelationInput>, false>('AdminOrderByWithRelationInput').implement({
  fields: AdminOrderByWithRelationInputFields,
});

export const AdminWhereUniqueInputFields = (t: any) => ({
  id: t.string({"required":false}),
  email: t.string({"required":false}),
  AND: t.field({"required":false,"type":[AdminWhereInput]}),
  OR: t.field({"required":false,"type":[AdminWhereInput]}),
  NOT: t.field({"required":false,"type":[AdminWhereInput]}),
  password: t.field({"required":false,"type":StringFilter}),
  post: t.field({"required":false,"type":PostListRelationFilter}),
  invitation: t.field({"required":false,"type":InvitationListRelationFilter}),
});
export const AdminWhereUniqueInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.AdminWhereUniqueInput>, false>('AdminWhereUniqueInput').implement({
  fields: AdminWhereUniqueInputFields,
});

export const AdminOrderByWithAggregationInputFields = (t: any) => ({
  id: t.field({"required":false,"type":SortOrder}),
  email: t.field({"required":false,"type":SortOrder}),
  password: t.field({"required":false,"type":SortOrder}),
  _count: t.field({"required":false,"type":AdminCountOrderByAggregateInput}),
  _max: t.field({"required":false,"type":AdminMaxOrderByAggregateInput}),
  _min: t.field({"required":false,"type":AdminMinOrderByAggregateInput}),
});
export const AdminOrderByWithAggregationInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.AdminOrderByWithAggregationInput>, false>('AdminOrderByWithAggregationInput').implement({
  fields: AdminOrderByWithAggregationInputFields,
});

export const AdminScalarWhereWithAggregatesInputFields = (t: any) => ({
  AND: t.field({"required":false,"type":[AdminScalarWhereWithAggregatesInput]}),
  OR: t.field({"required":false,"type":[AdminScalarWhereWithAggregatesInput]}),
  NOT: t.field({"required":false,"type":[AdminScalarWhereWithAggregatesInput]}),
  id: t.field({"required":false,"type":StringWithAggregatesFilter}),
  email: t.field({"required":false,"type":StringWithAggregatesFilter}),
  password: t.field({"required":false,"type":StringWithAggregatesFilter}),
});
export const AdminScalarWhereWithAggregatesInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.AdminScalarWhereWithAggregatesInput>, false>('AdminScalarWhereWithAggregatesInput').implement({
  fields: AdminScalarWhereWithAggregatesInputFields,
});

export const PostWhereInputFields = (t: any) => ({
  AND: t.field({"required":false,"type":[PostWhereInput]}),
  OR: t.field({"required":false,"type":[PostWhereInput]}),
  NOT: t.field({"required":false,"type":[PostWhereInput]}),
  id: t.field({"required":false,"type":StringFilter}),
  name: t.field({"required":false,"type":StringFilter}),
  createdAt: t.field({"required":false,"type":DateTimeFilter}),
  image: t.field({"required":false,"type":BytesFilter}),
  reading: t.field({"required":false,"type":FloatFilter}),
  postStatusId: t.field({"required":false,"type":StringFilter}),
  statusChangedById: t.field({"required":false,"type":StringNullableFilter}),
  postedById: t.field({"required":false,"type":StringFilter}),
  notes: t.field({"required":false,"type":StringNullableFilter}),
  size: t.field({"required":false,"type":FloatFilter}),
  postStatus: t.field({"required":false,"type":PostStatusWhereInput}),
  statusChangedBy: t.field({"required":false,"type":AdminWhereInput}),
  postedBy: t.field({"required":false,"type":UserWhereInput}),
});
export const PostWhereInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.PostWhereInput>, false>('PostWhereInput').implement({
  fields: PostWhereInputFields,
});

export const PostOrderByWithRelationInputFields = (t: any) => ({
  id: t.field({"required":false,"type":SortOrder}),
  name: t.field({"required":false,"type":SortOrder}),
  createdAt: t.field({"required":false,"type":SortOrder}),
  image: t.field({"required":false,"type":SortOrder}),
  reading: t.field({"required":false,"type":SortOrder}),
  postStatusId: t.field({"required":false,"type":SortOrder}),
  statusChangedById: t.field({"required":false,"type":SortOrder}),
  postedById: t.field({"required":false,"type":SortOrder}),
  notes: t.field({"required":false,"type":SortOrder}),
  size: t.field({"required":false,"type":SortOrder}),
  postStatus: t.field({"required":false,"type":PostStatusOrderByWithRelationInput}),
  statusChangedBy: t.field({"required":false,"type":AdminOrderByWithRelationInput}),
  postedBy: t.field({"required":false,"type":UserOrderByWithRelationInput}),
});
export const PostOrderByWithRelationInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.PostOrderByWithRelationInput>, false>('PostOrderByWithRelationInput').implement({
  fields: PostOrderByWithRelationInputFields,
});

export const PostWhereUniqueInputFields = (t: any) => ({
  id: t.string({"required":false}),
  name: t.string({"required":false}),
  AND: t.field({"required":false,"type":[PostWhereInput]}),
  OR: t.field({"required":false,"type":[PostWhereInput]}),
  NOT: t.field({"required":false,"type":[PostWhereInput]}),
  createdAt: t.field({"required":false,"type":DateTimeFilter}),
  image: t.field({"required":false,"type":BytesFilter}),
  reading: t.field({"required":false,"type":FloatFilter}),
  postStatusId: t.field({"required":false,"type":StringFilter}),
  statusChangedById: t.field({"required":false,"type":StringNullableFilter}),
  postedById: t.field({"required":false,"type":StringFilter}),
  notes: t.field({"required":false,"type":StringNullableFilter}),
  size: t.field({"required":false,"type":FloatFilter}),
  postStatus: t.field({"required":false,"type":PostStatusWhereInput}),
  statusChangedBy: t.field({"required":false,"type":AdminWhereInput}),
  postedBy: t.field({"required":false,"type":UserWhereInput}),
});
export const PostWhereUniqueInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.PostWhereUniqueInput>, false>('PostWhereUniqueInput').implement({
  fields: PostWhereUniqueInputFields,
});

export const PostOrderByWithAggregationInputFields = (t: any) => ({
  id: t.field({"required":false,"type":SortOrder}),
  name: t.field({"required":false,"type":SortOrder}),
  createdAt: t.field({"required":false,"type":SortOrder}),
  image: t.field({"required":false,"type":SortOrder}),
  reading: t.field({"required":false,"type":SortOrder}),
  postStatusId: t.field({"required":false,"type":SortOrder}),
  statusChangedById: t.field({"required":false,"type":SortOrder}),
  postedById: t.field({"required":false,"type":SortOrder}),
  notes: t.field({"required":false,"type":SortOrder}),
  size: t.field({"required":false,"type":SortOrder}),
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
  name: t.field({"required":false,"type":StringWithAggregatesFilter}),
  createdAt: t.field({"required":false,"type":DateTimeWithAggregatesFilter}),
  image: t.field({"required":false,"type":BytesWithAggregatesFilter}),
  reading: t.field({"required":false,"type":FloatWithAggregatesFilter}),
  postStatusId: t.field({"required":false,"type":StringWithAggregatesFilter}),
  statusChangedById: t.field({"required":false,"type":StringNullableWithAggregatesFilter}),
  postedById: t.field({"required":false,"type":StringWithAggregatesFilter}),
  notes: t.field({"required":false,"type":StringNullableWithAggregatesFilter}),
  size: t.field({"required":false,"type":FloatWithAggregatesFilter}),
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
  Post: t.field({"required":false,"type":PostListRelationFilter}),
});
export const PostStatusWhereInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.PostStatusWhereInput>, false>('PostStatusWhereInput').implement({
  fields: PostStatusWhereInputFields,
});

export const PostStatusOrderByWithRelationInputFields = (t: any) => ({
  id: t.field({"required":false,"type":SortOrder}),
  createdAt: t.field({"required":false,"type":SortOrder}),
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
  Post: t.field({"required":false,"type":PostListRelationFilter}),
});
export const PostStatusWhereUniqueInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.PostStatusWhereUniqueInput>, false>('PostStatusWhereUniqueInput').implement({
  fields: PostStatusWhereUniqueInputFields,
});

export const PostStatusOrderByWithAggregationInputFields = (t: any) => ({
  id: t.field({"required":false,"type":SortOrder}),
  createdAt: t.field({"required":false,"type":SortOrder}),
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

export const InvitationWhereInputFields = (t: any) => ({
  AND: t.field({"required":false,"type":[InvitationWhereInput]}),
  OR: t.field({"required":false,"type":[InvitationWhereInput]}),
  NOT: t.field({"required":false,"type":[InvitationWhereInput]}),
  id: t.field({"required":false,"type":StringFilter}),
  createdAt: t.field({"required":false,"type":DateTimeFilter}),
  sentById: t.field({"required":false,"type":StringFilter}),
  sentToId: t.field({"required":false,"type":StringFilter}),
  sentBy: t.field({"required":false,"type":AdminWhereInput}),
  sentTo: t.field({"required":false,"type":UserWhereInput}),
});
export const InvitationWhereInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.InvitationWhereInput>, false>('InvitationWhereInput').implement({
  fields: InvitationWhereInputFields,
});

export const InvitationOrderByWithRelationInputFields = (t: any) => ({
  id: t.field({"required":false,"type":SortOrder}),
  createdAt: t.field({"required":false,"type":SortOrder}),
  sentById: t.field({"required":false,"type":SortOrder}),
  sentToId: t.field({"required":false,"type":SortOrder}),
  sentBy: t.field({"required":false,"type":AdminOrderByWithRelationInput}),
  sentTo: t.field({"required":false,"type":UserOrderByWithRelationInput}),
});
export const InvitationOrderByWithRelationInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.InvitationOrderByWithRelationInput>, false>('InvitationOrderByWithRelationInput').implement({
  fields: InvitationOrderByWithRelationInputFields,
});

export const InvitationWhereUniqueInputFields = (t: any) => ({
  id: t.string({"required":false}),
  AND: t.field({"required":false,"type":[InvitationWhereInput]}),
  OR: t.field({"required":false,"type":[InvitationWhereInput]}),
  NOT: t.field({"required":false,"type":[InvitationWhereInput]}),
  createdAt: t.field({"required":false,"type":DateTimeFilter}),
  sentById: t.field({"required":false,"type":StringFilter}),
  sentToId: t.field({"required":false,"type":StringFilter}),
  sentBy: t.field({"required":false,"type":AdminWhereInput}),
  sentTo: t.field({"required":false,"type":UserWhereInput}),
});
export const InvitationWhereUniqueInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.InvitationWhereUniqueInput>, false>('InvitationWhereUniqueInput').implement({
  fields: InvitationWhereUniqueInputFields,
});

export const InvitationOrderByWithAggregationInputFields = (t: any) => ({
  id: t.field({"required":false,"type":SortOrder}),
  createdAt: t.field({"required":false,"type":SortOrder}),
  sentById: t.field({"required":false,"type":SortOrder}),
  sentToId: t.field({"required":false,"type":SortOrder}),
  _count: t.field({"required":false,"type":InvitationCountOrderByAggregateInput}),
  _max: t.field({"required":false,"type":InvitationMaxOrderByAggregateInput}),
  _min: t.field({"required":false,"type":InvitationMinOrderByAggregateInput}),
});
export const InvitationOrderByWithAggregationInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.InvitationOrderByWithAggregationInput>, false>('InvitationOrderByWithAggregationInput').implement({
  fields: InvitationOrderByWithAggregationInputFields,
});

export const InvitationScalarWhereWithAggregatesInputFields = (t: any) => ({
  AND: t.field({"required":false,"type":[InvitationScalarWhereWithAggregatesInput]}),
  OR: t.field({"required":false,"type":[InvitationScalarWhereWithAggregatesInput]}),
  NOT: t.field({"required":false,"type":[InvitationScalarWhereWithAggregatesInput]}),
  id: t.field({"required":false,"type":StringWithAggregatesFilter}),
  createdAt: t.field({"required":false,"type":DateTimeWithAggregatesFilter}),
  sentById: t.field({"required":false,"type":StringWithAggregatesFilter}),
  sentToId: t.field({"required":false,"type":StringWithAggregatesFilter}),
});
export const InvitationScalarWhereWithAggregatesInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.InvitationScalarWhereWithAggregatesInput>, false>('InvitationScalarWhereWithAggregatesInput').implement({
  fields: InvitationScalarWhereWithAggregatesInputFields,
});

export const UserCreateInputFields = (t: any) => ({
  id: t.string({"required":false}),
  email: t.string({"required":false}),
  createdAt: t.field({"required":false,"type":DateTime}),
  updatedAt: t.field({"required":false,"type":DateTime}),
  activatedAt: t.field({"required":false,"type":DateTime}),
  deletedAt: t.field({"required":false,"type":DateTime}),
  phoneNumber: t.string({"required":false}),
  accessCode: t.string({"required":true}),
  posts: t.field({"required":false,"type":PostCreateNestedManyWithoutPostedByInput}),
  participation: t.field({"required":false,"type":ParticipationCreateNestedOneWithoutUserInput}),
  userStatus: t.field({"required":false,"type":UserStatusCreateNestedOneWithoutUserInput}),
  invitations: t.field({"required":false,"type":InvitationCreateNestedManyWithoutSentToInput}),
});
export const UserCreateInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.UserCreateInput>, false>('UserCreateInput').implement({
  fields: UserCreateInputFields,
});

export const UserUpdateInputFields = (t: any) => ({
  id: t.field({"required":false,"type":StringFieldUpdateOperationsInput}),
  email: t.field({"required":false,"type":NullableStringFieldUpdateOperationsInput}),
  createdAt: t.field({"required":false,"type":DateTimeFieldUpdateOperationsInput}),
  updatedAt: t.field({"required":false,"type":DateTimeFieldUpdateOperationsInput}),
  activatedAt: t.field({"required":false,"type":NullableDateTimeFieldUpdateOperationsInput}),
  deletedAt: t.field({"required":false,"type":NullableDateTimeFieldUpdateOperationsInput}),
  phoneNumber: t.field({"required":false,"type":StringFieldUpdateOperationsInput}),
  accessCode: t.field({"required":false,"type":StringFieldUpdateOperationsInput}),
  posts: t.field({"required":false,"type":PostUpdateManyWithoutPostedByNestedInput}),
  participation: t.field({"required":false,"type":ParticipationUpdateOneWithoutUserNestedInput}),
  userStatus: t.field({"required":false,"type":UserStatusUpdateOneRequiredWithoutUserNestedInput}),
  invitations: t.field({"required":false,"type":InvitationUpdateManyWithoutSentToNestedInput}),
});
export const UserUpdateInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.UserUpdateInput>, false>('UserUpdateInput').implement({
  fields: UserUpdateInputFields,
});

export const UserCreateManyInputFields = (t: any) => ({
  id: t.string({"required":false}),
  email: t.string({"required":false}),
  createdAt: t.field({"required":false,"type":DateTime}),
  updatedAt: t.field({"required":false,"type":DateTime}),
  activatedAt: t.field({"required":false,"type":DateTime}),
  deletedAt: t.field({"required":false,"type":DateTime}),
  phoneNumber: t.string({"required":false}),
  accessCode: t.string({"required":true}),
  userStatusId: t.string({"required":false}),
});
export const UserCreateManyInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.UserCreateManyInput>, false>('UserCreateManyInput').implement({
  fields: UserCreateManyInputFields,
});

export const UserUpdateManyMutationInputFields = (t: any) => ({
  id: t.field({"required":false,"type":StringFieldUpdateOperationsInput}),
  email: t.field({"required":false,"type":NullableStringFieldUpdateOperationsInput}),
  createdAt: t.field({"required":false,"type":DateTimeFieldUpdateOperationsInput}),
  updatedAt: t.field({"required":false,"type":DateTimeFieldUpdateOperationsInput}),
  activatedAt: t.field({"required":false,"type":NullableDateTimeFieldUpdateOperationsInput}),
  deletedAt: t.field({"required":false,"type":NullableDateTimeFieldUpdateOperationsInput}),
  phoneNumber: t.field({"required":false,"type":StringFieldUpdateOperationsInput}),
  accessCode: t.field({"required":false,"type":StringFieldUpdateOperationsInput}),
});
export const UserUpdateManyMutationInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.UserUpdateManyMutationInput>, false>('UserUpdateManyMutationInput').implement({
  fields: UserUpdateManyMutationInputFields,
});

export const UserStatusCreateInputFields = (t: any) => ({
  id: t.string({"required":true}),
  createdAt: t.field({"required":false,"type":DateTime}),
  User: t.field({"required":false,"type":UserCreateNestedManyWithoutUserStatusInput}),
});
export const UserStatusCreateInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.UserStatusCreateInput>, false>('UserStatusCreateInput').implement({
  fields: UserStatusCreateInputFields,
});

export const UserStatusUpdateInputFields = (t: any) => ({
  id: t.field({"required":false,"type":StringFieldUpdateOperationsInput}),
  createdAt: t.field({"required":false,"type":DateTimeFieldUpdateOperationsInput}),
  User: t.field({"required":false,"type":UserUpdateManyWithoutUserStatusNestedInput}),
});
export const UserStatusUpdateInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.UserStatusUpdateInput>, false>('UserStatusUpdateInput').implement({
  fields: UserStatusUpdateInputFields,
});

export const UserStatusCreateManyInputFields = (t: any) => ({
  id: t.string({"required":true}),
  createdAt: t.field({"required":false,"type":DateTime}),
});
export const UserStatusCreateManyInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.UserStatusCreateManyInput>, false>('UserStatusCreateManyInput').implement({
  fields: UserStatusCreateManyInputFields,
});

export const UserStatusUpdateManyMutationInputFields = (t: any) => ({
  id: t.field({"required":false,"type":StringFieldUpdateOperationsInput}),
  createdAt: t.field({"required":false,"type":DateTimeFieldUpdateOperationsInput}),
});
export const UserStatusUpdateManyMutationInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.UserStatusUpdateManyMutationInput>, false>('UserStatusUpdateManyMutationInput').implement({
  fields: UserStatusUpdateManyMutationInputFields,
});

export const AdminCreateInputFields = (t: any) => ({
  id: t.string({"required":false}),
  email: t.string({"required":true}),
  password: t.string({"required":true}),
  post: t.field({"required":false,"type":PostCreateNestedManyWithoutStatusChangedByInput}),
  invitation: t.field({"required":false,"type":InvitationCreateNestedManyWithoutSentByInput}),
});
export const AdminCreateInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.AdminCreateInput>, false>('AdminCreateInput').implement({
  fields: AdminCreateInputFields,
});

export const AdminUpdateInputFields = (t: any) => ({
  id: t.field({"required":false,"type":StringFieldUpdateOperationsInput}),
  email: t.field({"required":false,"type":StringFieldUpdateOperationsInput}),
  password: t.field({"required":false,"type":StringFieldUpdateOperationsInput}),
  post: t.field({"required":false,"type":PostUpdateManyWithoutStatusChangedByNestedInput}),
  invitation: t.field({"required":false,"type":InvitationUpdateManyWithoutSentByNestedInput}),
});
export const AdminUpdateInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.AdminUpdateInput>, false>('AdminUpdateInput').implement({
  fields: AdminUpdateInputFields,
});

export const AdminCreateManyInputFields = (t: any) => ({
  id: t.string({"required":false}),
  email: t.string({"required":true}),
  password: t.string({"required":true}),
});
export const AdminCreateManyInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.AdminCreateManyInput>, false>('AdminCreateManyInput').implement({
  fields: AdminCreateManyInputFields,
});

export const AdminUpdateManyMutationInputFields = (t: any) => ({
  id: t.field({"required":false,"type":StringFieldUpdateOperationsInput}),
  email: t.field({"required":false,"type":StringFieldUpdateOperationsInput}),
  password: t.field({"required":false,"type":StringFieldUpdateOperationsInput}),
});
export const AdminUpdateManyMutationInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.AdminUpdateManyMutationInput>, false>('AdminUpdateManyMutationInput').implement({
  fields: AdminUpdateManyMutationInputFields,
});

export const PostCreateInputFields = (t: any) => ({
  id: t.string({"required":false}),
  name: t.string({"required":true}),
  createdAt: t.field({"required":false,"type":DateTime}),
  image: t.field({"required":true,"type":Bytes}),
  reading: t.float({"required":false}),
  notes: t.string({"required":false}),
  size: t.float({"required":false}),
  postStatus: t.field({"required":true,"type":PostStatusCreateNestedOneWithoutPostInput}),
  statusChangedBy: t.field({"required":false,"type":AdminCreateNestedOneWithoutPostInput}),
  postedBy: t.field({"required":true,"type":UserCreateNestedOneWithoutPostsInput}),
});
export const PostCreateInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.PostCreateInput>, false>('PostCreateInput').implement({
  fields: PostCreateInputFields,
});

export const PostUpdateInputFields = (t: any) => ({
  id: t.field({"required":false,"type":StringFieldUpdateOperationsInput}),
  name: t.field({"required":false,"type":StringFieldUpdateOperationsInput}),
  createdAt: t.field({"required":false,"type":DateTimeFieldUpdateOperationsInput}),
  image: t.field({"required":false,"type":BytesFieldUpdateOperationsInput}),
  reading: t.field({"required":false,"type":FloatFieldUpdateOperationsInput}),
  notes: t.field({"required":false,"type":NullableStringFieldUpdateOperationsInput}),
  size: t.field({"required":false,"type":FloatFieldUpdateOperationsInput}),
  postStatus: t.field({"required":false,"type":PostStatusUpdateOneRequiredWithoutPostNestedInput}),
  statusChangedBy: t.field({"required":false,"type":AdminUpdateOneWithoutPostNestedInput}),
  postedBy: t.field({"required":false,"type":UserUpdateOneRequiredWithoutPostsNestedInput}),
});
export const PostUpdateInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.PostUpdateInput>, false>('PostUpdateInput').implement({
  fields: PostUpdateInputFields,
});

export const PostCreateManyInputFields = (t: any) => ({
  id: t.string({"required":false}),
  name: t.string({"required":true}),
  createdAt: t.field({"required":false,"type":DateTime}),
  image: t.field({"required":true,"type":Bytes}),
  reading: t.float({"required":false}),
  postStatusId: t.string({"required":true}),
  statusChangedById: t.string({"required":false}),
  postedById: t.string({"required":true}),
  notes: t.string({"required":false}),
  size: t.float({"required":false}),
});
export const PostCreateManyInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.PostCreateManyInput>, false>('PostCreateManyInput').implement({
  fields: PostCreateManyInputFields,
});

export const PostUpdateManyMutationInputFields = (t: any) => ({
  id: t.field({"required":false,"type":StringFieldUpdateOperationsInput}),
  name: t.field({"required":false,"type":StringFieldUpdateOperationsInput}),
  createdAt: t.field({"required":false,"type":DateTimeFieldUpdateOperationsInput}),
  image: t.field({"required":false,"type":BytesFieldUpdateOperationsInput}),
  reading: t.field({"required":false,"type":FloatFieldUpdateOperationsInput}),
  notes: t.field({"required":false,"type":NullableStringFieldUpdateOperationsInput}),
  size: t.field({"required":false,"type":FloatFieldUpdateOperationsInput}),
});
export const PostUpdateManyMutationInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.PostUpdateManyMutationInput>, false>('PostUpdateManyMutationInput').implement({
  fields: PostUpdateManyMutationInputFields,
});

export const PostStatusCreateInputFields = (t: any) => ({
  id: t.string({"required":true}),
  createdAt: t.field({"required":false,"type":DateTime}),
  Post: t.field({"required":false,"type":PostCreateNestedManyWithoutPostStatusInput}),
});
export const PostStatusCreateInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.PostStatusCreateInput>, false>('PostStatusCreateInput').implement({
  fields: PostStatusCreateInputFields,
});

export const PostStatusUpdateInputFields = (t: any) => ({
  id: t.field({"required":false,"type":StringFieldUpdateOperationsInput}),
  createdAt: t.field({"required":false,"type":DateTimeFieldUpdateOperationsInput}),
  Post: t.field({"required":false,"type":PostUpdateManyWithoutPostStatusNestedInput}),
});
export const PostStatusUpdateInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.PostStatusUpdateInput>, false>('PostStatusUpdateInput').implement({
  fields: PostStatusUpdateInputFields,
});

export const PostStatusCreateManyInputFields = (t: any) => ({
  id: t.string({"required":true}),
  createdAt: t.field({"required":false,"type":DateTime}),
});
export const PostStatusCreateManyInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.PostStatusCreateManyInput>, false>('PostStatusCreateManyInput').implement({
  fields: PostStatusCreateManyInputFields,
});

export const PostStatusUpdateManyMutationInputFields = (t: any) => ({
  id: t.field({"required":false,"type":StringFieldUpdateOperationsInput}),
  createdAt: t.field({"required":false,"type":DateTimeFieldUpdateOperationsInput}),
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

export const InvitationCreateInputFields = (t: any) => ({
  id: t.string({"required":false}),
  createdAt: t.field({"required":false,"type":DateTime}),
  sentBy: t.field({"required":true,"type":AdminCreateNestedOneWithoutInvitationInput}),
  sentTo: t.field({"required":true,"type":UserCreateNestedOneWithoutInvitationsInput}),
});
export const InvitationCreateInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.InvitationCreateInput>, false>('InvitationCreateInput').implement({
  fields: InvitationCreateInputFields,
});

export const InvitationUpdateInputFields = (t: any) => ({
  id: t.field({"required":false,"type":StringFieldUpdateOperationsInput}),
  createdAt: t.field({"required":false,"type":DateTimeFieldUpdateOperationsInput}),
  sentBy: t.field({"required":false,"type":AdminUpdateOneRequiredWithoutInvitationNestedInput}),
  sentTo: t.field({"required":false,"type":UserUpdateOneRequiredWithoutInvitationsNestedInput}),
});
export const InvitationUpdateInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.InvitationUpdateInput>, false>('InvitationUpdateInput').implement({
  fields: InvitationUpdateInputFields,
});

export const InvitationCreateManyInputFields = (t: any) => ({
  id: t.string({"required":false}),
  createdAt: t.field({"required":false,"type":DateTime}),
  sentById: t.string({"required":true}),
  sentToId: t.string({"required":true}),
});
export const InvitationCreateManyInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.InvitationCreateManyInput>, false>('InvitationCreateManyInput').implement({
  fields: InvitationCreateManyInputFields,
});

export const InvitationUpdateManyMutationInputFields = (t: any) => ({
  id: t.field({"required":false,"type":StringFieldUpdateOperationsInput}),
  createdAt: t.field({"required":false,"type":DateTimeFieldUpdateOperationsInput}),
});
export const InvitationUpdateManyMutationInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.InvitationUpdateManyMutationInput>, false>('InvitationUpdateManyMutationInput').implement({
  fields: InvitationUpdateManyMutationInputFields,
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

export const DateTimeNullableFilterFields = (t: any) => ({
  equals: t.field({"required":false,"type":DateTime}),
  in: t.field({"required":false,"type":[DateTime]}),
  notIn: t.field({"required":false,"type":[DateTime]}),
  lt: t.field({"required":false,"type":DateTime}),
  lte: t.field({"required":false,"type":DateTime}),
  gt: t.field({"required":false,"type":DateTime}),
  gte: t.field({"required":false,"type":DateTime}),
  not: t.field({"required":false,"type":NestedDateTimeNullableFilter}),
});
export const DateTimeNullableFilter = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.DateTimeNullableFilter>, false>('DateTimeNullableFilter').implement({
  fields: DateTimeNullableFilterFields,
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

export const UserStatusRelationFilterFields = (t: any) => ({
  is: t.field({"required":false,"type":UserStatusWhereInput}),
  isNot: t.field({"required":false,"type":UserStatusWhereInput}),
});
export const UserStatusRelationFilter = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.UserStatusRelationFilter>, false>('UserStatusRelationFilter').implement({
  fields: UserStatusRelationFilterFields,
});

export const InvitationListRelationFilterFields = (t: any) => ({
  every: t.field({"required":false,"type":InvitationWhereInput}),
  some: t.field({"required":false,"type":InvitationWhereInput}),
  none: t.field({"required":false,"type":InvitationWhereInput}),
});
export const InvitationListRelationFilter = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.InvitationListRelationFilter>, false>('InvitationListRelationFilter').implement({
  fields: InvitationListRelationFilterFields,
});

export const PostOrderByRelationAggregateInputFields = (t: any) => ({
  _count: t.field({"required":false,"type":SortOrder}),
});
export const PostOrderByRelationAggregateInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.PostOrderByRelationAggregateInput>, false>('PostOrderByRelationAggregateInput').implement({
  fields: PostOrderByRelationAggregateInputFields,
});

export const InvitationOrderByRelationAggregateInputFields = (t: any) => ({
  _count: t.field({"required":false,"type":SortOrder}),
});
export const InvitationOrderByRelationAggregateInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.InvitationOrderByRelationAggregateInput>, false>('InvitationOrderByRelationAggregateInput').implement({
  fields: InvitationOrderByRelationAggregateInputFields,
});

export const UserCountOrderByAggregateInputFields = (t: any) => ({
  id: t.field({"required":false,"type":SortOrder}),
  email: t.field({"required":false,"type":SortOrder}),
  createdAt: t.field({"required":false,"type":SortOrder}),
  updatedAt: t.field({"required":false,"type":SortOrder}),
  activatedAt: t.field({"required":false,"type":SortOrder}),
  deletedAt: t.field({"required":false,"type":SortOrder}),
  phoneNumber: t.field({"required":false,"type":SortOrder}),
  accessCode: t.field({"required":false,"type":SortOrder}),
  userStatusId: t.field({"required":false,"type":SortOrder}),
});
export const UserCountOrderByAggregateInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.UserCountOrderByAggregateInput>, false>('UserCountOrderByAggregateInput').implement({
  fields: UserCountOrderByAggregateInputFields,
});

export const UserMaxOrderByAggregateInputFields = (t: any) => ({
  id: t.field({"required":false,"type":SortOrder}),
  email: t.field({"required":false,"type":SortOrder}),
  createdAt: t.field({"required":false,"type":SortOrder}),
  updatedAt: t.field({"required":false,"type":SortOrder}),
  activatedAt: t.field({"required":false,"type":SortOrder}),
  deletedAt: t.field({"required":false,"type":SortOrder}),
  phoneNumber: t.field({"required":false,"type":SortOrder}),
  accessCode: t.field({"required":false,"type":SortOrder}),
  userStatusId: t.field({"required":false,"type":SortOrder}),
});
export const UserMaxOrderByAggregateInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.UserMaxOrderByAggregateInput>, false>('UserMaxOrderByAggregateInput').implement({
  fields: UserMaxOrderByAggregateInputFields,
});

export const UserMinOrderByAggregateInputFields = (t: any) => ({
  id: t.field({"required":false,"type":SortOrder}),
  email: t.field({"required":false,"type":SortOrder}),
  createdAt: t.field({"required":false,"type":SortOrder}),
  updatedAt: t.field({"required":false,"type":SortOrder}),
  activatedAt: t.field({"required":false,"type":SortOrder}),
  deletedAt: t.field({"required":false,"type":SortOrder}),
  phoneNumber: t.field({"required":false,"type":SortOrder}),
  accessCode: t.field({"required":false,"type":SortOrder}),
  userStatusId: t.field({"required":false,"type":SortOrder}),
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

export const DateTimeNullableWithAggregatesFilterFields = (t: any) => ({
  equals: t.field({"required":false,"type":DateTime}),
  in: t.field({"required":false,"type":[DateTime]}),
  notIn: t.field({"required":false,"type":[DateTime]}),
  lt: t.field({"required":false,"type":DateTime}),
  lte: t.field({"required":false,"type":DateTime}),
  gt: t.field({"required":false,"type":DateTime}),
  gte: t.field({"required":false,"type":DateTime}),
  not: t.field({"required":false,"type":NestedDateTimeNullableWithAggregatesFilter}),
  _count: t.field({"required":false,"type":NestedIntNullableFilter}),
  _min: t.field({"required":false,"type":NestedDateTimeNullableFilter}),
  _max: t.field({"required":false,"type":NestedDateTimeNullableFilter}),
});
export const DateTimeNullableWithAggregatesFilter = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.DateTimeNullableWithAggregatesFilter>, false>('DateTimeNullableWithAggregatesFilter').implement({
  fields: DateTimeNullableWithAggregatesFilterFields,
});

export const UserListRelationFilterFields = (t: any) => ({
  every: t.field({"required":false,"type":UserWhereInput}),
  some: t.field({"required":false,"type":UserWhereInput}),
  none: t.field({"required":false,"type":UserWhereInput}),
});
export const UserListRelationFilter = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.UserListRelationFilter>, false>('UserListRelationFilter').implement({
  fields: UserListRelationFilterFields,
});

export const UserOrderByRelationAggregateInputFields = (t: any) => ({
  _count: t.field({"required":false,"type":SortOrder}),
});
export const UserOrderByRelationAggregateInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.UserOrderByRelationAggregateInput>, false>('UserOrderByRelationAggregateInput').implement({
  fields: UserOrderByRelationAggregateInputFields,
});

export const UserStatusCountOrderByAggregateInputFields = (t: any) => ({
  id: t.field({"required":false,"type":SortOrder}),
  createdAt: t.field({"required":false,"type":SortOrder}),
});
export const UserStatusCountOrderByAggregateInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.UserStatusCountOrderByAggregateInput>, false>('UserStatusCountOrderByAggregateInput').implement({
  fields: UserStatusCountOrderByAggregateInputFields,
});

export const UserStatusMaxOrderByAggregateInputFields = (t: any) => ({
  id: t.field({"required":false,"type":SortOrder}),
  createdAt: t.field({"required":false,"type":SortOrder}),
});
export const UserStatusMaxOrderByAggregateInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.UserStatusMaxOrderByAggregateInput>, false>('UserStatusMaxOrderByAggregateInput').implement({
  fields: UserStatusMaxOrderByAggregateInputFields,
});

export const UserStatusMinOrderByAggregateInputFields = (t: any) => ({
  id: t.field({"required":false,"type":SortOrder}),
  createdAt: t.field({"required":false,"type":SortOrder}),
});
export const UserStatusMinOrderByAggregateInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.UserStatusMinOrderByAggregateInput>, false>('UserStatusMinOrderByAggregateInput').implement({
  fields: UserStatusMinOrderByAggregateInputFields,
});

export const AdminCountOrderByAggregateInputFields = (t: any) => ({
  id: t.field({"required":false,"type":SortOrder}),
  email: t.field({"required":false,"type":SortOrder}),
  password: t.field({"required":false,"type":SortOrder}),
});
export const AdminCountOrderByAggregateInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.AdminCountOrderByAggregateInput>, false>('AdminCountOrderByAggregateInput').implement({
  fields: AdminCountOrderByAggregateInputFields,
});

export const AdminMaxOrderByAggregateInputFields = (t: any) => ({
  id: t.field({"required":false,"type":SortOrder}),
  email: t.field({"required":false,"type":SortOrder}),
  password: t.field({"required":false,"type":SortOrder}),
});
export const AdminMaxOrderByAggregateInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.AdminMaxOrderByAggregateInput>, false>('AdminMaxOrderByAggregateInput').implement({
  fields: AdminMaxOrderByAggregateInputFields,
});

export const AdminMinOrderByAggregateInputFields = (t: any) => ({
  id: t.field({"required":false,"type":SortOrder}),
  email: t.field({"required":false,"type":SortOrder}),
  password: t.field({"required":false,"type":SortOrder}),
});
export const AdminMinOrderByAggregateInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.AdminMinOrderByAggregateInput>, false>('AdminMinOrderByAggregateInput').implement({
  fields: AdminMinOrderByAggregateInputFields,
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

export const PostStatusRelationFilterFields = (t: any) => ({
  is: t.field({"required":false,"type":PostStatusWhereInput}),
  isNot: t.field({"required":false,"type":PostStatusWhereInput}),
});
export const PostStatusRelationFilter = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.PostStatusRelationFilter>, false>('PostStatusRelationFilter').implement({
  fields: PostStatusRelationFilterFields,
});

export const AdminNullableRelationFilterFields = (t: any) => ({
  is: t.field({"required":false,"type":AdminWhereInput}),
  isNot: t.field({"required":false,"type":AdminWhereInput}),
});
export const AdminNullableRelationFilter = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.AdminNullableRelationFilter>, false>('AdminNullableRelationFilter').implement({
  fields: AdminNullableRelationFilterFields,
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
  name: t.field({"required":false,"type":SortOrder}),
  createdAt: t.field({"required":false,"type":SortOrder}),
  image: t.field({"required":false,"type":SortOrder}),
  reading: t.field({"required":false,"type":SortOrder}),
  postStatusId: t.field({"required":false,"type":SortOrder}),
  statusChangedById: t.field({"required":false,"type":SortOrder}),
  postedById: t.field({"required":false,"type":SortOrder}),
  notes: t.field({"required":false,"type":SortOrder}),
  size: t.field({"required":false,"type":SortOrder}),
});
export const PostCountOrderByAggregateInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.PostCountOrderByAggregateInput>, false>('PostCountOrderByAggregateInput').implement({
  fields: PostCountOrderByAggregateInputFields,
});

export const PostAvgOrderByAggregateInputFields = (t: any) => ({
  reading: t.field({"required":false,"type":SortOrder}),
  size: t.field({"required":false,"type":SortOrder}),
});
export const PostAvgOrderByAggregateInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.PostAvgOrderByAggregateInput>, false>('PostAvgOrderByAggregateInput').implement({
  fields: PostAvgOrderByAggregateInputFields,
});

export const PostMaxOrderByAggregateInputFields = (t: any) => ({
  id: t.field({"required":false,"type":SortOrder}),
  name: t.field({"required":false,"type":SortOrder}),
  createdAt: t.field({"required":false,"type":SortOrder}),
  image: t.field({"required":false,"type":SortOrder}),
  reading: t.field({"required":false,"type":SortOrder}),
  postStatusId: t.field({"required":false,"type":SortOrder}),
  statusChangedById: t.field({"required":false,"type":SortOrder}),
  postedById: t.field({"required":false,"type":SortOrder}),
  notes: t.field({"required":false,"type":SortOrder}),
  size: t.field({"required":false,"type":SortOrder}),
});
export const PostMaxOrderByAggregateInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.PostMaxOrderByAggregateInput>, false>('PostMaxOrderByAggregateInput').implement({
  fields: PostMaxOrderByAggregateInputFields,
});

export const PostMinOrderByAggregateInputFields = (t: any) => ({
  id: t.field({"required":false,"type":SortOrder}),
  name: t.field({"required":false,"type":SortOrder}),
  createdAt: t.field({"required":false,"type":SortOrder}),
  image: t.field({"required":false,"type":SortOrder}),
  reading: t.field({"required":false,"type":SortOrder}),
  postStatusId: t.field({"required":false,"type":SortOrder}),
  statusChangedById: t.field({"required":false,"type":SortOrder}),
  postedById: t.field({"required":false,"type":SortOrder}),
  notes: t.field({"required":false,"type":SortOrder}),
  size: t.field({"required":false,"type":SortOrder}),
});
export const PostMinOrderByAggregateInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.PostMinOrderByAggregateInput>, false>('PostMinOrderByAggregateInput').implement({
  fields: PostMinOrderByAggregateInputFields,
});

export const PostSumOrderByAggregateInputFields = (t: any) => ({
  reading: t.field({"required":false,"type":SortOrder}),
  size: t.field({"required":false,"type":SortOrder}),
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

export const PostStatusCountOrderByAggregateInputFields = (t: any) => ({
  id: t.field({"required":false,"type":SortOrder}),
  createdAt: t.field({"required":false,"type":SortOrder}),
});
export const PostStatusCountOrderByAggregateInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.PostStatusCountOrderByAggregateInput>, false>('PostStatusCountOrderByAggregateInput').implement({
  fields: PostStatusCountOrderByAggregateInputFields,
});

export const PostStatusMaxOrderByAggregateInputFields = (t: any) => ({
  id: t.field({"required":false,"type":SortOrder}),
  createdAt: t.field({"required":false,"type":SortOrder}),
});
export const PostStatusMaxOrderByAggregateInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.PostStatusMaxOrderByAggregateInput>, false>('PostStatusMaxOrderByAggregateInput').implement({
  fields: PostStatusMaxOrderByAggregateInputFields,
});

export const PostStatusMinOrderByAggregateInputFields = (t: any) => ({
  id: t.field({"required":false,"type":SortOrder}),
  createdAt: t.field({"required":false,"type":SortOrder}),
});
export const PostStatusMinOrderByAggregateInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.PostStatusMinOrderByAggregateInput>, false>('PostStatusMinOrderByAggregateInput').implement({
  fields: PostStatusMinOrderByAggregateInputFields,
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

export const AdminRelationFilterFields = (t: any) => ({
  is: t.field({"required":false,"type":AdminWhereInput}),
  isNot: t.field({"required":false,"type":AdminWhereInput}),
});
export const AdminRelationFilter = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.AdminRelationFilter>, false>('AdminRelationFilter').implement({
  fields: AdminRelationFilterFields,
});

export const InvitationCountOrderByAggregateInputFields = (t: any) => ({
  id: t.field({"required":false,"type":SortOrder}),
  createdAt: t.field({"required":false,"type":SortOrder}),
  sentById: t.field({"required":false,"type":SortOrder}),
  sentToId: t.field({"required":false,"type":SortOrder}),
});
export const InvitationCountOrderByAggregateInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.InvitationCountOrderByAggregateInput>, false>('InvitationCountOrderByAggregateInput').implement({
  fields: InvitationCountOrderByAggregateInputFields,
});

export const InvitationMaxOrderByAggregateInputFields = (t: any) => ({
  id: t.field({"required":false,"type":SortOrder}),
  createdAt: t.field({"required":false,"type":SortOrder}),
  sentById: t.field({"required":false,"type":SortOrder}),
  sentToId: t.field({"required":false,"type":SortOrder}),
});
export const InvitationMaxOrderByAggregateInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.InvitationMaxOrderByAggregateInput>, false>('InvitationMaxOrderByAggregateInput').implement({
  fields: InvitationMaxOrderByAggregateInputFields,
});

export const InvitationMinOrderByAggregateInputFields = (t: any) => ({
  id: t.field({"required":false,"type":SortOrder}),
  createdAt: t.field({"required":false,"type":SortOrder}),
  sentById: t.field({"required":false,"type":SortOrder}),
  sentToId: t.field({"required":false,"type":SortOrder}),
});
export const InvitationMinOrderByAggregateInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.InvitationMinOrderByAggregateInput>, false>('InvitationMinOrderByAggregateInput').implement({
  fields: InvitationMinOrderByAggregateInputFields,
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

export const UserStatusCreateNestedOneWithoutUserInputFields = (t: any) => ({
  create: t.field({"required":false,"type":UserStatusCreateWithoutUserInput}),
  connectOrCreate: t.field({"required":false,"type":UserStatusCreateOrConnectWithoutUserInput}),
  connect: t.field({"required":false,"type":UserStatusWhereUniqueInput}),
});
export const UserStatusCreateNestedOneWithoutUserInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.UserStatusCreateNestedOneWithoutUserInput>, false>('UserStatusCreateNestedOneWithoutUserInput').implement({
  fields: UserStatusCreateNestedOneWithoutUserInputFields,
});

export const InvitationCreateNestedManyWithoutSentToInputFields = (t: any) => ({
  create: t.field({"required":false,"type":[InvitationCreateWithoutSentToInput]}),
  connectOrCreate: t.field({"required":false,"type":[InvitationCreateOrConnectWithoutSentToInput]}),
  createMany: t.field({"required":false,"type":InvitationCreateManySentToInputEnvelope}),
  connect: t.field({"required":false,"type":[InvitationWhereUniqueInput]}),
});
export const InvitationCreateNestedManyWithoutSentToInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.InvitationCreateNestedManyWithoutSentToInput>, false>('InvitationCreateNestedManyWithoutSentToInput').implement({
  fields: InvitationCreateNestedManyWithoutSentToInputFields,
});

export const StringFieldUpdateOperationsInputFields = (t: any) => ({
  set: t.string({"required":false}),
});
export const StringFieldUpdateOperationsInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.StringFieldUpdateOperationsInput>, false>('StringFieldUpdateOperationsInput').implement({
  fields: StringFieldUpdateOperationsInputFields,
});

export const NullableStringFieldUpdateOperationsInputFields = (t: any) => ({
  set: t.string({"required":false}),
});
export const NullableStringFieldUpdateOperationsInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.NullableStringFieldUpdateOperationsInput>, false>('NullableStringFieldUpdateOperationsInput').implement({
  fields: NullableStringFieldUpdateOperationsInputFields,
});

export const DateTimeFieldUpdateOperationsInputFields = (t: any) => ({
  set: t.field({"required":false,"type":DateTime}),
});
export const DateTimeFieldUpdateOperationsInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.DateTimeFieldUpdateOperationsInput>, false>('DateTimeFieldUpdateOperationsInput').implement({
  fields: DateTimeFieldUpdateOperationsInputFields,
});

export const NullableDateTimeFieldUpdateOperationsInputFields = (t: any) => ({
  set: t.field({"required":false,"type":DateTime}),
});
export const NullableDateTimeFieldUpdateOperationsInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.NullableDateTimeFieldUpdateOperationsInput>, false>('NullableDateTimeFieldUpdateOperationsInput').implement({
  fields: NullableDateTimeFieldUpdateOperationsInputFields,
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

export const UserStatusUpdateOneRequiredWithoutUserNestedInputFields = (t: any) => ({
  create: t.field({"required":false,"type":UserStatusCreateWithoutUserInput}),
  connectOrCreate: t.field({"required":false,"type":UserStatusCreateOrConnectWithoutUserInput}),
  upsert: t.field({"required":false,"type":UserStatusUpsertWithoutUserInput}),
  connect: t.field({"required":false,"type":UserStatusWhereUniqueInput}),
  update: t.field({"required":false,"type":UserStatusUpdateToOneWithWhereWithoutUserInput}),
});
export const UserStatusUpdateOneRequiredWithoutUserNestedInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.UserStatusUpdateOneRequiredWithoutUserNestedInput>, false>('UserStatusUpdateOneRequiredWithoutUserNestedInput').implement({
  fields: UserStatusUpdateOneRequiredWithoutUserNestedInputFields,
});

export const InvitationUpdateManyWithoutSentToNestedInputFields = (t: any) => ({
  create: t.field({"required":false,"type":[InvitationCreateWithoutSentToInput]}),
  connectOrCreate: t.field({"required":false,"type":[InvitationCreateOrConnectWithoutSentToInput]}),
  upsert: t.field({"required":false,"type":[InvitationUpsertWithWhereUniqueWithoutSentToInput]}),
  createMany: t.field({"required":false,"type":InvitationCreateManySentToInputEnvelope}),
  set: t.field({"required":false,"type":[InvitationWhereUniqueInput]}),
  disconnect: t.field({"required":false,"type":[InvitationWhereUniqueInput]}),
  delete: t.field({"required":false,"type":[InvitationWhereUniqueInput]}),
  connect: t.field({"required":false,"type":[InvitationWhereUniqueInput]}),
  update: t.field({"required":false,"type":[InvitationUpdateWithWhereUniqueWithoutSentToInput]}),
  updateMany: t.field({"required":false,"type":[InvitationUpdateManyWithWhereWithoutSentToInput]}),
  deleteMany: t.field({"required":false,"type":[InvitationScalarWhereInput]}),
});
export const InvitationUpdateManyWithoutSentToNestedInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.InvitationUpdateManyWithoutSentToNestedInput>, false>('InvitationUpdateManyWithoutSentToNestedInput').implement({
  fields: InvitationUpdateManyWithoutSentToNestedInputFields,
});

export const UserCreateNestedManyWithoutUserStatusInputFields = (t: any) => ({
  create: t.field({"required":false,"type":[UserCreateWithoutUserStatusInput]}),
  connectOrCreate: t.field({"required":false,"type":[UserCreateOrConnectWithoutUserStatusInput]}),
  createMany: t.field({"required":false,"type":UserCreateManyUserStatusInputEnvelope}),
  connect: t.field({"required":false,"type":[UserWhereUniqueInput]}),
});
export const UserCreateNestedManyWithoutUserStatusInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.UserCreateNestedManyWithoutUserStatusInput>, false>('UserCreateNestedManyWithoutUserStatusInput').implement({
  fields: UserCreateNestedManyWithoutUserStatusInputFields,
});

export const UserUpdateManyWithoutUserStatusNestedInputFields = (t: any) => ({
  create: t.field({"required":false,"type":[UserCreateWithoutUserStatusInput]}),
  connectOrCreate: t.field({"required":false,"type":[UserCreateOrConnectWithoutUserStatusInput]}),
  upsert: t.field({"required":false,"type":[UserUpsertWithWhereUniqueWithoutUserStatusInput]}),
  createMany: t.field({"required":false,"type":UserCreateManyUserStatusInputEnvelope}),
  set: t.field({"required":false,"type":[UserWhereUniqueInput]}),
  disconnect: t.field({"required":false,"type":[UserWhereUniqueInput]}),
  delete: t.field({"required":false,"type":[UserWhereUniqueInput]}),
  connect: t.field({"required":false,"type":[UserWhereUniqueInput]}),
  update: t.field({"required":false,"type":[UserUpdateWithWhereUniqueWithoutUserStatusInput]}),
  updateMany: t.field({"required":false,"type":[UserUpdateManyWithWhereWithoutUserStatusInput]}),
  deleteMany: t.field({"required":false,"type":[UserScalarWhereInput]}),
});
export const UserUpdateManyWithoutUserStatusNestedInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.UserUpdateManyWithoutUserStatusNestedInput>, false>('UserUpdateManyWithoutUserStatusNestedInput').implement({
  fields: UserUpdateManyWithoutUserStatusNestedInputFields,
});

export const PostCreateNestedManyWithoutStatusChangedByInputFields = (t: any) => ({
  create: t.field({"required":false,"type":[PostCreateWithoutStatusChangedByInput]}),
  connectOrCreate: t.field({"required":false,"type":[PostCreateOrConnectWithoutStatusChangedByInput]}),
  createMany: t.field({"required":false,"type":PostCreateManyStatusChangedByInputEnvelope}),
  connect: t.field({"required":false,"type":[PostWhereUniqueInput]}),
});
export const PostCreateNestedManyWithoutStatusChangedByInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.PostCreateNestedManyWithoutStatusChangedByInput>, false>('PostCreateNestedManyWithoutStatusChangedByInput').implement({
  fields: PostCreateNestedManyWithoutStatusChangedByInputFields,
});

export const InvitationCreateNestedManyWithoutSentByInputFields = (t: any) => ({
  create: t.field({"required":false,"type":[InvitationCreateWithoutSentByInput]}),
  connectOrCreate: t.field({"required":false,"type":[InvitationCreateOrConnectWithoutSentByInput]}),
  createMany: t.field({"required":false,"type":InvitationCreateManySentByInputEnvelope}),
  connect: t.field({"required":false,"type":[InvitationWhereUniqueInput]}),
});
export const InvitationCreateNestedManyWithoutSentByInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.InvitationCreateNestedManyWithoutSentByInput>, false>('InvitationCreateNestedManyWithoutSentByInput').implement({
  fields: InvitationCreateNestedManyWithoutSentByInputFields,
});

export const PostUpdateManyWithoutStatusChangedByNestedInputFields = (t: any) => ({
  create: t.field({"required":false,"type":[PostCreateWithoutStatusChangedByInput]}),
  connectOrCreate: t.field({"required":false,"type":[PostCreateOrConnectWithoutStatusChangedByInput]}),
  upsert: t.field({"required":false,"type":[PostUpsertWithWhereUniqueWithoutStatusChangedByInput]}),
  createMany: t.field({"required":false,"type":PostCreateManyStatusChangedByInputEnvelope}),
  set: t.field({"required":false,"type":[PostWhereUniqueInput]}),
  disconnect: t.field({"required":false,"type":[PostWhereUniqueInput]}),
  delete: t.field({"required":false,"type":[PostWhereUniqueInput]}),
  connect: t.field({"required":false,"type":[PostWhereUniqueInput]}),
  update: t.field({"required":false,"type":[PostUpdateWithWhereUniqueWithoutStatusChangedByInput]}),
  updateMany: t.field({"required":false,"type":[PostUpdateManyWithWhereWithoutStatusChangedByInput]}),
  deleteMany: t.field({"required":false,"type":[PostScalarWhereInput]}),
});
export const PostUpdateManyWithoutStatusChangedByNestedInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.PostUpdateManyWithoutStatusChangedByNestedInput>, false>('PostUpdateManyWithoutStatusChangedByNestedInput').implement({
  fields: PostUpdateManyWithoutStatusChangedByNestedInputFields,
});

export const InvitationUpdateManyWithoutSentByNestedInputFields = (t: any) => ({
  create: t.field({"required":false,"type":[InvitationCreateWithoutSentByInput]}),
  connectOrCreate: t.field({"required":false,"type":[InvitationCreateOrConnectWithoutSentByInput]}),
  upsert: t.field({"required":false,"type":[InvitationUpsertWithWhereUniqueWithoutSentByInput]}),
  createMany: t.field({"required":false,"type":InvitationCreateManySentByInputEnvelope}),
  set: t.field({"required":false,"type":[InvitationWhereUniqueInput]}),
  disconnect: t.field({"required":false,"type":[InvitationWhereUniqueInput]}),
  delete: t.field({"required":false,"type":[InvitationWhereUniqueInput]}),
  connect: t.field({"required":false,"type":[InvitationWhereUniqueInput]}),
  update: t.field({"required":false,"type":[InvitationUpdateWithWhereUniqueWithoutSentByInput]}),
  updateMany: t.field({"required":false,"type":[InvitationUpdateManyWithWhereWithoutSentByInput]}),
  deleteMany: t.field({"required":false,"type":[InvitationScalarWhereInput]}),
});
export const InvitationUpdateManyWithoutSentByNestedInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.InvitationUpdateManyWithoutSentByNestedInput>, false>('InvitationUpdateManyWithoutSentByNestedInput').implement({
  fields: InvitationUpdateManyWithoutSentByNestedInputFields,
});

export const PostStatusCreateNestedOneWithoutPostInputFields = (t: any) => ({
  create: t.field({"required":false,"type":PostStatusCreateWithoutPostInput}),
  connectOrCreate: t.field({"required":false,"type":PostStatusCreateOrConnectWithoutPostInput}),
  connect: t.field({"required":false,"type":PostStatusWhereUniqueInput}),
});
export const PostStatusCreateNestedOneWithoutPostInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.PostStatusCreateNestedOneWithoutPostInput>, false>('PostStatusCreateNestedOneWithoutPostInput').implement({
  fields: PostStatusCreateNestedOneWithoutPostInputFields,
});

export const AdminCreateNestedOneWithoutPostInputFields = (t: any) => ({
  create: t.field({"required":false,"type":AdminCreateWithoutPostInput}),
  connectOrCreate: t.field({"required":false,"type":AdminCreateOrConnectWithoutPostInput}),
  connect: t.field({"required":false,"type":AdminWhereUniqueInput}),
});
export const AdminCreateNestedOneWithoutPostInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.AdminCreateNestedOneWithoutPostInput>, false>('AdminCreateNestedOneWithoutPostInput').implement({
  fields: AdminCreateNestedOneWithoutPostInputFields,
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

export const AdminUpdateOneWithoutPostNestedInputFields = (t: any) => ({
  create: t.field({"required":false,"type":AdminCreateWithoutPostInput}),
  connectOrCreate: t.field({"required":false,"type":AdminCreateOrConnectWithoutPostInput}),
  upsert: t.field({"required":false,"type":AdminUpsertWithoutPostInput}),
  disconnect: t.field({"required":false,"type":AdminWhereInput}),
  delete: t.field({"required":false,"type":AdminWhereInput}),
  connect: t.field({"required":false,"type":AdminWhereUniqueInput}),
  update: t.field({"required":false,"type":AdminUpdateToOneWithWhereWithoutPostInput}),
});
export const AdminUpdateOneWithoutPostNestedInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.AdminUpdateOneWithoutPostNestedInput>, false>('AdminUpdateOneWithoutPostNestedInput').implement({
  fields: AdminUpdateOneWithoutPostNestedInputFields,
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

export const AdminCreateNestedOneWithoutInvitationInputFields = (t: any) => ({
  create: t.field({"required":false,"type":AdminCreateWithoutInvitationInput}),
  connectOrCreate: t.field({"required":false,"type":AdminCreateOrConnectWithoutInvitationInput}),
  connect: t.field({"required":false,"type":AdminWhereUniqueInput}),
});
export const AdminCreateNestedOneWithoutInvitationInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.AdminCreateNestedOneWithoutInvitationInput>, false>('AdminCreateNestedOneWithoutInvitationInput').implement({
  fields: AdminCreateNestedOneWithoutInvitationInputFields,
});

export const UserCreateNestedOneWithoutInvitationsInputFields = (t: any) => ({
  create: t.field({"required":false,"type":UserCreateWithoutInvitationsInput}),
  connectOrCreate: t.field({"required":false,"type":UserCreateOrConnectWithoutInvitationsInput}),
  connect: t.field({"required":false,"type":UserWhereUniqueInput}),
});
export const UserCreateNestedOneWithoutInvitationsInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.UserCreateNestedOneWithoutInvitationsInput>, false>('UserCreateNestedOneWithoutInvitationsInput').implement({
  fields: UserCreateNestedOneWithoutInvitationsInputFields,
});

export const AdminUpdateOneRequiredWithoutInvitationNestedInputFields = (t: any) => ({
  create: t.field({"required":false,"type":AdminCreateWithoutInvitationInput}),
  connectOrCreate: t.field({"required":false,"type":AdminCreateOrConnectWithoutInvitationInput}),
  upsert: t.field({"required":false,"type":AdminUpsertWithoutInvitationInput}),
  connect: t.field({"required":false,"type":AdminWhereUniqueInput}),
  update: t.field({"required":false,"type":AdminUpdateToOneWithWhereWithoutInvitationInput}),
});
export const AdminUpdateOneRequiredWithoutInvitationNestedInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.AdminUpdateOneRequiredWithoutInvitationNestedInput>, false>('AdminUpdateOneRequiredWithoutInvitationNestedInput').implement({
  fields: AdminUpdateOneRequiredWithoutInvitationNestedInputFields,
});

export const UserUpdateOneRequiredWithoutInvitationsNestedInputFields = (t: any) => ({
  create: t.field({"required":false,"type":UserCreateWithoutInvitationsInput}),
  connectOrCreate: t.field({"required":false,"type":UserCreateOrConnectWithoutInvitationsInput}),
  upsert: t.field({"required":false,"type":UserUpsertWithoutInvitationsInput}),
  connect: t.field({"required":false,"type":UserWhereUniqueInput}),
  update: t.field({"required":false,"type":UserUpdateToOneWithWhereWithoutInvitationsInput}),
});
export const UserUpdateOneRequiredWithoutInvitationsNestedInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.UserUpdateOneRequiredWithoutInvitationsNestedInput>, false>('UserUpdateOneRequiredWithoutInvitationsNestedInput').implement({
  fields: UserUpdateOneRequiredWithoutInvitationsNestedInputFields,
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

export const NestedDateTimeNullableFilterFields = (t: any) => ({
  equals: t.field({"required":false,"type":DateTime}),
  in: t.field({"required":false,"type":[DateTime]}),
  notIn: t.field({"required":false,"type":[DateTime]}),
  lt: t.field({"required":false,"type":DateTime}),
  lte: t.field({"required":false,"type":DateTime}),
  gt: t.field({"required":false,"type":DateTime}),
  gte: t.field({"required":false,"type":DateTime}),
  not: t.field({"required":false,"type":NestedDateTimeNullableFilter}),
});
export const NestedDateTimeNullableFilter = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.NestedDateTimeNullableFilter>, false>('NestedDateTimeNullableFilter').implement({
  fields: NestedDateTimeNullableFilterFields,
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

export const NestedDateTimeNullableWithAggregatesFilterFields = (t: any) => ({
  equals: t.field({"required":false,"type":DateTime}),
  in: t.field({"required":false,"type":[DateTime]}),
  notIn: t.field({"required":false,"type":[DateTime]}),
  lt: t.field({"required":false,"type":DateTime}),
  lte: t.field({"required":false,"type":DateTime}),
  gt: t.field({"required":false,"type":DateTime}),
  gte: t.field({"required":false,"type":DateTime}),
  not: t.field({"required":false,"type":NestedDateTimeNullableWithAggregatesFilter}),
  _count: t.field({"required":false,"type":NestedIntNullableFilter}),
  _min: t.field({"required":false,"type":NestedDateTimeNullableFilter}),
  _max: t.field({"required":false,"type":NestedDateTimeNullableFilter}),
});
export const NestedDateTimeNullableWithAggregatesFilter = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.NestedDateTimeNullableWithAggregatesFilter>, false>('NestedDateTimeNullableWithAggregatesFilter').implement({
  fields: NestedDateTimeNullableWithAggregatesFilterFields,
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
  name: t.string({"required":true}),
  createdAt: t.field({"required":false,"type":DateTime}),
  image: t.field({"required":true,"type":Bytes}),
  reading: t.float({"required":false}),
  notes: t.string({"required":false}),
  size: t.float({"required":false}),
  postStatus: t.field({"required":true,"type":PostStatusCreateNestedOneWithoutPostInput}),
  statusChangedBy: t.field({"required":false,"type":AdminCreateNestedOneWithoutPostInput}),
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

export const UserStatusCreateWithoutUserInputFields = (t: any) => ({
  id: t.string({"required":true}),
  createdAt: t.field({"required":false,"type":DateTime}),
});
export const UserStatusCreateWithoutUserInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.UserStatusCreateWithoutUserInput>, false>('UserStatusCreateWithoutUserInput').implement({
  fields: UserStatusCreateWithoutUserInputFields,
});

export const UserStatusCreateOrConnectWithoutUserInputFields = (t: any) => ({
  where: t.field({"required":true,"type":UserStatusWhereUniqueInput}),
  create: t.field({"required":true,"type":UserStatusCreateWithoutUserInput}),
});
export const UserStatusCreateOrConnectWithoutUserInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.UserStatusCreateOrConnectWithoutUserInput>, false>('UserStatusCreateOrConnectWithoutUserInput').implement({
  fields: UserStatusCreateOrConnectWithoutUserInputFields,
});

export const InvitationCreateWithoutSentToInputFields = (t: any) => ({
  id: t.string({"required":false}),
  createdAt: t.field({"required":false,"type":DateTime}),
  sentBy: t.field({"required":true,"type":AdminCreateNestedOneWithoutInvitationInput}),
});
export const InvitationCreateWithoutSentToInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.InvitationCreateWithoutSentToInput>, false>('InvitationCreateWithoutSentToInput').implement({
  fields: InvitationCreateWithoutSentToInputFields,
});

export const InvitationCreateOrConnectWithoutSentToInputFields = (t: any) => ({
  where: t.field({"required":true,"type":InvitationWhereUniqueInput}),
  create: t.field({"required":true,"type":InvitationCreateWithoutSentToInput}),
});
export const InvitationCreateOrConnectWithoutSentToInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.InvitationCreateOrConnectWithoutSentToInput>, false>('InvitationCreateOrConnectWithoutSentToInput').implement({
  fields: InvitationCreateOrConnectWithoutSentToInputFields,
});

export const InvitationCreateManySentToInputEnvelopeFields = (t: any) => ({
  data: t.field({"required":true,"type":[InvitationCreateManySentToInput]}),
});
export const InvitationCreateManySentToInputEnvelope = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.InvitationCreateManySentToInputEnvelope>, false>('InvitationCreateManySentToInputEnvelope').implement({
  fields: InvitationCreateManySentToInputEnvelopeFields,
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
  name: t.field({"required":false,"type":StringFilter}),
  createdAt: t.field({"required":false,"type":DateTimeFilter}),
  image: t.field({"required":false,"type":BytesFilter}),
  reading: t.field({"required":false,"type":FloatFilter}),
  postStatusId: t.field({"required":false,"type":StringFilter}),
  statusChangedById: t.field({"required":false,"type":StringNullableFilter}),
  postedById: t.field({"required":false,"type":StringFilter}),
  notes: t.field({"required":false,"type":StringNullableFilter}),
  size: t.field({"required":false,"type":FloatFilter}),
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

export const UserStatusUpsertWithoutUserInputFields = (t: any) => ({
  update: t.field({"required":true,"type":UserStatusUpdateWithoutUserInput}),
  create: t.field({"required":true,"type":UserStatusCreateWithoutUserInput}),
  where: t.field({"required":false,"type":UserStatusWhereInput}),
});
export const UserStatusUpsertWithoutUserInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.UserStatusUpsertWithoutUserInput>, false>('UserStatusUpsertWithoutUserInput').implement({
  fields: UserStatusUpsertWithoutUserInputFields,
});

export const UserStatusUpdateToOneWithWhereWithoutUserInputFields = (t: any) => ({
  where: t.field({"required":false,"type":UserStatusWhereInput}),
  data: t.field({"required":true,"type":UserStatusUpdateWithoutUserInput}),
});
export const UserStatusUpdateToOneWithWhereWithoutUserInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.UserStatusUpdateToOneWithWhereWithoutUserInput>, false>('UserStatusUpdateToOneWithWhereWithoutUserInput').implement({
  fields: UserStatusUpdateToOneWithWhereWithoutUserInputFields,
});

export const UserStatusUpdateWithoutUserInputFields = (t: any) => ({
  id: t.field({"required":false,"type":StringFieldUpdateOperationsInput}),
  createdAt: t.field({"required":false,"type":DateTimeFieldUpdateOperationsInput}),
});
export const UserStatusUpdateWithoutUserInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.UserStatusUpdateWithoutUserInput>, false>('UserStatusUpdateWithoutUserInput').implement({
  fields: UserStatusUpdateWithoutUserInputFields,
});

export const InvitationUpsertWithWhereUniqueWithoutSentToInputFields = (t: any) => ({
  where: t.field({"required":true,"type":InvitationWhereUniqueInput}),
  update: t.field({"required":true,"type":InvitationUpdateWithoutSentToInput}),
  create: t.field({"required":true,"type":InvitationCreateWithoutSentToInput}),
});
export const InvitationUpsertWithWhereUniqueWithoutSentToInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.InvitationUpsertWithWhereUniqueWithoutSentToInput>, false>('InvitationUpsertWithWhereUniqueWithoutSentToInput').implement({
  fields: InvitationUpsertWithWhereUniqueWithoutSentToInputFields,
});

export const InvitationUpdateWithWhereUniqueWithoutSentToInputFields = (t: any) => ({
  where: t.field({"required":true,"type":InvitationWhereUniqueInput}),
  data: t.field({"required":true,"type":InvitationUpdateWithoutSentToInput}),
});
export const InvitationUpdateWithWhereUniqueWithoutSentToInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.InvitationUpdateWithWhereUniqueWithoutSentToInput>, false>('InvitationUpdateWithWhereUniqueWithoutSentToInput').implement({
  fields: InvitationUpdateWithWhereUniqueWithoutSentToInputFields,
});

export const InvitationUpdateManyWithWhereWithoutSentToInputFields = (t: any) => ({
  where: t.field({"required":true,"type":InvitationScalarWhereInput}),
  data: t.field({"required":true,"type":InvitationUpdateManyMutationInput}),
});
export const InvitationUpdateManyWithWhereWithoutSentToInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.InvitationUpdateManyWithWhereWithoutSentToInput>, false>('InvitationUpdateManyWithWhereWithoutSentToInput').implement({
  fields: InvitationUpdateManyWithWhereWithoutSentToInputFields,
});

export const InvitationScalarWhereInputFields = (t: any) => ({
  AND: t.field({"required":false,"type":[InvitationScalarWhereInput]}),
  OR: t.field({"required":false,"type":[InvitationScalarWhereInput]}),
  NOT: t.field({"required":false,"type":[InvitationScalarWhereInput]}),
  id: t.field({"required":false,"type":StringFilter}),
  createdAt: t.field({"required":false,"type":DateTimeFilter}),
  sentById: t.field({"required":false,"type":StringFilter}),
  sentToId: t.field({"required":false,"type":StringFilter}),
});
export const InvitationScalarWhereInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.InvitationScalarWhereInput>, false>('InvitationScalarWhereInput').implement({
  fields: InvitationScalarWhereInputFields,
});

export const UserCreateWithoutUserStatusInputFields = (t: any) => ({
  id: t.string({"required":false}),
  email: t.string({"required":false}),
  createdAt: t.field({"required":false,"type":DateTime}),
  updatedAt: t.field({"required":false,"type":DateTime}),
  activatedAt: t.field({"required":false,"type":DateTime}),
  deletedAt: t.field({"required":false,"type":DateTime}),
  phoneNumber: t.string({"required":false}),
  accessCode: t.string({"required":true}),
  posts: t.field({"required":false,"type":PostCreateNestedManyWithoutPostedByInput}),
  participation: t.field({"required":false,"type":ParticipationCreateNestedOneWithoutUserInput}),
  invitations: t.field({"required":false,"type":InvitationCreateNestedManyWithoutSentToInput}),
});
export const UserCreateWithoutUserStatusInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.UserCreateWithoutUserStatusInput>, false>('UserCreateWithoutUserStatusInput').implement({
  fields: UserCreateWithoutUserStatusInputFields,
});

export const UserCreateOrConnectWithoutUserStatusInputFields = (t: any) => ({
  where: t.field({"required":true,"type":UserWhereUniqueInput}),
  create: t.field({"required":true,"type":UserCreateWithoutUserStatusInput}),
});
export const UserCreateOrConnectWithoutUserStatusInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.UserCreateOrConnectWithoutUserStatusInput>, false>('UserCreateOrConnectWithoutUserStatusInput').implement({
  fields: UserCreateOrConnectWithoutUserStatusInputFields,
});

export const UserCreateManyUserStatusInputEnvelopeFields = (t: any) => ({
  data: t.field({"required":true,"type":[UserCreateManyUserStatusInput]}),
});
export const UserCreateManyUserStatusInputEnvelope = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.UserCreateManyUserStatusInputEnvelope>, false>('UserCreateManyUserStatusInputEnvelope').implement({
  fields: UserCreateManyUserStatusInputEnvelopeFields,
});

export const UserUpsertWithWhereUniqueWithoutUserStatusInputFields = (t: any) => ({
  where: t.field({"required":true,"type":UserWhereUniqueInput}),
  update: t.field({"required":true,"type":UserUpdateWithoutUserStatusInput}),
  create: t.field({"required":true,"type":UserCreateWithoutUserStatusInput}),
});
export const UserUpsertWithWhereUniqueWithoutUserStatusInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.UserUpsertWithWhereUniqueWithoutUserStatusInput>, false>('UserUpsertWithWhereUniqueWithoutUserStatusInput').implement({
  fields: UserUpsertWithWhereUniqueWithoutUserStatusInputFields,
});

export const UserUpdateWithWhereUniqueWithoutUserStatusInputFields = (t: any) => ({
  where: t.field({"required":true,"type":UserWhereUniqueInput}),
  data: t.field({"required":true,"type":UserUpdateWithoutUserStatusInput}),
});
export const UserUpdateWithWhereUniqueWithoutUserStatusInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.UserUpdateWithWhereUniqueWithoutUserStatusInput>, false>('UserUpdateWithWhereUniqueWithoutUserStatusInput').implement({
  fields: UserUpdateWithWhereUniqueWithoutUserStatusInputFields,
});

export const UserUpdateManyWithWhereWithoutUserStatusInputFields = (t: any) => ({
  where: t.field({"required":true,"type":UserScalarWhereInput}),
  data: t.field({"required":true,"type":UserUpdateManyMutationInput}),
});
export const UserUpdateManyWithWhereWithoutUserStatusInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.UserUpdateManyWithWhereWithoutUserStatusInput>, false>('UserUpdateManyWithWhereWithoutUserStatusInput').implement({
  fields: UserUpdateManyWithWhereWithoutUserStatusInputFields,
});

export const UserScalarWhereInputFields = (t: any) => ({
  AND: t.field({"required":false,"type":[UserScalarWhereInput]}),
  OR: t.field({"required":false,"type":[UserScalarWhereInput]}),
  NOT: t.field({"required":false,"type":[UserScalarWhereInput]}),
  id: t.field({"required":false,"type":StringFilter}),
  email: t.field({"required":false,"type":StringNullableFilter}),
  createdAt: t.field({"required":false,"type":DateTimeFilter}),
  updatedAt: t.field({"required":false,"type":DateTimeFilter}),
  activatedAt: t.field({"required":false,"type":DateTimeNullableFilter}),
  deletedAt: t.field({"required":false,"type":DateTimeNullableFilter}),
  phoneNumber: t.field({"required":false,"type":StringFilter}),
  accessCode: t.field({"required":false,"type":StringFilter}),
  userStatusId: t.field({"required":false,"type":StringFilter}),
});
export const UserScalarWhereInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.UserScalarWhereInput>, false>('UserScalarWhereInput').implement({
  fields: UserScalarWhereInputFields,
});

export const PostCreateWithoutStatusChangedByInputFields = (t: any) => ({
  id: t.string({"required":false}),
  name: t.string({"required":true}),
  createdAt: t.field({"required":false,"type":DateTime}),
  image: t.field({"required":true,"type":Bytes}),
  reading: t.float({"required":false}),
  notes: t.string({"required":false}),
  size: t.float({"required":false}),
  postStatus: t.field({"required":true,"type":PostStatusCreateNestedOneWithoutPostInput}),
  postedBy: t.field({"required":true,"type":UserCreateNestedOneWithoutPostsInput}),
});
export const PostCreateWithoutStatusChangedByInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.PostCreateWithoutStatusChangedByInput>, false>('PostCreateWithoutStatusChangedByInput').implement({
  fields: PostCreateWithoutStatusChangedByInputFields,
});

export const PostCreateOrConnectWithoutStatusChangedByInputFields = (t: any) => ({
  where: t.field({"required":true,"type":PostWhereUniqueInput}),
  create: t.field({"required":true,"type":PostCreateWithoutStatusChangedByInput}),
});
export const PostCreateOrConnectWithoutStatusChangedByInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.PostCreateOrConnectWithoutStatusChangedByInput>, false>('PostCreateOrConnectWithoutStatusChangedByInput').implement({
  fields: PostCreateOrConnectWithoutStatusChangedByInputFields,
});

export const PostCreateManyStatusChangedByInputEnvelopeFields = (t: any) => ({
  data: t.field({"required":true,"type":[PostCreateManyStatusChangedByInput]}),
});
export const PostCreateManyStatusChangedByInputEnvelope = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.PostCreateManyStatusChangedByInputEnvelope>, false>('PostCreateManyStatusChangedByInputEnvelope').implement({
  fields: PostCreateManyStatusChangedByInputEnvelopeFields,
});

export const InvitationCreateWithoutSentByInputFields = (t: any) => ({
  id: t.string({"required":false}),
  createdAt: t.field({"required":false,"type":DateTime}),
  sentTo: t.field({"required":true,"type":UserCreateNestedOneWithoutInvitationsInput}),
});
export const InvitationCreateWithoutSentByInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.InvitationCreateWithoutSentByInput>, false>('InvitationCreateWithoutSentByInput').implement({
  fields: InvitationCreateWithoutSentByInputFields,
});

export const InvitationCreateOrConnectWithoutSentByInputFields = (t: any) => ({
  where: t.field({"required":true,"type":InvitationWhereUniqueInput}),
  create: t.field({"required":true,"type":InvitationCreateWithoutSentByInput}),
});
export const InvitationCreateOrConnectWithoutSentByInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.InvitationCreateOrConnectWithoutSentByInput>, false>('InvitationCreateOrConnectWithoutSentByInput').implement({
  fields: InvitationCreateOrConnectWithoutSentByInputFields,
});

export const InvitationCreateManySentByInputEnvelopeFields = (t: any) => ({
  data: t.field({"required":true,"type":[InvitationCreateManySentByInput]}),
});
export const InvitationCreateManySentByInputEnvelope = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.InvitationCreateManySentByInputEnvelope>, false>('InvitationCreateManySentByInputEnvelope').implement({
  fields: InvitationCreateManySentByInputEnvelopeFields,
});

export const PostUpsertWithWhereUniqueWithoutStatusChangedByInputFields = (t: any) => ({
  where: t.field({"required":true,"type":PostWhereUniqueInput}),
  update: t.field({"required":true,"type":PostUpdateWithoutStatusChangedByInput}),
  create: t.field({"required":true,"type":PostCreateWithoutStatusChangedByInput}),
});
export const PostUpsertWithWhereUniqueWithoutStatusChangedByInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.PostUpsertWithWhereUniqueWithoutStatusChangedByInput>, false>('PostUpsertWithWhereUniqueWithoutStatusChangedByInput').implement({
  fields: PostUpsertWithWhereUniqueWithoutStatusChangedByInputFields,
});

export const PostUpdateWithWhereUniqueWithoutStatusChangedByInputFields = (t: any) => ({
  where: t.field({"required":true,"type":PostWhereUniqueInput}),
  data: t.field({"required":true,"type":PostUpdateWithoutStatusChangedByInput}),
});
export const PostUpdateWithWhereUniqueWithoutStatusChangedByInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.PostUpdateWithWhereUniqueWithoutStatusChangedByInput>, false>('PostUpdateWithWhereUniqueWithoutStatusChangedByInput').implement({
  fields: PostUpdateWithWhereUniqueWithoutStatusChangedByInputFields,
});

export const PostUpdateManyWithWhereWithoutStatusChangedByInputFields = (t: any) => ({
  where: t.field({"required":true,"type":PostScalarWhereInput}),
  data: t.field({"required":true,"type":PostUpdateManyMutationInput}),
});
export const PostUpdateManyWithWhereWithoutStatusChangedByInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.PostUpdateManyWithWhereWithoutStatusChangedByInput>, false>('PostUpdateManyWithWhereWithoutStatusChangedByInput').implement({
  fields: PostUpdateManyWithWhereWithoutStatusChangedByInputFields,
});

export const InvitationUpsertWithWhereUniqueWithoutSentByInputFields = (t: any) => ({
  where: t.field({"required":true,"type":InvitationWhereUniqueInput}),
  update: t.field({"required":true,"type":InvitationUpdateWithoutSentByInput}),
  create: t.field({"required":true,"type":InvitationCreateWithoutSentByInput}),
});
export const InvitationUpsertWithWhereUniqueWithoutSentByInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.InvitationUpsertWithWhereUniqueWithoutSentByInput>, false>('InvitationUpsertWithWhereUniqueWithoutSentByInput').implement({
  fields: InvitationUpsertWithWhereUniqueWithoutSentByInputFields,
});

export const InvitationUpdateWithWhereUniqueWithoutSentByInputFields = (t: any) => ({
  where: t.field({"required":true,"type":InvitationWhereUniqueInput}),
  data: t.field({"required":true,"type":InvitationUpdateWithoutSentByInput}),
});
export const InvitationUpdateWithWhereUniqueWithoutSentByInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.InvitationUpdateWithWhereUniqueWithoutSentByInput>, false>('InvitationUpdateWithWhereUniqueWithoutSentByInput').implement({
  fields: InvitationUpdateWithWhereUniqueWithoutSentByInputFields,
});

export const InvitationUpdateManyWithWhereWithoutSentByInputFields = (t: any) => ({
  where: t.field({"required":true,"type":InvitationScalarWhereInput}),
  data: t.field({"required":true,"type":InvitationUpdateManyMutationInput}),
});
export const InvitationUpdateManyWithWhereWithoutSentByInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.InvitationUpdateManyWithWhereWithoutSentByInput>, false>('InvitationUpdateManyWithWhereWithoutSentByInput').implement({
  fields: InvitationUpdateManyWithWhereWithoutSentByInputFields,
});

export const PostStatusCreateWithoutPostInputFields = (t: any) => ({
  id: t.string({"required":true}),
  createdAt: t.field({"required":false,"type":DateTime}),
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

export const AdminCreateWithoutPostInputFields = (t: any) => ({
  id: t.string({"required":false}),
  email: t.string({"required":true}),
  password: t.string({"required":true}),
  invitation: t.field({"required":false,"type":InvitationCreateNestedManyWithoutSentByInput}),
});
export const AdminCreateWithoutPostInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.AdminCreateWithoutPostInput>, false>('AdminCreateWithoutPostInput').implement({
  fields: AdminCreateWithoutPostInputFields,
});

export const AdminCreateOrConnectWithoutPostInputFields = (t: any) => ({
  where: t.field({"required":true,"type":AdminWhereUniqueInput}),
  create: t.field({"required":true,"type":AdminCreateWithoutPostInput}),
});
export const AdminCreateOrConnectWithoutPostInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.AdminCreateOrConnectWithoutPostInput>, false>('AdminCreateOrConnectWithoutPostInput').implement({
  fields: AdminCreateOrConnectWithoutPostInputFields,
});

export const UserCreateWithoutPostsInputFields = (t: any) => ({
  id: t.string({"required":false}),
  email: t.string({"required":false}),
  createdAt: t.field({"required":false,"type":DateTime}),
  updatedAt: t.field({"required":false,"type":DateTime}),
  activatedAt: t.field({"required":false,"type":DateTime}),
  deletedAt: t.field({"required":false,"type":DateTime}),
  phoneNumber: t.string({"required":false}),
  accessCode: t.string({"required":true}),
  participation: t.field({"required":false,"type":ParticipationCreateNestedOneWithoutUserInput}),
  userStatus: t.field({"required":false,"type":UserStatusCreateNestedOneWithoutUserInput}),
  invitations: t.field({"required":false,"type":InvitationCreateNestedManyWithoutSentToInput}),
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
});
export const PostStatusUpdateWithoutPostInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.PostStatusUpdateWithoutPostInput>, false>('PostStatusUpdateWithoutPostInput').implement({
  fields: PostStatusUpdateWithoutPostInputFields,
});

export const AdminUpsertWithoutPostInputFields = (t: any) => ({
  update: t.field({"required":true,"type":AdminUpdateWithoutPostInput}),
  create: t.field({"required":true,"type":AdminCreateWithoutPostInput}),
  where: t.field({"required":false,"type":AdminWhereInput}),
});
export const AdminUpsertWithoutPostInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.AdminUpsertWithoutPostInput>, false>('AdminUpsertWithoutPostInput').implement({
  fields: AdminUpsertWithoutPostInputFields,
});

export const AdminUpdateToOneWithWhereWithoutPostInputFields = (t: any) => ({
  where: t.field({"required":false,"type":AdminWhereInput}),
  data: t.field({"required":true,"type":AdminUpdateWithoutPostInput}),
});
export const AdminUpdateToOneWithWhereWithoutPostInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.AdminUpdateToOneWithWhereWithoutPostInput>, false>('AdminUpdateToOneWithWhereWithoutPostInput').implement({
  fields: AdminUpdateToOneWithWhereWithoutPostInputFields,
});

export const AdminUpdateWithoutPostInputFields = (t: any) => ({
  id: t.field({"required":false,"type":StringFieldUpdateOperationsInput}),
  email: t.field({"required":false,"type":StringFieldUpdateOperationsInput}),
  password: t.field({"required":false,"type":StringFieldUpdateOperationsInput}),
  invitation: t.field({"required":false,"type":InvitationUpdateManyWithoutSentByNestedInput}),
});
export const AdminUpdateWithoutPostInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.AdminUpdateWithoutPostInput>, false>('AdminUpdateWithoutPostInput').implement({
  fields: AdminUpdateWithoutPostInputFields,
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
  email: t.field({"required":false,"type":NullableStringFieldUpdateOperationsInput}),
  createdAt: t.field({"required":false,"type":DateTimeFieldUpdateOperationsInput}),
  updatedAt: t.field({"required":false,"type":DateTimeFieldUpdateOperationsInput}),
  activatedAt: t.field({"required":false,"type":NullableDateTimeFieldUpdateOperationsInput}),
  deletedAt: t.field({"required":false,"type":NullableDateTimeFieldUpdateOperationsInput}),
  phoneNumber: t.field({"required":false,"type":StringFieldUpdateOperationsInput}),
  accessCode: t.field({"required":false,"type":StringFieldUpdateOperationsInput}),
  participation: t.field({"required":false,"type":ParticipationUpdateOneWithoutUserNestedInput}),
  userStatus: t.field({"required":false,"type":UserStatusUpdateOneRequiredWithoutUserNestedInput}),
  invitations: t.field({"required":false,"type":InvitationUpdateManyWithoutSentToNestedInput}),
});
export const UserUpdateWithoutPostsInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.UserUpdateWithoutPostsInput>, false>('UserUpdateWithoutPostsInput').implement({
  fields: UserUpdateWithoutPostsInputFields,
});

export const PostCreateWithoutPostStatusInputFields = (t: any) => ({
  id: t.string({"required":false}),
  name: t.string({"required":true}),
  createdAt: t.field({"required":false,"type":DateTime}),
  image: t.field({"required":true,"type":Bytes}),
  reading: t.float({"required":false}),
  notes: t.string({"required":false}),
  size: t.float({"required":false}),
  statusChangedBy: t.field({"required":false,"type":AdminCreateNestedOneWithoutPostInput}),
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
  email: t.string({"required":false}),
  createdAt: t.field({"required":false,"type":DateTime}),
  updatedAt: t.field({"required":false,"type":DateTime}),
  activatedAt: t.field({"required":false,"type":DateTime}),
  deletedAt: t.field({"required":false,"type":DateTime}),
  phoneNumber: t.string({"required":false}),
  accessCode: t.string({"required":true}),
  posts: t.field({"required":false,"type":PostCreateNestedManyWithoutPostedByInput}),
  userStatus: t.field({"required":false,"type":UserStatusCreateNestedOneWithoutUserInput}),
  invitations: t.field({"required":false,"type":InvitationCreateNestedManyWithoutSentToInput}),
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
  email: t.field({"required":false,"type":NullableStringFieldUpdateOperationsInput}),
  createdAt: t.field({"required":false,"type":DateTimeFieldUpdateOperationsInput}),
  updatedAt: t.field({"required":false,"type":DateTimeFieldUpdateOperationsInput}),
  activatedAt: t.field({"required":false,"type":NullableDateTimeFieldUpdateOperationsInput}),
  deletedAt: t.field({"required":false,"type":NullableDateTimeFieldUpdateOperationsInput}),
  phoneNumber: t.field({"required":false,"type":StringFieldUpdateOperationsInput}),
  accessCode: t.field({"required":false,"type":StringFieldUpdateOperationsInput}),
  posts: t.field({"required":false,"type":PostUpdateManyWithoutPostedByNestedInput}),
  userStatus: t.field({"required":false,"type":UserStatusUpdateOneRequiredWithoutUserNestedInput}),
  invitations: t.field({"required":false,"type":InvitationUpdateManyWithoutSentToNestedInput}),
});
export const UserUpdateWithoutParticipationInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.UserUpdateWithoutParticipationInput>, false>('UserUpdateWithoutParticipationInput').implement({
  fields: UserUpdateWithoutParticipationInputFields,
});

export const AdminCreateWithoutInvitationInputFields = (t: any) => ({
  id: t.string({"required":false}),
  email: t.string({"required":true}),
  password: t.string({"required":true}),
  post: t.field({"required":false,"type":PostCreateNestedManyWithoutStatusChangedByInput}),
});
export const AdminCreateWithoutInvitationInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.AdminCreateWithoutInvitationInput>, false>('AdminCreateWithoutInvitationInput').implement({
  fields: AdminCreateWithoutInvitationInputFields,
});

export const AdminCreateOrConnectWithoutInvitationInputFields = (t: any) => ({
  where: t.field({"required":true,"type":AdminWhereUniqueInput}),
  create: t.field({"required":true,"type":AdminCreateWithoutInvitationInput}),
});
export const AdminCreateOrConnectWithoutInvitationInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.AdminCreateOrConnectWithoutInvitationInput>, false>('AdminCreateOrConnectWithoutInvitationInput').implement({
  fields: AdminCreateOrConnectWithoutInvitationInputFields,
});

export const UserCreateWithoutInvitationsInputFields = (t: any) => ({
  id: t.string({"required":false}),
  email: t.string({"required":false}),
  createdAt: t.field({"required":false,"type":DateTime}),
  updatedAt: t.field({"required":false,"type":DateTime}),
  activatedAt: t.field({"required":false,"type":DateTime}),
  deletedAt: t.field({"required":false,"type":DateTime}),
  phoneNumber: t.string({"required":false}),
  accessCode: t.string({"required":true}),
  posts: t.field({"required":false,"type":PostCreateNestedManyWithoutPostedByInput}),
  participation: t.field({"required":false,"type":ParticipationCreateNestedOneWithoutUserInput}),
  userStatus: t.field({"required":false,"type":UserStatusCreateNestedOneWithoutUserInput}),
});
export const UserCreateWithoutInvitationsInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.UserCreateWithoutInvitationsInput>, false>('UserCreateWithoutInvitationsInput').implement({
  fields: UserCreateWithoutInvitationsInputFields,
});

export const UserCreateOrConnectWithoutInvitationsInputFields = (t: any) => ({
  where: t.field({"required":true,"type":UserWhereUniqueInput}),
  create: t.field({"required":true,"type":UserCreateWithoutInvitationsInput}),
});
export const UserCreateOrConnectWithoutInvitationsInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.UserCreateOrConnectWithoutInvitationsInput>, false>('UserCreateOrConnectWithoutInvitationsInput').implement({
  fields: UserCreateOrConnectWithoutInvitationsInputFields,
});

export const AdminUpsertWithoutInvitationInputFields = (t: any) => ({
  update: t.field({"required":true,"type":AdminUpdateWithoutInvitationInput}),
  create: t.field({"required":true,"type":AdminCreateWithoutInvitationInput}),
  where: t.field({"required":false,"type":AdminWhereInput}),
});
export const AdminUpsertWithoutInvitationInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.AdminUpsertWithoutInvitationInput>, false>('AdminUpsertWithoutInvitationInput').implement({
  fields: AdminUpsertWithoutInvitationInputFields,
});

export const AdminUpdateToOneWithWhereWithoutInvitationInputFields = (t: any) => ({
  where: t.field({"required":false,"type":AdminWhereInput}),
  data: t.field({"required":true,"type":AdminUpdateWithoutInvitationInput}),
});
export const AdminUpdateToOneWithWhereWithoutInvitationInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.AdminUpdateToOneWithWhereWithoutInvitationInput>, false>('AdminUpdateToOneWithWhereWithoutInvitationInput').implement({
  fields: AdminUpdateToOneWithWhereWithoutInvitationInputFields,
});

export const AdminUpdateWithoutInvitationInputFields = (t: any) => ({
  id: t.field({"required":false,"type":StringFieldUpdateOperationsInput}),
  email: t.field({"required":false,"type":StringFieldUpdateOperationsInput}),
  password: t.field({"required":false,"type":StringFieldUpdateOperationsInput}),
  post: t.field({"required":false,"type":PostUpdateManyWithoutStatusChangedByNestedInput}),
});
export const AdminUpdateWithoutInvitationInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.AdminUpdateWithoutInvitationInput>, false>('AdminUpdateWithoutInvitationInput').implement({
  fields: AdminUpdateWithoutInvitationInputFields,
});

export const UserUpsertWithoutInvitationsInputFields = (t: any) => ({
  update: t.field({"required":true,"type":UserUpdateWithoutInvitationsInput}),
  create: t.field({"required":true,"type":UserCreateWithoutInvitationsInput}),
  where: t.field({"required":false,"type":UserWhereInput}),
});
export const UserUpsertWithoutInvitationsInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.UserUpsertWithoutInvitationsInput>, false>('UserUpsertWithoutInvitationsInput').implement({
  fields: UserUpsertWithoutInvitationsInputFields,
});

export const UserUpdateToOneWithWhereWithoutInvitationsInputFields = (t: any) => ({
  where: t.field({"required":false,"type":UserWhereInput}),
  data: t.field({"required":true,"type":UserUpdateWithoutInvitationsInput}),
});
export const UserUpdateToOneWithWhereWithoutInvitationsInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.UserUpdateToOneWithWhereWithoutInvitationsInput>, false>('UserUpdateToOneWithWhereWithoutInvitationsInput').implement({
  fields: UserUpdateToOneWithWhereWithoutInvitationsInputFields,
});

export const UserUpdateWithoutInvitationsInputFields = (t: any) => ({
  id: t.field({"required":false,"type":StringFieldUpdateOperationsInput}),
  email: t.field({"required":false,"type":NullableStringFieldUpdateOperationsInput}),
  createdAt: t.field({"required":false,"type":DateTimeFieldUpdateOperationsInput}),
  updatedAt: t.field({"required":false,"type":DateTimeFieldUpdateOperationsInput}),
  activatedAt: t.field({"required":false,"type":NullableDateTimeFieldUpdateOperationsInput}),
  deletedAt: t.field({"required":false,"type":NullableDateTimeFieldUpdateOperationsInput}),
  phoneNumber: t.field({"required":false,"type":StringFieldUpdateOperationsInput}),
  accessCode: t.field({"required":false,"type":StringFieldUpdateOperationsInput}),
  posts: t.field({"required":false,"type":PostUpdateManyWithoutPostedByNestedInput}),
  participation: t.field({"required":false,"type":ParticipationUpdateOneWithoutUserNestedInput}),
  userStatus: t.field({"required":false,"type":UserStatusUpdateOneRequiredWithoutUserNestedInput}),
});
export const UserUpdateWithoutInvitationsInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.UserUpdateWithoutInvitationsInput>, false>('UserUpdateWithoutInvitationsInput').implement({
  fields: UserUpdateWithoutInvitationsInputFields,
});

export const PostCreateManyPostedByInputFields = (t: any) => ({
  id: t.string({"required":false}),
  name: t.string({"required":true}),
  createdAt: t.field({"required":false,"type":DateTime}),
  image: t.field({"required":true,"type":Bytes}),
  reading: t.float({"required":false}),
  postStatusId: t.string({"required":true}),
  statusChangedById: t.string({"required":false}),
  notes: t.string({"required":false}),
  size: t.float({"required":false}),
});
export const PostCreateManyPostedByInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.PostCreateManyPostedByInput>, false>('PostCreateManyPostedByInput').implement({
  fields: PostCreateManyPostedByInputFields,
});

export const InvitationCreateManySentToInputFields = (t: any) => ({
  id: t.string({"required":false}),
  createdAt: t.field({"required":false,"type":DateTime}),
  sentById: t.string({"required":true}),
});
export const InvitationCreateManySentToInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.InvitationCreateManySentToInput>, false>('InvitationCreateManySentToInput').implement({
  fields: InvitationCreateManySentToInputFields,
});

export const PostUpdateWithoutPostedByInputFields = (t: any) => ({
  id: t.field({"required":false,"type":StringFieldUpdateOperationsInput}),
  name: t.field({"required":false,"type":StringFieldUpdateOperationsInput}),
  createdAt: t.field({"required":false,"type":DateTimeFieldUpdateOperationsInput}),
  image: t.field({"required":false,"type":BytesFieldUpdateOperationsInput}),
  reading: t.field({"required":false,"type":FloatFieldUpdateOperationsInput}),
  notes: t.field({"required":false,"type":NullableStringFieldUpdateOperationsInput}),
  size: t.field({"required":false,"type":FloatFieldUpdateOperationsInput}),
  postStatus: t.field({"required":false,"type":PostStatusUpdateOneRequiredWithoutPostNestedInput}),
  statusChangedBy: t.field({"required":false,"type":AdminUpdateOneWithoutPostNestedInput}),
});
export const PostUpdateWithoutPostedByInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.PostUpdateWithoutPostedByInput>, false>('PostUpdateWithoutPostedByInput').implement({
  fields: PostUpdateWithoutPostedByInputFields,
});

export const InvitationUpdateWithoutSentToInputFields = (t: any) => ({
  id: t.field({"required":false,"type":StringFieldUpdateOperationsInput}),
  createdAt: t.field({"required":false,"type":DateTimeFieldUpdateOperationsInput}),
  sentBy: t.field({"required":false,"type":AdminUpdateOneRequiredWithoutInvitationNestedInput}),
});
export const InvitationUpdateWithoutSentToInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.InvitationUpdateWithoutSentToInput>, false>('InvitationUpdateWithoutSentToInput').implement({
  fields: InvitationUpdateWithoutSentToInputFields,
});

export const UserCreateManyUserStatusInputFields = (t: any) => ({
  id: t.string({"required":false}),
  email: t.string({"required":false}),
  createdAt: t.field({"required":false,"type":DateTime}),
  updatedAt: t.field({"required":false,"type":DateTime}),
  activatedAt: t.field({"required":false,"type":DateTime}),
  deletedAt: t.field({"required":false,"type":DateTime}),
  phoneNumber: t.string({"required":false}),
  accessCode: t.string({"required":true}),
});
export const UserCreateManyUserStatusInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.UserCreateManyUserStatusInput>, false>('UserCreateManyUserStatusInput').implement({
  fields: UserCreateManyUserStatusInputFields,
});

export const UserUpdateWithoutUserStatusInputFields = (t: any) => ({
  id: t.field({"required":false,"type":StringFieldUpdateOperationsInput}),
  email: t.field({"required":false,"type":NullableStringFieldUpdateOperationsInput}),
  createdAt: t.field({"required":false,"type":DateTimeFieldUpdateOperationsInput}),
  updatedAt: t.field({"required":false,"type":DateTimeFieldUpdateOperationsInput}),
  activatedAt: t.field({"required":false,"type":NullableDateTimeFieldUpdateOperationsInput}),
  deletedAt: t.field({"required":false,"type":NullableDateTimeFieldUpdateOperationsInput}),
  phoneNumber: t.field({"required":false,"type":StringFieldUpdateOperationsInput}),
  accessCode: t.field({"required":false,"type":StringFieldUpdateOperationsInput}),
  posts: t.field({"required":false,"type":PostUpdateManyWithoutPostedByNestedInput}),
  participation: t.field({"required":false,"type":ParticipationUpdateOneWithoutUserNestedInput}),
  invitations: t.field({"required":false,"type":InvitationUpdateManyWithoutSentToNestedInput}),
});
export const UserUpdateWithoutUserStatusInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.UserUpdateWithoutUserStatusInput>, false>('UserUpdateWithoutUserStatusInput').implement({
  fields: UserUpdateWithoutUserStatusInputFields,
});

export const PostCreateManyStatusChangedByInputFields = (t: any) => ({
  id: t.string({"required":false}),
  name: t.string({"required":true}),
  createdAt: t.field({"required":false,"type":DateTime}),
  image: t.field({"required":true,"type":Bytes}),
  reading: t.float({"required":false}),
  postStatusId: t.string({"required":true}),
  postedById: t.string({"required":true}),
  notes: t.string({"required":false}),
  size: t.float({"required":false}),
});
export const PostCreateManyStatusChangedByInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.PostCreateManyStatusChangedByInput>, false>('PostCreateManyStatusChangedByInput').implement({
  fields: PostCreateManyStatusChangedByInputFields,
});

export const InvitationCreateManySentByInputFields = (t: any) => ({
  id: t.string({"required":false}),
  createdAt: t.field({"required":false,"type":DateTime}),
  sentToId: t.string({"required":true}),
});
export const InvitationCreateManySentByInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.InvitationCreateManySentByInput>, false>('InvitationCreateManySentByInput').implement({
  fields: InvitationCreateManySentByInputFields,
});

export const PostUpdateWithoutStatusChangedByInputFields = (t: any) => ({
  id: t.field({"required":false,"type":StringFieldUpdateOperationsInput}),
  name: t.field({"required":false,"type":StringFieldUpdateOperationsInput}),
  createdAt: t.field({"required":false,"type":DateTimeFieldUpdateOperationsInput}),
  image: t.field({"required":false,"type":BytesFieldUpdateOperationsInput}),
  reading: t.field({"required":false,"type":FloatFieldUpdateOperationsInput}),
  notes: t.field({"required":false,"type":NullableStringFieldUpdateOperationsInput}),
  size: t.field({"required":false,"type":FloatFieldUpdateOperationsInput}),
  postStatus: t.field({"required":false,"type":PostStatusUpdateOneRequiredWithoutPostNestedInput}),
  postedBy: t.field({"required":false,"type":UserUpdateOneRequiredWithoutPostsNestedInput}),
});
export const PostUpdateWithoutStatusChangedByInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.PostUpdateWithoutStatusChangedByInput>, false>('PostUpdateWithoutStatusChangedByInput').implement({
  fields: PostUpdateWithoutStatusChangedByInputFields,
});

export const InvitationUpdateWithoutSentByInputFields = (t: any) => ({
  id: t.field({"required":false,"type":StringFieldUpdateOperationsInput}),
  createdAt: t.field({"required":false,"type":DateTimeFieldUpdateOperationsInput}),
  sentTo: t.field({"required":false,"type":UserUpdateOneRequiredWithoutInvitationsNestedInput}),
});
export const InvitationUpdateWithoutSentByInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.InvitationUpdateWithoutSentByInput>, false>('InvitationUpdateWithoutSentByInput').implement({
  fields: InvitationUpdateWithoutSentByInputFields,
});

export const PostCreateManyPostStatusInputFields = (t: any) => ({
  id: t.string({"required":false}),
  name: t.string({"required":true}),
  createdAt: t.field({"required":false,"type":DateTime}),
  image: t.field({"required":true,"type":Bytes}),
  reading: t.float({"required":false}),
  statusChangedById: t.string({"required":false}),
  postedById: t.string({"required":true}),
  notes: t.string({"required":false}),
  size: t.float({"required":false}),
});
export const PostCreateManyPostStatusInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.PostCreateManyPostStatusInput>, false>('PostCreateManyPostStatusInput').implement({
  fields: PostCreateManyPostStatusInputFields,
});

export const PostUpdateWithoutPostStatusInputFields = (t: any) => ({
  id: t.field({"required":false,"type":StringFieldUpdateOperationsInput}),
  name: t.field({"required":false,"type":StringFieldUpdateOperationsInput}),
  createdAt: t.field({"required":false,"type":DateTimeFieldUpdateOperationsInput}),
  image: t.field({"required":false,"type":BytesFieldUpdateOperationsInput}),
  reading: t.field({"required":false,"type":FloatFieldUpdateOperationsInput}),
  notes: t.field({"required":false,"type":NullableStringFieldUpdateOperationsInput}),
  size: t.field({"required":false,"type":FloatFieldUpdateOperationsInput}),
  statusChangedBy: t.field({"required":false,"type":AdminUpdateOneWithoutPostNestedInput}),
  postedBy: t.field({"required":false,"type":UserUpdateOneRequiredWithoutPostsNestedInput}),
});
export const PostUpdateWithoutPostStatusInput = builder.inputRef<PrismaUpdateOperationsInputFilter<Prisma.PostUpdateWithoutPostStatusInput>, false>('PostUpdateWithoutPostStatusInput').implement({
  fields: PostUpdateWithoutPostStatusInputFields,
});
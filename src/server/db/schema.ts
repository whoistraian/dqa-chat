import { relations } from "drizzle-orm";
import {
  pgTable,
  primaryKey,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid("id").unique().defaultRandom().primaryKey(),
  email: text("email").unique().notNull(),
  password: text("password").notNull(),
  created_at: timestamp("created_at").notNull().defaultNow(),
  updated_at: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
  created_by_id: uuid("created_by_id").notNull(),
  updated_by_id: uuid("updated_by_id").notNull(),
});

export const usersRelations = relations(users, ({ one, many }) => ({
  roles: many(roles),
  userCreatedBy: one(users, {
    fields: [users.created_by_id],
    references: [users.id],
  }),
  userUpdatedBy: one(users, {
    fields: [users.updated_by_id],
    references: [users.id],
  }),
}));

export const roles = pgTable("roles", {
  id: uuid("id").unique().defaultRandom().primaryKey(),
  name: text("name").notNull(),
  user_id: uuid("user_id"),
  created_at: timestamp("created_at").notNull().defaultNow(),
  updated_at: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
  created_by_id: uuid("created_by_id").notNull(),
  updated_by_id: uuid("updated_by_id").notNull(),
});

export const rolesRelations = relations(roles, ({ one, many }) => ({
  users: one(users, {
    fields: [roles.user_id],
    references: [users.id],
  }),
  roleCreatedBy: one(users, {
    fields: [roles.created_by_id],
    references: [users.id],
  }),
  roleUpdatedBy: one(users, {
    fields: [roles.updated_by_id],
    references: [users.id],
  }),
  rolesToPermissions: many(rolesToPermissions),
}));

export const permissions = pgTable("permissions", {
  id: uuid("id").unique().defaultRandom().primaryKey(),
  name: text("name").notNull(),
  created_at: timestamp("created_at").notNull().defaultNow(),
  updated_at: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
  created_by_id: uuid("created_by_id").notNull(),
  updated_by_id: uuid("updated_by_id").notNull(),
});

export const permissionsRelations = relations(permissions, ({ many }) => ({
  rolesToPermissions: many(rolesToPermissions),
}));

export const rolesToPermissions = pgTable(
  "roles_to_permissions",
  {
    role_id: uuid("role_id")
      .notNull()
      .references(() => roles.id),
    permission_id: uuid("permission_id")
      .notNull()
      .references(() => permissions.id),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.role_id, t.permission_id] }),
  }),
);

export const rolesToPermissionsRelations = relations(
  rolesToPermissions,
  ({ one }) => ({
    role: one(roles, {
      fields: [rolesToPermissions.role_id],
      references: [roles.id],
    }),
    permission: one(permissions, {
      fields: [rolesToPermissions.permission_id],
      references: [permissions.id],
    }),
  }),
);

export const threads = pgTable("threads", {
  id: uuid("id").unique().defaultRandom().primaryKey(),
  title: text("title").notNull(),
  user_id: uuid("user_id").notNull(),
  created_at: timestamp("created_at").notNull().defaultNow(),
  updated_at: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
  created_by_id: uuid("created_by_id").notNull(),
  updated_by_id: uuid("updated_by_id").notNull(),
});

export const threadsRelations = relations(threads, ({ one }) => ({
  user: one(users, {
    fields: [threads.user_id],
    references: [users.id],
  }),
  threadCreatedBy: one(users, {
    fields: [threads.created_by_id],
    references: [users.id],
  }),
  threadUpdatedBy: one(users, {
    fields: [threads.updated_by_id],
    references: [users.id],
  }),
}));

export const messages = pgTable("messages", {
  id: uuid("id").unique().defaultRandom().primaryKey(),
  thread_id: uuid("thread_id").notNull(),
  content: text("content").notNull(),
  created_at: timestamp("created_at").notNull().defaultNow(),
  updated_at: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
  created_by_id: uuid("created_by_id").notNull(),
  updated_by_id: uuid("updated_by_id").notNull(),
});

export const messagesRelations = relations(messages, ({ one, many }) => ({
  thread: one(threads, {
    fields: [messages.thread_id],
    references: [threads.id],
  }),
  messageCreatedBy: one(users, {
    fields: [messages.created_by_id],
    references: [users.id],
  }),
  messageUpdatedBy: one(users, {
    fields: [messages.updated_by_id],
    references: [users.id],
  }),
  messages: many(messages),
}));

export const threadsToMessages = pgTable(
  "threads_to_messages",
  {
    thread_id: uuid("thread_id")
      .notNull()
      .references(() => threads.id),
    message_id: uuid("message_id")
      .notNull()
      .references(() => messages.id),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.thread_id, t.message_id] }),
  }),
);

export const threadsToMessagesRelations = relations(
  threadsToMessages,
  ({ one }) => ({
    thread: one(threads, {
      fields: [threadsToMessages.thread_id],
      references: [threads.id],
    }),
    message: one(messages, {
      fields: [threadsToMessages.message_id],
      references: [messages.id],
    }),
  }),
);

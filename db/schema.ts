// Intentionally empty by default.
// Add Drizzle tables here when the site actually needs a database.
// See examples/d1/db/schema.ts for an opt-in example.
import {sqliteTable,text,integer,primaryKey} from "drizzle-orm/sqlite-core";
export const records=sqliteTable("rox_records",{userId:text("user_id").notNull(),kind:text("kind").notNull(),id:text("id").notNull(),payload:text("payload").notNull(),updatedAt:integer("updated_at").notNull()},t=>[primaryKey({columns:[t.userId,t.kind,t.id]})]);

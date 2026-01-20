/**
 * Sync Functions
 *
 * Factory functions that create debounced sync functions for each data type.
 * Each function handles sync state management and retry logic.
 */

import { SyncStateRefs, debounce, retryWithBackoff } from "./utils";

// Query imports
import { upsertTasks } from "@/lib/supabase/queries/tasks";
import { syncTags } from "@/lib/supabase/queries/tags";
import { syncOwners } from "@/lib/supabase/queries/owners";
import { upsertPermissions } from "@/lib/supabase/queries/permissions";
import { upsertTab } from "@/lib/supabase/queries/runningTab";
import { upsertExpenses } from "@/lib/supabase/queries/expenses";
import { upsertHistory } from "@/lib/supabase/queries/tabHistory";
import { upsertScheduledEvents } from "@/lib/supabase/queries/scheduled-events";

// Type imports
import type { Task } from "@/types/tasks";
import type { Tag } from "@/types/dashboard";
import type { Owner } from "@/types/owner";
import type { AppPermissions, RunningTab, Expense, TabHistoryEntry } from "@/types/runningTab";
import type { ScheduledEvent } from "@/types/scheduled-events";

/**
 * Creates a debounced sync function for tasks.
 * Uses upsertTasks to sync all tasks to Supabase.
 */
export function createSyncTasksToSupabase(refs: SyncStateRefs) {
  return debounce(async (tasks: Task[]) => {
    if (refs.isSyncing.current || refs.isInitialLoad.current) return;
    refs.isSyncing.current = true;
    try {
      console.log("[Sync] Syncing tasks to Supabase...");
      await retryWithBackoff(() => upsertTasks(tasks), 3, "tasks sync");
    } finally {
      refs.isSyncing.current = false;
    }
  }, 1000);
}

/**
 * Creates a debounced sync function for tags.
 * Uses syncTags to sync all tags to Supabase.
 */
export function createSyncTagsToSupabase(refs: SyncStateRefs) {
  return debounce(async (tags: Tag[]) => {
    if (refs.isSyncing.current || refs.isInitialLoad.current) return;
    refs.isSyncing.current = true;
    try {
      console.log("[Sync] Syncing tags to Supabase...");
      // Convert Tag[] to the format expected by syncTags
      const tagInserts = tags.map((tag) => ({
        id: tag.id,
        name: tag.name,
        color: tag.color,
        is_default: false,
      }));
      await retryWithBackoff(() => syncTags(tagInserts), 3, "tags sync");
    } finally {
      refs.isSyncing.current = false;
    }
  }, 1000);
}

/**
 * Creates a debounced sync function for owners.
 * Uses syncOwners to sync all owners to Supabase.
 */
export function createSyncOwnersToSupabase(refs: SyncStateRefs) {
  return debounce(async (owners: Owner[]) => {
    if (refs.isSyncing.current || refs.isInitialLoad.current) return;
    refs.isSyncing.current = true;
    try {
      console.log("[Sync] Syncing owners to Supabase...");
      // Convert Owner[] to the format expected by syncOwners
      const ownerInserts = owners.map((owner) => ({
        id: owner.id,
        name: owner.name,
        password_hash: owner.passwordHash,
        created_at: owner.createdAt,
        is_master: owner.isMaster ?? false,
      }));
      await retryWithBackoff(() => syncOwners(ownerInserts), 3, "owners sync");
    } finally {
      refs.isSyncing.current = false;
    }
  }, 1000);
}

/**
 * Creates a debounced sync function for permissions.
 * Converts Record<string, AppPermissions> to array format for upsert.
 */
export function createSyncPermissionsToSupabase(refs: SyncStateRefs) {
  return debounce(async (permissionsRecord: Record<string, AppPermissions>) => {
    if (refs.isSyncing.current || refs.isInitialLoad.current) return;
    refs.isSyncing.current = true;
    try {
      console.log("[Sync] Syncing permissions to Supabase...");
      // Convert Record to array format
      const permissionsArray: AppPermissions[] = Object.values(permissionsRecord);
      await retryWithBackoff(
        () => upsertPermissions(permissionsArray),
        3,
        "permissions sync"
      );
    } finally {
      refs.isSyncing.current = false;
    }
  }, 1000);
}

/**
 * Creates a debounced sync function for the running tab.
 * Uses upsertTab to sync the singleton tab record to Supabase.
 */
export function createSyncRunningTabToSupabase(refs: SyncStateRefs) {
  return debounce(async (tab: RunningTab) => {
    if (refs.isSyncing.current || refs.isInitialLoad.current) return;
    refs.isSyncing.current = true;
    try {
      console.log("[Sync] Syncing running tab to Supabase...");
      await retryWithBackoff(() => upsertTab(tab), 3, "running tab sync");
    } finally {
      refs.isSyncing.current = false;
    }
  }, 1000);
}

/**
 * Creates a debounced sync function for expenses.
 * Uses upsertExpenses to sync all expenses to Supabase.
 */
export function createSyncExpensesToSupabase(refs: SyncStateRefs) {
  return debounce(async (expenses: Expense[]) => {
    if (refs.isSyncing.current || refs.isInitialLoad.current) return;
    refs.isSyncing.current = true;
    try {
      console.log("[Sync] Syncing expenses to Supabase...");
      await retryWithBackoff(() => upsertExpenses(expenses), 3, "expenses sync");
    } finally {
      refs.isSyncing.current = false;
    }
  }, 1000);
}

/**
 * Creates a debounced sync function for tab history.
 * Uses upsertHistory to sync all history entries to Supabase.
 */
export function createSyncTabHistoryToSupabase(refs: SyncStateRefs) {
  return debounce(async (history: TabHistoryEntry[]) => {
    if (refs.isSyncing.current || refs.isInitialLoad.current) return;
    refs.isSyncing.current = true;
    try {
      console.log("[Sync] Syncing tab history to Supabase...");
      await retryWithBackoff(() => upsertHistory(history), 3, "tab history sync");
    } finally {
      refs.isSyncing.current = false;
    }
  }, 1000);
}

/**
 * Creates a debounced sync function for scheduled events.
 * Uses upsertScheduledEvents to sync all events to Supabase.
 */
export function createSyncScheduledEventsToSupabase(refs: SyncStateRefs) {
  return debounce(async (events: ScheduledEvent[]) => {
    if (refs.isSyncing.current || refs.isInitialLoad.current) return;
    refs.isSyncing.current = true;
    try {
      console.log("[Sync] Syncing scheduled events to Supabase...");
      await retryWithBackoff(() => upsertScheduledEvents(events), 3, "scheduled events sync");
    } finally {
      refs.isSyncing.current = false;
    }
  }, 1000);
}

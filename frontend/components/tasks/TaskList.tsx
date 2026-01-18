"use client";

import { useMemo } from "react";
import { TaskItem } from "./TaskItem";
import type { Task } from "@/types/tasks";

interface TaskListProps {
  tasks: Task[];
  getOwnerName: (ownerId: string | null) => string | undefined;
  onComplete: (id: string) => void;
  onUncomplete: (id: string) => void;
  onDelete: (id: string) => void;
  canComplete: boolean;
  canDelete?: boolean;
}

export function TaskList({
  tasks,
  getOwnerName,
  onComplete,
  onUncomplete,
  onDelete,
  canComplete,
  canDelete = false,
}: TaskListProps) {
  // Separate pending and completed tasks
  const { pendingTasks, completedTasks } = useMemo(() => {
    const pending: Task[] = [];
    const completed: Task[] = [];

    for (const task of tasks) {
      if (task.status === "completed") {
        completed.push(task);
      } else {
        pending.push(task);
      }
    }

    // Sort pending: urgent first, then by creation date (newest first)
    pending.sort((a, b) => {
      if (a.priority === "urgent" && b.priority !== "urgent") return -1;
      if (a.priority !== "urgent" && b.priority === "urgent") return 1;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    // Sort completed by completion date (most recent first)
    completed.sort((a, b) => {
      if (!a.completedAt || !b.completedAt) return 0;
      return new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime();
    });

    return { pendingTasks: pending, completedTasks: completed };
  }, [tasks]);

  if (tasks.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <p className="text-lg">No tasks yet.</p>
        <p className="text-sm mt-1">Add your first task above.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Pending Tasks */}
      {pendingTasks.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
            Pending ({pendingTasks.length})
          </h3>
          <div className="space-y-3">
            {pendingTasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                creatorName={getOwnerName(task.createdBy)}
                completerName={undefined}
                onComplete={onComplete}
                onUncomplete={onUncomplete}
                onDelete={onDelete}
                canComplete={canComplete}
                canDelete={canDelete}
              />
            ))}
          </div>
        </div>
      )}

      {/* Completed Tasks */}
      {completedTasks.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-500">
            Completed ({completedTasks.length})
          </h3>
          <div className="space-y-3">
            {completedTasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                creatorName={getOwnerName(task.createdBy)}
                completerName={getOwnerName(task.completedBy)}
                onComplete={onComplete}
                onUncomplete={onUncomplete}
                onDelete={onDelete}
                canComplete={canComplete}
                canDelete={canDelete}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

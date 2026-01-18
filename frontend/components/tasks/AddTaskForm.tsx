"use client";

import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import type { TaskPriority } from "@/types/tasks";

interface AddTaskFormProps {
  onAddTask: (title: string, priority: TaskPriority) => void;
  disabled?: boolean;
}

export function AddTaskForm({ onAddTask, disabled = false }: AddTaskFormProps) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState<TaskPriority>("regular");
  const inputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-focus input on mount (desktop only - textarea handles mobile)
  useEffect(() => {
    // Focus desktop input on larger screens
    if (window.innerWidth >= 768) {
      inputRef.current?.focus();
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedTitle = title.trim();
    if (!trimmedTitle) return;

    onAddTask(trimmedTitle, priority);
    setTitle("");
    setPriority("regular");
    // Refocus input for quick consecutive entries
    if (window.innerWidth >= 768) {
      inputRef.current?.focus();
    } else {
      textareaRef.current?.focus();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 md:space-y-0">
      {/* Desktop Layout - Single Row */}
      <div className="hidden md:flex gap-2">
        <Input
          ref={inputRef}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a new task..."
          disabled={disabled}
          className="flex-1 rounded-full px-5 border-2 border-violet-400/30 focus:border-violet-400 focus-visible:ring-violet-400/30"
        />

        {/* Priority Toggle Buttons */}
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setPriority("regular")}
            disabled={disabled}
            className={cn(
              "px-4 py-2 text-sm font-medium rounded-full border-2 transition-all",
              priority === "regular"
                ? "bg-gradient-to-r from-cyan-500 to-blue-500 border-cyan-400 text-white shadow-lg shadow-cyan-500/30"
                : "bg-transparent border-cyan-400/40 text-cyan-400 hover:border-cyan-400/70 hover:bg-cyan-500/10"
            )}
          >
            Normal
          </button>
          <button
            type="button"
            onClick={() => setPriority("urgent")}
            disabled={disabled}
            className={cn(
              "px-4 py-2 text-sm font-medium rounded-full border-2 transition-all",
              priority === "urgent"
                ? "bg-gradient-to-r from-orange-500 to-red-500 border-orange-400 text-white shadow-lg shadow-orange-500/30"
                : "bg-transparent border-orange-400/40 text-orange-400 hover:border-orange-400/70 hover:bg-orange-500/10"
            )}
          >
            Urgent
          </button>
        </div>

        <Button
          type="submit"
          disabled={disabled || !title.trim()}
          className="bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-600 hover:to-purple-600 text-white shadow-lg shadow-purple-500/30"
        >
          <Plus className="h-4 w-4 mr-1" />
          Add
        </Button>
      </div>

      {/* Mobile Layout - Stacked with Large Input */}
      <div className="md:hidden space-y-3">
        {/* Priority buttons and Add button row */}
        <div className="flex gap-2 justify-center">
          <button
            type="button"
            onClick={() => setPriority("regular")}
            disabled={disabled}
            className={cn(
              "flex-1 px-4 py-3 text-sm font-medium rounded-full border-2 transition-all",
              priority === "regular"
                ? "bg-gradient-to-r from-cyan-500 to-blue-500 border-cyan-400 text-white shadow-lg shadow-cyan-500/30"
                : "bg-transparent border-cyan-400/40 text-cyan-400 hover:border-cyan-400/70 hover:bg-cyan-500/10"
            )}
          >
            Normal
          </button>
          <button
            type="button"
            onClick={() => setPriority("urgent")}
            disabled={disabled}
            className={cn(
              "flex-1 px-4 py-3 text-sm font-medium rounded-full border-2 transition-all",
              priority === "urgent"
                ? "bg-gradient-to-r from-orange-500 to-red-500 border-orange-400 text-white shadow-lg shadow-orange-500/30"
                : "bg-transparent border-orange-400/40 text-orange-400 hover:border-orange-400/70 hover:bg-orange-500/10"
            )}
          >
            Urgent
          </button>
          <Button
            type="submit"
            disabled={disabled || !title.trim()}
            className="flex-1 bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-600 hover:to-purple-600 text-white shadow-lg shadow-purple-500/30 py-3"
          >
            <Plus className="h-4 w-4 mr-1" />
            Add
          </Button>
        </div>

        {/* Large text input area for mobile */}
        <textarea
          ref={textareaRef}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="What needs to be done?"
          disabled={disabled}
          rows={3}
          className="w-full rounded-2xl px-4 py-3 text-base border-2 border-violet-400/30 focus:border-violet-400 focus-visible:ring-1 focus-visible:ring-violet-400/30 focus:outline-none bg-background resize-none"
          onKeyDown={(e: React.KeyboardEvent<HTMLTextAreaElement>) => {
            // Submit on Enter (without shift)
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSubmit(e);
            }
          }}
        />
      </div>
    </form>
  );
}

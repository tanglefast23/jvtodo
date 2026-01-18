"use client";

import { Check, X, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatVND } from "./BalanceDisplay";
import { formatRelativeTime } from "@/lib/formatters";
import type { Expense, ExpenseStatus } from "@/types/runningTab";
import { AttachmentUpload } from "./AttachmentUpload";

interface ExpenseItemProps {
  expense: Expense;
  creatorName?: string;
  approverName?: string;
  canApprove: boolean;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  onAttachment: (id: string, url: string) => void;
  itemNumber?: number;
  showNumber?: boolean;
}

// Rainbow gradient colors for item numbers
const NUMBER_COLORS = [
  "from-pink-500 to-rose-500",
  "from-orange-500 to-amber-500",
  "from-yellow-500 to-lime-500",
  "from-green-500 to-emerald-500",
  "from-teal-500 to-cyan-500",
  "from-blue-500 to-indigo-500",
  "from-violet-500 to-purple-500",
  "from-fuchsia-500 to-pink-500",
];

const statusConfig: Record<
  ExpenseStatus,
  { label: string; variant: "default" | "secondary" | "destructive" | "outline"; className?: string }
> = {
  pending: {
    label: "Pending",
    variant: "outline",
    className: "border-amber-400 text-amber-500 bg-amber-500/10",
  },
  approved: {
    label: "Approved",
    variant: "default",
    className: "bg-gradient-to-r from-emerald-500 to-green-500 text-white border-0",
  },
  rejected: {
    label: "Rejected",
    variant: "destructive",
    className: "bg-gradient-to-r from-red-500 to-rose-500 text-white border-0",
  },
};

export function ExpenseItem({
  expense,
  creatorName,
  approverName,
  canApprove,
  onApprove,
  onReject,
  onAttachment,
  itemNumber,
  showNumber = false,
}: ExpenseItemProps) {
  const config = statusConfig[expense.status];
  const isPending = expense.status === "pending";
  const numberColor = itemNumber ? NUMBER_COLORS[(itemNumber - 1) % NUMBER_COLORS.length] : NUMBER_COLORS[0];

  // Get card style based on status
  const getCardStyle = () => {
    switch (expense.status) {
      case "approved":
        return "bg-gradient-to-r from-emerald-500/10 to-green-500/10 border-emerald-400/40";
      case "rejected":
        return "bg-gradient-to-r from-red-500/10 to-rose-500/10 border-red-400/40";
      default:
        return "bg-gradient-to-r from-amber-500/10 to-yellow-500/10 border-amber-400/40";
    }
  };

  return (
    <div className={`flex items-start gap-4 p-4 rounded-xl border-2 ${getCardStyle()}`}>
      {/* Item Number */}
      {showNumber && itemNumber && (
        <div
          className={`flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br ${numberColor} flex items-center justify-center text-white font-bold text-lg shadow-lg`}
        >
          {itemNumber}
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <h4 className="font-medium text-sm truncate">{expense.name}</h4>
          <Badge variant={config.variant} className={config.className}>
            {config.label}
          </Badge>
        </div>

        <p className="text-lg font-semibold mt-1">{formatVND(expense.amount)}</p>

        <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground flex-wrap">
          {creatorName && (
            <span>
              Created by <span className="font-medium">{creatorName}</span>
            </span>
          )}
          <span>{formatRelativeTime(expense.createdAt)}</span>
          {expense.status !== "pending" && approverName && (
            <>
              <span className="mx-1">|</span>
              <span>
                {expense.status === "approved" ? "Approved" : "Rejected"} by{" "}
                <span className="font-medium">{approverName}</span>
              </span>
            </>
          )}
        </div>

        {/* Rejection Reason - only for rejected expenses */}
        {expense.status === "rejected" && expense.rejectionReason && (
          <div className="mt-2 px-3 py-2 rounded-md bg-red-500/10 border border-red-500/20">
            <p className="text-sm text-red-600 dark:text-red-400">
              <span className="font-medium">Reason:</span> {expense.rejectionReason}
            </p>
          </div>
        )}

        {/* Attachment Preview */}
        {expense.attachmentUrl && (
          <div className="mt-3">
            <a
              href={expense.attachmentUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
            >
              <ImageIcon className="h-4 w-4" />
              View Attachment
            </a>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 shrink-0">
        {/* Attachment button - only for pending expenses */}
        {isPending && !expense.attachmentUrl && (
          <AttachmentUpload
            expenseId={expense.id}
            onUpload={(url) => onAttachment(expense.id, url)}
          />
        )}

        {/* Approve/Reject buttons - only for pending and authorized users */}
        {isPending && canApprove && (
          <>
            <Button
              variant="outline"
              size="icon-sm"
              className="text-green-600 hover:text-green-700 hover:bg-green-50 dark:hover:bg-green-950"
              onClick={() => onApprove(expense.id)}
              title="Approve expense"
            >
              <Check className="h-4 w-4" />
              <span className="sr-only">Approve</span>
            </Button>
            <Button
              variant="outline"
              size="icon-sm"
              className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950"
              onClick={() => onReject(expense.id)}
              title="Reject expense"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Reject</span>
            </Button>
          </>
        )}
      </div>
    </div>
  );
}

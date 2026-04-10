"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Booking } from "@/types/api";
import { Sparkles, TrendingDown, TrendingUp, Minus } from "lucide-react";
import { useMemo } from "react";

interface AiInsightsCardProps {
  bookings: Booking[];
  userName?: string;
}

interface Insight {
  id: string;
  text: string;
  type: "positive" | "neutral" | "negative";
}

/** Pure function: derives human-readable insights from raw booking data. */
function generateInsights(bookings: Booking[], userName?: string): Insight[] {
  const insights: Insight[] = [];

  if (!bookings || bookings.length === 0) {
    insights.push({
      id: "no-bookings",
      text: `Welcome${userName ? `, ${userName.split(" ")[0]}` : ""}! Book your first session to get personalised learning insights here.`,
      type: "neutral",
    });
    return insights;
  }

  const now = new Date();
  const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const twoWeeksAgo = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);

  // Sessions in the past 7 days vs the 7 days before that
  const thisWeek = bookings.filter(
    (b) => new Date(b.startTime) >= oneWeekAgo
  ).length;
  const lastWeek = bookings.filter(
    (b) =>
      new Date(b.startTime) >= twoWeeksAgo &&
      new Date(b.startTime) < oneWeekAgo
  ).length;

  // Week-over-week trend
  if (thisWeek > 0 && lastWeek > 0) {
    const pct = Math.round(((thisWeek - lastWeek) / lastWeek) * 100);
    if (pct > 0) {
      insights.push({
        id: "wow-up",
        text: `You booked ${thisWeek} session${thisWeek > 1 ? "s" : ""} this week — a ${pct}% increase over last week. Great momentum! 🚀`,
        type: "positive",
      });
    } else if (pct < 0) {
      insights.push({
        id: "wow-down",
        text: `You had ${thisWeek} session${thisWeek > 1 ? "s" : ""} this week, down ${Math.abs(pct)}% from last week. Try to keep the streak going!`,
        type: "negative",
      });
    } else {
      insights.push({
        id: "wow-flat",
        text: `You maintained the same pace as last week with ${thisWeek} session${thisWeek > 1 ? "s" : ""}. Consistency is key! 💪`,
        type: "neutral",
      });
    }
  } else if (thisWeek > 0 && lastWeek === 0) {
    insights.push({
      id: "new-week",
      text: `You have ${thisWeek} new session${thisWeek > 1 ? "s" : ""} this week. You're off to a great start!`,
      type: "positive",
    });
  }

  // Completion rate
  const completed = bookings.filter((b) => b.status === "COMPLETED").length;
  const total = bookings.length;
  const completionRate = Math.round((completed / total) * 100);

  if (total >= 3) {
    if (completionRate >= 80) {
      insights.push({
        id: "completion-high",
        text: `Your session completion rate is ${completionRate}% — excellent dedication to your learning goals! 🎯`,
        type: "positive",
      });
    } else if (completionRate >= 50) {
      insights.push({
        id: "completion-mid",
        text: `You've completed ${completionRate}% of your sessions. Try to reduce cancellations to accelerate progress.`,
        type: "neutral",
      });
    } else {
      insights.push({
        id: "completion-low",
        text: `Only ${completionRate}% of your sessions were completed. Consider rescheduling instead of cancelling to stay on track.`,
        type: "negative",
      });
    }
  }

  // Upcoming sessions
  const upcoming = bookings.filter(
    (b) =>
      (b.status === "CONFIRMED" || b.status === "PENDING") &&
      new Date(b.startTime) > now
  ).length;

  if (upcoming > 0) {
    insights.push({
      id: "upcoming",
      text: `You have ${upcoming} upcoming session${upcoming > 1 ? "s" : ""} scheduled. Prepare your notes beforehand for maximum effectiveness!`,
      type: "positive",
    });
  } else {
    insights.push({
      id: "no-upcoming",
      text: `No upcoming sessions yet. Browse tutors to book your next learning session.`,
      type: "neutral",
    });
  }

  // Unique tutors (variety of learning)
  const uniqueTutors = new Set(bookings.map((b) => b.tutor?.id).filter(Boolean))
    .size;
  if (uniqueTutors > 1) {
    insights.push({
      id: "diversity",
      text: `You've learned from ${uniqueTutors} different tutors — a great way to get diverse perspectives! 🌟`,
      type: "positive",
    });
  }

  return insights.slice(0, 3); // Show top 3 insights
}

const iconMap: Record<Insight["type"], React.ReactNode> = {
  positive: <TrendingUp className="h-4 w-4 text-emerald-500 flex-shrink-0 mt-0.5" />,
  neutral: <Minus className="h-4 w-4 text-blue-500 flex-shrink-0 mt-0.5" />,
  negative: <TrendingDown className="h-4 w-4 text-amber-500 flex-shrink-0 mt-0.5" />,
};

const bgMap: Record<Insight["type"], string> = {
  positive:
    "bg-emerald-50 border-emerald-100 dark:bg-emerald-950/30 dark:border-emerald-900/50",
  neutral:
    "bg-blue-50 border-blue-100 dark:bg-blue-950/30 dark:border-blue-900/50",
  negative:
    "bg-amber-50 border-amber-100 dark:bg-amber-950/30 dark:border-amber-900/50",
};

const textMap: Record<Insight["type"], string> = {
  positive: "text-emerald-800 dark:text-emerald-200",
  neutral: "text-blue-800 dark:text-blue-200",
  negative: "text-amber-800 dark:text-amber-200",
};

export function AiInsightsCard({ bookings, userName }: AiInsightsCardProps) {
  const insights = useMemo(
    () => generateInsights(bookings, userName),
    [bookings, userName]
  );

  return (
    <Card className="border border-border bg-card overflow-hidden">
      <CardHeader className="pb-3 bg-gradient-to-r from-violet-600/10 to-blue-600/10 dark:from-violet-900/20 dark:to-blue-900/20">
        <CardTitle className="flex items-center gap-2 text-base font-semibold">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-blue-500 shadow-sm">
            <Sparkles className="h-4 w-4 text-white" />
          </div>
          <span>AI Smart Insights</span>
          <span className="ml-auto text-xs font-normal text-muted-foreground px-2 py-0.5 rounded-full bg-muted">
            Powered by your data
          </span>
        </CardTitle>
      </CardHeader>

      <CardContent className="p-4 space-y-3">
        {insights.map((insight) => (
          <div
            key={insight.id}
            className={`flex items-start gap-3 rounded-lg border p-3 transition-colors ${bgMap[insight.type]}`}
          >
            {iconMap[insight.type]}
            <p className={`text-sm leading-relaxed ${textMap[insight.type]}`}>
              {insight.text}
            </p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

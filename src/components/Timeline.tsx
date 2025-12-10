import { TimelineEvent, User } from "../types";

interface TimelineProps {
  events: TimelineEvent[];
  users: User[];
}

const eventColors: Record<TimelineEvent["event_type"], string> = {
  note: "bg-slate-500 text-white border border-slate-600",
  status_change: "bg-indigo-500 text-white border border-indigo-600",
  email: "bg-sky-500 text-white border border-sky-600",
  call: "bg-amber-400 text-slate-900 border border-amber-500",
  document_uploaded: "bg-emerald-500 text-white border border-emerald-600",
};

const Timeline = ({ events, users }: TimelineProps) => {
  const userMap = Object.fromEntries(users.map((u) => [u.id, u.full_name]));
  const sorted = [...events].sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );

  return (
    <div className="panel rounded-2xl shadow-lg p-5 space-y-4">
      <h3 className="text-xl font-semibold text-main">Timeline</h3>
      <div className="space-y-4">
        {sorted.map((event) => (
          <div key={event.id} className="flex items-start gap-3">
            <div className="mt-1 w-2 h-2 rounded-full bg-indigo-500" />
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${eventColors[event.event_type]}`}>
                  {event.event_type.replace("_", " ")}
                </span>
                <span className="text-sm text-muted">
                  {new Date(event.created_at).toLocaleString()} • {userMap[event.created_by]}
                </span>
              </div>
              <p className="mt-2 text-base text-main leading-relaxed">{event.body}</p>
            </div>
          </div>
        ))}
        {sorted.length === 0 && <p className="text-base text-muted">No timeline events yet.</p>}
      </div>
    </div>
  );
};

export default Timeline;

import React from "react";

function StatsCard({
  title,
  value,
  icon: Icon,
  description,
  iconBg,
  iconColor,
}) {
  return (
    <div className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      
      {/* Card Header */}
      <div className="flex items-start justify-between">
        
        <div>
          <p className="text-sm font-medium text-slate-500">
            {title}
          </p>

          <h3 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            {value}
          </h3>
        </div>

        {/* Icon */}
        <div
          className={`flex h-11 w-11 items-center justify-center rounded-xl ${iconBg} ${iconColor}`}
        >
          <Icon size={21} strokeWidth={2} />
        </div>
      </div>

      {/* Description */}
      {description && (
        <p className="mt-4 text-xs font-medium text-slate-400">
          {description}
        </p>
      )}
    </div>
  );
}

export default StatsCard;

 'use client';

import { formatMentions, formatRank } from '../utils/format';

export default function CompetitorChart({ competitors, brandName, promptsCount }) {
  if (!competitors || competitors.length === 0) return null;

  // Sort by score (highest first)
  const sortedCompetitors = [...competitors].sort((a, b) => b.score - a.score);

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-6">
      <div className="bg-gray-900/50 border border-purple-500/30 rounded-xl p-8">
      <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
        <span>🏆</span>
        Competitor Analysis
      </h3>

      <div className="space-y-4">
        {sortedCompetitors.map((competitor, index) => {
          const isMainBrand = competitor.name === brandName;
          const barColor = isMainBrand ? 'from-cyan-500 to-cyan-600' : 'from-purple-500 to-purple-600';
          const borderColor = isMainBrand ? 'border-cyan-500/50' : 'border-purple-500/30';
          const textColor = isMainBrand ? 'text-cyan-300' : 'text-purple-300';

          return (
            <div
              key={competitor.name}
              className={`p-4 rounded-lg border ${borderColor} bg-gray-800/30 transition-all hover:bg-gray-800/50`}
            >
              <div className="flex items-center gap-4 mb-2">
                <span className="text-2xl font-bold text-gray-500 w-8">
                  #{index + 1}
                </span>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className={`font-semibold ${textColor}`}>
                      {competitor.name}
                      {isMainBrand && (
                        <span className="ml-2 text-xs bg-cyan-500/20 text-cyan-300 px-2 py-1 rounded">
                          Your Brand
                        </span>
                      )}
                    </span>
                    <span className="text-white font-bold">
                      {competitor.score}/100
                    </span>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full h-3 bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r ${barColor} transition-all duration-500 ease-out`}
                      style={{ width: `${competitor.score}%` }}
                    ></div>
                  </div>

                  {/* Stats */}
                  <div className="flex gap-4 mt-2 text-xs text-gray-400">
                    <span>
                      {formatMentions(competitor.mentions || 0, promptsCount || 12)} mentions
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-6 pt-4 border-t border-gray-700 flex gap-6 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-gradient-to-r from-cyan-500 to-cyan-600"></div>
          <span className="text-gray-400">Your Brand</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-gradient-to-r from-purple-500 to-purple-600"></div>
          <span className="text-gray-400">Competitors</span>
        </div>
      </div>
      </div>
    </div>
  );
}

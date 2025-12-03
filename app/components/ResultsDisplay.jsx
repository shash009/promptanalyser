'use client';

import CompetitorChart from './CompetitorChart';

export default function ResultsDisplay({ results, brandName, onReset }) {
  const { overallScore, platforms, competitorComparison, insights, recommendations } = results;

  const platformNames = ['ChatGPT', 'Gemini', 'Perplexity'];

  // Get score color
  const getScoreColor = (score) => {
    if (score >= 70) return 'text-emerald-400';
    if (score >= 50) return 'text-cyan-400';
    if (score >= 30) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getScoreGradient = (score) => {
    if (score >= 70) return 'from-emerald-500 to-cyan-500';
    if (score >= 50) return 'from-cyan-500 to-purple-500';
    if (score >= 30) return 'from-yellow-500 to-orange-500';
    return 'from-red-500 to-pink-500';
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Header with reset button */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Analysis Results</h2>
        <button
          onClick={onReset}
          className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg transition-all border border-gray-700"
        >
          New Analysis
        </button>
      </div>

      {/* Overall Score Card */}
      <div className="bg-gray-900/50 border border-cyan-500/30 rounded-2xl p-8 backdrop-blur-sm shadow-xl text-center">
        <h3 className="text-lg text-gray-400 mb-4">Overall Visibility Score</h3>
        <div className={`text-7xl font-bold mb-4 ${getScoreColor(overallScore)}`}>
          {overallScore}
          <span className="text-4xl">/100</span>
        </div>
        <div className="w-full h-4 bg-gray-800 rounded-full overflow-hidden">
          <div
            className={`h-full bg-gradient-to-r ${getScoreGradient(overallScore)} transition-all duration-1000 ease-out`}
            style={{ width: `${overallScore}%` }}
          ></div>
        </div>
      </div>

      {/* Platform Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {platformNames.map((platformName) => {
          const platformKey = platformName.toLowerCase();
          const platformData = platforms[platformKey]?.[brandName] || {};
          const score = platformData.score || 0;
          const mentions = platformData.mentions || 0;
          const avgRank = platformData.avgRank;

          const icons = {
            chatgpt: '🤖',
            gemini: '💎',
            perplexity: '🔮'
          };

          return (
            <div
              key={platformName}
              className="bg-gray-900/50 border border-purple-500/30 rounded-xl p-6 hover:border-purple-500/50 transition-all"
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="text-3xl">{icons[platformKey]}</span>
                <h4 className="text-lg font-bold text-white">{platformName}</h4>
              </div>

              <div className={`text-4xl font-bold mb-2 ${getScoreColor(score)}`}>
                {score}/100
              </div>

              <div className="space-y-2 text-sm text-gray-400">
                <div className="flex justify-between">
                  <span>Mentions:</span>
                  <span className="text-white font-semibold">{mentions}/8</span>
                </div>
                {avgRank && (
                  <div className="flex justify-between">
                    <span>Avg Rank:</span>
                    <span className="text-white font-semibold">#{avgRank}</span>
                  </div>
                )}
              </div>

              {mentions > 0 && (
                <div className="mt-3 text-emerald-400 text-sm flex items-center gap-1">
                  <span>✓</span>
                  <span>Brand mentioned</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Competitor Analysis */}
      {competitorComparison && competitorComparison.length > 1 && (
        <CompetitorChart competitors={competitorComparison} brandName={brandName} />
      )}

      {/* Insights and Recommendations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Insights */}
        <div className="bg-gray-900/50 border border-cyan-500/30 rounded-xl p-6">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span>💡</span>
            Key Insights
          </h3>
          <ul className="space-y-3">
            {insights && insights.length > 0 ? (
              insights.map((insight, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="text-cyan-400 mt-1">•</span>
                  <span className="text-gray-300 flex-1">{insight}</span>
                </li>
              ))
            ) : (
              <li className="text-gray-400">No insights available</li>
            )}
          </ul>
        </div>

        {/* Recommendations */}
        <div className="bg-gray-900/50 border border-purple-500/30 rounded-xl p-6">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span>🎯</span>
            Recommendations
          </h3>
          <ul className="space-y-3">
            {recommendations && recommendations.length > 0 ? (
              recommendations.map((recommendation, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="text-purple-400 mt-1">•</span>
                  <span className="text-gray-300 flex-1">{recommendation}</span>
                </li>
              ))
            ) : (
              <li className="text-gray-400">No recommendations available</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

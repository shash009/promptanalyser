'use client';

export default function BrandForm({ onSubmit, isLoading }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const data = {
      brandName: formData.get('brandName'),
      industry: formData.get('industry'),
      competitors: [
        formData.get('competitor1'),
        formData.get('competitor2'),
        formData.get('competitor3')
      ].filter(Boolean)
    };

    onSubmit(data);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-gray-900/50 border border-cyan-500/30 rounded-2xl p-8 backdrop-blur-sm shadow-xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            AI Brand Visibility Analyzer
          </h1>
          <p className="text-gray-400">
            Analyze your brand&apos;s presence across major AI platforms
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Brand Name */}
          <div>
            <label htmlFor="brandName" className="block text-sm font-medium text-gray-300 mb-2">
              Brand Name *
            </label>
            <input
              type="text"
              id="brandName"
              name="brandName"
              required
              disabled={isLoading}
              placeholder="e.g., PolicyBazaar"
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            />
          </div>

          {/* Industry */}
          <div>
            <label htmlFor="industry" className="block text-sm font-medium text-gray-300 mb-2">
              Industry *
            </label>
            <select
              id="industry"
              name="industry"
              required
              disabled={isLoading}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <option value="">Select an industry</option>
              <option value="Insurance">Insurance</option>
              <option value="FinTech">FinTech</option>
              <option value="SaaS">SaaS</option>
              <option value="E-commerce">E-commerce</option>
              <option value="Healthcare">Healthcare</option>
            </select>
          </div>

          {/* Competitors */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Competitors (Optional)
            </label>
            <p className="text-xs text-gray-500 mb-3">Add up to 3 competitors to compare</p>
            <div className="space-y-4">
              {[1, 2, 3].map((num) => (
                <input
                  key={num}
                  type="text"
                  name={`competitor${num}`}
                  disabled={isLoading}
                  placeholder={`Competitor ${num}`}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                />
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold rounded-lg hover:from-cyan-600 hover:to-purple-600 focus:outline-none focus:ring-4 focus:ring-cyan-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-cyan-500/50 transform hover:scale-[1.02] active:scale-[0.98]"
          >
            {isLoading ? 'Analyzing...' : 'Analyze Visibility'}
          </button>
        </form>
      </div>
    </div>
  );
}

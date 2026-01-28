import { Search, Star, BookOpen, Users, TrendingUp, ArrowRight, CheckCircle, MessageSquare } from 'lucide-react';
export default function Home() {
  return (
    <section className="relative pt-20 pb-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100/40 to-purple-100/40 -z-10"></div>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Connect with Expert Tutors
              </span>
              <br />
              <span className="text-gray-800">Learn Anything</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Find your perfect tutor from thousands of experts. Book sessions instantly and start learning today.
            </p>

            {/* Search Bar */}
            <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-2xl p-3 flex flex-col md:flex-row gap-3">
              <div className="flex-1 flex items-center px-4 py-2 bg-gray-50 rounded-xl">
                <Search className="h-5 w-5 text-gray-400 mr-3" />
                <input
                  type="text"
                  placeholder="What do you want to learn?"
                  className="flex-1 bg-transparent outline-none text-gray-700 placeholder-gray-400"
                />
              </div>
              <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-xl transform hover:-translate-y-0.5 transition">
                Search Tutors
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
            {[
              { icon: Users, label: 'Expert Tutors', value: '10,000+' },
              { icon: BookOpen, label: 'Subjects', value: '500+' },
              { icon: Star, label: 'Avg Rating', value: '4.9/5' },
              { icon: TrendingUp, label: 'Success Rate', value: '95%' },
            ].map((stat, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition transform hover:-translate-y-1">
                <stat.icon className="h-10 w-10 mx-auto mb-3 text-blue-600" />
                <div className="text-3xl font-bold text-gray-800 mb-1">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
  );
}

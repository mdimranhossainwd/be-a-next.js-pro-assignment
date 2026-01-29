import TutorList from "@/components/layout/TutorFiltering";
import { tutorService } from "@/tutor.service";
import {
  BookOpen,
  CheckCircle,
  MessageSquare,
  Search,
  Star,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";
export default async function Home() {
  const { data } = await tutorService.getAllTutors();
  console.log(data);

  return (
    <>
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
              Find your perfect tutor from thousands of experts. Book sessions
              instantly and start learning today.
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
          {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
            {[
              { icon: Users, label: "Expert Tutors", value: "10,000+" },
              { icon: BookOpen, label: "Subjects", value: "500+" },
              { icon: Star, label: "Avg Rating", value: "4.9/5" },
              { icon: TrendingUp, label: "Success Rate", value: "95%" },
            ].map((stat, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition transform hover:-translate-y-1"
              >
                <stat.icon className="h-10 w-10 mx-auto mb-3 text-blue-600" />
                <div className="text-3xl font-bold text-gray-800 mb-1">
                  {stat.value}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div> */}
        </div>
      </section>

      <TutorList />

      {/* <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 sm:px-6 lg:px-8 mb-20">
        {data?.data?.map((tutor: Tutor) => (
          <Card key={tutor.id} tutor={tutor} />
        ))}
      </section> */}

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">
              How{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                SkillBridge
              </span>{" "}
              Works
            </h2>
            <p className="text-xl text-gray-600">
              Get started in 3 simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Find Your Tutor",
                description:
                  "Browse through our extensive list of expert tutors. Filter by subject, price, rating, and availability to find your perfect match.",
                icon: Search,
                color: "from-blue-500 to-cyan-500",
              },
              {
                step: "2",
                title: "Book a Session",
                description:
                  "View tutor availability and book a session that fits your schedule. Instant confirmation with flexible timing options.",
                icon: BookOpen,
                color: "from-purple-500 to-pink-500",
              },
              {
                step: "3",
                title: "Start Learning",
                description:
                  "Join your session and start learning! After completion, leave a review to help other students find great tutors.",
                icon: TrendingUp,
                color: "from-orange-500 to-red-500",
              },
            ].map((item, i) => (
              <div key={i} className="relative">
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2 h-full">
                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-6`}
                  >
                    <item.icon className="h-8 w-8 text-white" />
                  </div>

                  <div className="absolute -top-4 -left-4 w-12 h-12 bg-gray-800 text-white rounded-full flex items-center justify-center text-xl font-bold shadow-lg">
                    {item.step}
                  </div>

                  <h3 className="text-2xl font-bold text-gray-800 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
                Why Choose{" "}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  SkillBridge?
                </span>
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                We connect you with the world's best tutors, making quality
                education accessible to everyone, everywhere.
              </p>

              <div className="space-y-6">
                {[
                  {
                    icon: CheckCircle,
                    title: "Verified Expert Tutors",
                    description:
                      "All tutors are thoroughly vetted and certified in their subjects",
                  },
                  {
                    icon: Star,
                    title: "Highly Rated Platform",
                    description:
                      "Join thousands of satisfied students with 4.9/5 average rating",
                  },
                  {
                    icon: MessageSquare,
                    title: "Instant Communication",
                    description:
                      "Real-time chat and video sessions for seamless learning",
                  },
                  {
                    icon: TrendingUp,
                    title: "Track Your Progress",
                    description:
                      "Monitor your learning journey with detailed analytics",
                  },
                ].map((feature, i) => (
                  <div key={i} className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl flex items-center justify-center">
                      <feature.icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-800 mb-1">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-3xl p-8 shadow-2xl">
                <div className="text-8xl text-center mb-6">📚</div>
                <div className="bg-white rounded-2xl p-6 shadow-lg mb-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-gray-600">Success Rate</span>
                    <span className="text-2xl font-bold text-green-600">
                      95%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full"
                      style={{ width: "95%" }}
                    ></div>
                  </div>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-gray-600">Student Satisfaction</span>
                    <span className="text-2xl font-bold text-blue-600">
                      4.9/5
                    </span>
                  </div>
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star
                        key={i}
                        className="h-6 w-6 text-yellow-400 fill-yellow-400"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Ready to Start Your Learning Journey?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of students already learning with SkillBridge
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <button className="px-8 py-4 bg-white text-blue-600 rounded-xl font-bold text-lg hover:shadow-2xl transform hover:-translate-y-1 transition">
                Get Started Free
              </button>
            </Link>
            <Link href="/tutors">
              <button className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-xl font-bold text-lg hover:bg-white hover:text-blue-600 transition">
                Browse Tutors
              </button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

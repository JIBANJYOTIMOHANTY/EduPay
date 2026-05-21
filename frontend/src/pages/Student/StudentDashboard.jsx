import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { fetchMyEnrollments } from "../../api/studentApi";
import { sampleEnrollments, sampleStats } from "../../data/sampleData";
import { AuthContext } from "../../contexts/AuthContextHelper";

const BookOpenIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
  </svg>
);

const GridIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zm0 9.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zm9.75-9.75A2.25 2.25 0 0115.75 3.75H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zm0 9.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
  </svg>
);

const WalletIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18-3a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 9m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v3" />
  </svg>
);

const TrophyIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 012.916.52 6.003 6.003 0 01-5.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-3.044 0" />
  </svg>
);

const ChevronRightIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
  </svg>
);

const SearchIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
  </svg>
);

const UserIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
  </svg>
);

const STAT_CARDS = [
  {
    key: "myCourses",
    label: "My Courses",
    badge: "Enrolled",
    gradient: "from-blue-500 to-blue-600",
    shadow: "shadow-blue-200",
    icon: <BookOpenIcon />,
  },
  {
    key: "availableCourses",
    label: "Available",
    badge: "Explore",
    gradient: "from-violet-500 to-violet-600",
    shadow: "shadow-violet-200",
    icon: <GridIcon />,
  },
  {
    key: "totalSpent",
    label: "Total Invested",
    badge: "Growth",
    gradient: "from-emerald-500 to-emerald-600",
    shadow: "shadow-emerald-200",
    icon: <WalletIcon />,
    format: (v) => `₹${v.toLocaleString()}`,
  },
  {
    key: "completionRate",
    label: "Completion",
    badge: "Goal",
    gradient: "from-orange-500 to-orange-600",
    shadow: "shadow-orange-200",
    icon: <TrophyIcon />,
    format: (v) => `${v}%`,
  },
];

const COURSE_COLORS = [
  { gradient: "from-blue-400 to-blue-500", bar: "bg-blue-500" },
  { gradient: "from-violet-400 to-violet-500", bar: "bg-violet-500" },
  { gradient: "from-emerald-400 to-emerald-500", bar: "bg-emerald-500" },
];

const QUICK_ACTIONS = [
  {
    label: "Browse Courses",
    desc: "Explore 100+ courses",
    path: "/student/courses",
    icon: <SearchIcon />,
    gradient: "from-blue-500 to-blue-600",
  },
  {
    label: "My Courses",
    desc: "Continue learning",
    path: "/student/my-courses",
    icon: <BookOpenIcon />,
    gradient: "from-violet-500 to-violet-600",
  },
  {
    label: "My Profile",
    desc: "Manage account",
    path: "/student/profile",
    icon: <UserIcon />,
    gradient: "from-emerald-500 to-emerald-600",
  },
];

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

export default function StudentDashboard() {
  const [stats, setStats] = useState({
    myCourses: 0,
    availableCourses: 0,
    totalSpent: 0,
    completionRate: 0,
  });
  const [recentCourses, setRecentCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const firstName = user?.name?.split(" ")[0] || "Student";

  useEffect(() => {
    async function loadStats() {
      try {
        const res = await fetchMyEnrollments();
        const courses = res.data?.enrollments || res.data || [];
        const totalSpent = courses.reduce((sum, e) => sum + (e.amountPaid || 0), 0);
        setStats({
          myCourses: courses.length,
          availableCourses: res.data?.totalCourses || 0,
          totalSpent,
          completionRate:
            courses.length > 0
              ? Math.floor(
                  (courses.filter((c) => c.status === "completed").length / courses.length) * 100
                )
              : 0,
        });
        setRecentCourses(courses.slice(0, 3));
      } catch {
        setRecentCourses(sampleEnrollments.slice(0, 3));
        setStats({
          myCourses: sampleEnrollments.length,
          availableCourses: sampleStats.totalCourses,
          totalSpent: 14497,
          completionRate: 33,
        });
      } finally {
        setLoading(false);
      }
    }
    loadStats();
  }, []);

  return (
    <div className="space-y-8">
      {/* Hero Banner */}
      <div className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-violet-700 rounded-3xl p-8 overflow-hidden text-white">
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-white/10 rounded-full pointer-events-none" />
        <div className="absolute -bottom-8 right-24 w-32 h-32 bg-white/10 rounded-full pointer-events-none" />
        <div className="absolute top-4 right-4 w-16 h-16 bg-white/10 rounded-full pointer-events-none" />

        <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div>
            <p className="text-blue-200 text-sm font-medium mb-1 tracking-wide">{getGreeting()},</p>
            <h1 className="text-3xl lg:text-4xl font-bold">{firstName} 👋</h1>
            <p className="text-blue-100 mt-2 text-sm">
              Continue where you left off. Your future is one lesson away.
            </p>
          </div>
          <button
            onClick={() => navigate("/student/courses")}
            className="flex items-center gap-2 bg-white text-blue-700 font-semibold px-6 py-3 rounded-2xl hover:bg-blue-50 transition-all duration-200 shadow-lg w-fit shrink-0"
          >
            <SearchIcon />
            Browse Courses
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STAT_CARDS.map((card) => {
          const raw = stats[card.key];
          const display = card.format ? card.format(raw) : raw;
          return (
            <div
              key={card.key}
              className={`bg-gradient-to-br ${card.gradient} rounded-2xl p-5 text-white shadow-lg ${card.shadow}`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="p-2.5 bg-white/20 rounded-xl">{card.icon}</div>
                <span className="text-xs font-semibold bg-white/20 px-2.5 py-1 rounded-full">
                  {card.badge}
                </span>
              </div>
              <p className="text-3xl font-bold leading-none">{display}</p>
              <p className="text-white/75 text-sm mt-1.5">{card.label}</p>
            </div>
          );
        })}
      </div>

      {/* Recent Courses + Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Courses — 2 cols */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-slate-900">Recent Courses</h2>
            <button
              onClick={() => navigate("/student/my-courses")}
              className="flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm font-semibold transition"
            >
              View all <ChevronRightIcon />
            </button>
          </div>

          {loading ? (
            <div className="bg-white rounded-2xl border border-slate-100 p-12 flex items-center justify-center">
              <svg className="animate-spin w-8 h-8 text-blue-500" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
            </div>
          ) : recentCourses.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-100 p-12 text-center">
              <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4 text-blue-400">
                <BookOpenIcon />
              </div>
              <p className="font-semibold text-slate-700 mb-1">No courses yet</p>
              <p className="text-sm text-slate-500 mb-5">Start your learning journey today</p>
              <button
                onClick={() => navigate("/student/courses")}
                className="bg-blue-600 text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-blue-700 transition text-sm"
              >
                Browse Courses
              </button>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden divide-y divide-slate-50">
              {recentCourses.map((enrollment, idx) => {
                const color = COURSE_COLORS[idx % COURSE_COLORS.length];
                return (
                  <div
                    key={enrollment._id}
                    className="flex items-center gap-4 p-5 hover:bg-slate-50 transition-colors group cursor-pointer"
                    onClick={() => navigate(`/course/${enrollment.course?._id}`)}
                  >
                    <div
                      className={`w-11 h-11 rounded-xl bg-gradient-to-br ${color.gradient} flex items-center justify-center flex-shrink-0 text-white`}
                    >
                      <BookOpenIcon />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-slate-900 truncate text-sm group-hover:text-blue-600 transition">
                        {enrollment.course?.title || "Course"}
                      </h3>
                      <div className="flex items-center gap-2 mt-2">
                        <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${color.bar} rounded-full transition-all duration-700`}
                            style={{ width: `${enrollment.progress || 0}%` }}
                          />
                        </div>
                        <span className="text-xs font-medium text-slate-400 shrink-0 w-8 text-right">
                          {enrollment.progress || 0}%
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <span
                        className={`hidden sm:inline-flex px-2.5 py-1 rounded-full text-xs font-semibold ${
                          enrollment.status === "active"
                            ? "bg-green-100 text-green-700"
                            : enrollment.status === "completed"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-amber-100 text-amber-700"
                        }`}
                      >
                        {enrollment.status}
                      </span>
                      <span className="text-slate-300 group-hover:text-blue-500 group-hover:translate-x-0.5 transition-all">
                        <ChevronRightIcon />
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Quick Actions — 1 col */}
        <div>
          <h2 className="text-xl font-bold text-slate-900 mb-4">Quick Actions</h2>
          <div className="flex flex-col gap-3">
            {QUICK_ACTIONS.map((action) => (
              <button
                key={action.label}
                onClick={() => navigate(action.path)}
                className="flex items-center gap-4 p-4 bg-white border border-slate-100 rounded-2xl hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 text-left group shadow-sm"
              >
                <div
                  className={`p-2.5 bg-gradient-to-br ${action.gradient} rounded-xl text-white flex-shrink-0`}
                >
                  {action.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-slate-900 text-sm">{action.label}</p>
                  <p className="text-xs text-slate-500">{action.desc}</p>
                </div>
                <span className="text-slate-300 group-hover:text-blue-500 group-hover:translate-x-0.5 transition-all">
                  <ChevronRightIcon />
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

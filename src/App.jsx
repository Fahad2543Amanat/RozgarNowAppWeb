import { BrowserRouter, Routes, Route } from "react-router-dom";

import SplashScreen from "./pages/SplashScreen";
import Onboarding from "./pages/Onboarding";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
// ✅ CLIENT LAYOUT + PAGES
import ClientDashboard from "./pages/Clients/ClientDashboard";
import ClientLayout from "./layout/ClientLayout";
import Jobs from "./pages/Clients/Jobs";
import CreateJob from "./pages/Clients/CreateJob";
import Chat from "./pages/Clients/Chat";
import Reports from "./pages/Clients/Reports";
import Profile from "./pages/Clients/Profile";
import Settings from "./pages/Clients/Settings";

// ✅ WORKER (same logic baad me apply kar sakte ho)
import WorkerDashboard from "./pages/Workers/WorkerDashboard";
import WorkerLayout from "./layout/WorkerLayout";
import WorkerJobs from "./pages/Workers/WorkerJobs";
import MyJobs from "./pages/Workers/MyJobs";
import Tasks from "./pages/Workers/Tasks";
import WorkerChat from "./pages/Workers/WorkerChat";
import Earnings from "./pages/Workers/Earnings";
import WorkerProfile from "./pages/Workers/WorkerProfile";
import WorkerSettings from "./pages/Workers/WorkerSettings";
import ClientNotifications from "./pages/Clients/ClientNotifications";
import ClientBids from "./pages/Clients/ClientBids";




function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 🚀 SPLASH FIRST SCREEN */}
        <Route path="/" element={<SplashScreen />} />
        <Route path="/onboarding" element={<Onboarding />} />

        {/* 🔐 LOGIN */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        

        {/* 👤 CLIENT DASHBOARD (Nested Routing) */}
        <Route path="/client" element={<ClientLayout />}>
          <Route index element={<ClientDashboard />} />
          <Route path="jobs" element={<Jobs />} />
          <Route path="create-job" element={<CreateJob />} />
          <Route path="chat" element={<Chat />} />
          <Route path="reports" element={<Reports />} />
          <Route path="profile" element={<Profile />} />
          <Route path="client-notification" element={<ClientNotifications />} />
          <Route path="clientbids" element={<ClientBids />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        {/* 🧑‍🔧 WORKER (Nested like Client) */}
<Route path="/worker" element={<WorkerLayout />}>
  <Route index element={<WorkerDashboard />} />
  <Route path="jobs" element={<WorkerJobs />} />
  <Route path="my-jobs" element={<MyJobs />} />
  <Route path="tasks" element={<Tasks />} />
  <Route path="chat" element={<WorkerChat />} />
  <Route path="earnings" element={<Earnings />} />
  <Route path="profile" element={<WorkerProfile />} />
  <Route path="settings" element={<WorkerSettings />} />
</Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
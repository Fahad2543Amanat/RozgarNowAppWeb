import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";

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
import Signup from "./pages/Signup";



function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* 🔐 LOGIN */}
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        

        {/* 👤 CLIENT DASHBOARD (Nested Routing) */}
        <Route path="/client" element={<ClientLayout />}>
          <Route index element={<ClientDashboard />} />
          <Route path="jobs" element={<Jobs />} />
          <Route path="create-job" element={<CreateJob />} />
          <Route path="chat" element={<Chat />} />
          <Route path="reports" element={<Reports />} />
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        {/* 🧑‍🔧 WORKER */}
        <Route path="/worker" element={<WorkerDashboard />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
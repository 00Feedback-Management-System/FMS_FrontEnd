import DashboardLayout from "../../components/DashboardLayout";
import './Home.css'
import { Outlet } from 'react-router-dom'

function Home() {
    return (
        // <div>
        //     <DashboardLayout />
        //     <div className='container'>
        //         {/* <Outlet /> */}
        //     </div>
        // </div>
        <div className="flex">
      <DashboardLayout />
      <main className="flex-1">
        {/* <Outlet /> child pages will render here */}
      </main>
    </div>
    );
}

export default Home;
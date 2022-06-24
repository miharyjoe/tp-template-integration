import styles from "./App.css";
import { Navbar } from "./components/Navbar";
import { Sidebar } from "./components/Sidebar";
import { Breadcrumb } from "./components/Breadcrumb";
import { EmployeeList } from "./components/List";
import { Footer } from "./components/Footer";
import { Card } from "./components/Card";
import { useState } from "react";
import Modal from "./components/Modal/Modal";
import axios from "axios";

function App() {
  const [info, setInfo] = useState([]);
  const [sidebarClass, setSidebarClass] = useState("sb-nav-fixed");
  const [isOpen, setIsOpen] = useState(false);


  const employees = axios.get("https://jsonplaceholder.typicode.com/users")
  employees.then((item) => {
    console.log(item.data)
    setInfo(item.data)
  }).catch(
      (error) => console.log("error")
  )


  function toggleSidebarClass() {
    setSidebarClass(
      sidebarClass.includes("toggled")
        ? "sb-nav-fixed"
        : "sb-nav-fixed sb-sidenav-toggled"
    );
  }


  return (
    <div className={sidebarClass}>
      <Navbar toggleSidebarClass={toggleSidebarClass} />
      <div id="layoutSidenav">
        <div id="layoutSidenav_nav">
          <Sidebar />
        </div>
        <div id="layoutSidenav_content">
          <main>
            <div className="container-fluid px-4">
              <h1 className="mt-4">Tables</h1>
              <Breadcrumb />
              <Card>
                DataTables is a third party plugin that is used to generate the
                demo table below. For more information about DataTables, please
                visit the
                <a target="_blank" href="https://datatables.net/">
                  official DataTables documentation
                </a>
                .<br/>
                <button className="btn btn-primary primaryBtn" onClick={() => setIsOpen(true)}>
                  Open Modal
                </button>
                {isOpen && <Modal setIsOpen={setIsOpen} />}
              </Card>
              <Card title="DataTable Example">
                <EmployeeList items={info} />
              </Card>
            </div>

          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default App;

import {
  FaBell,
  FaShapes,
  FaCartPlus,
  FaFileInvoice,
  FaUser,
} from "react-icons/fa";
import { MdDashboardCustomize } from "react-icons/md";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { StateContext } from "../../../Context/StateContext";

export default function Navbar() {
  const router = useRouter();
  const { state } = useContext(StateContext);
  const currentPath = !router.pathname.split("/")[2]
    ? "home"
    : router.pathname.split("/")[2];

  useEffect(() => {
    const navItems = document.querySelectorAll("li[page]");
    navItems.forEach((item) => {
      if (item.getAttribute("page") === currentPath) {
        item.classList.add("active");
      } else {
        item.classList.remove("active");
      }
    });
  }, [currentPath]);

  return (
    <main className="main">
      <nav className="sidebar">
        <div className="logo-container">
          <Image
            src={"/LOGO_BRANCO2.png"}
            width={200}
            height={50}
            alt="logo HRL"
            priority="performance"
          />
        </div>
        <ul>
          <li page="home">
            <Link href="/user" className="nav-link">
              <MdDashboardCustomize
                style={{
                  color: "#d1d1d1",
                  marginRight: "15px",
                  fontSize: "20px",
                }}
              />
              <span style={{ color: "#d1d1d1", marginLeft: "10px" }}>
                Dashboard
              </span>
            </Link>
          </li>
          <li page="items">
            <Link href="#" className="nav-link">
              <FaUser
                style={{
                  color: "#d1d1d1",
                  marginRight: "15px",
                  fontSize: "20px",
                }}
              />
              <span style={{ color: "#d1d1d1", marginLeft: "10px" }}>
                Usuários
              </span>
            </Link>
          </li>
          <li page="pharmacists">
            <Link href="#" className="nav-link">
              <FaShapes
                style={{
                  color: "#d1d1d1",
                  marginRight: "15px",
                  fontSize: "20px",
                }}
              />
              <span style={{ color: "#d1d1d1", marginLeft: "10px" }}>
                Farmacêuticos
              </span>
            </Link>
          </li>
          <li page="purchase">
            <Link href="/user/purchase" className="nav-link">
              <FaCartPlus
                style={{
                  color: "#d1d1d1",
                  marginRight: "15px",
                  fontSize: "20px",
                }}
              />
              <span style={{ color: "#d1d1d1", marginLeft: "10px" }}>
                Abastecimento
              </span>
            </Link>
          </li>
          <li page="sale">
            <Link href="/user/items" className="nav-link">
              <FaFileInvoice
                style={{
                  color: "#d1d1d1",
                  marginRight: "15px",
                  fontSize: "20px",
                }}
              />
              <span style={{ color: "#d1d1d1", marginLeft: "10px" }}>
                Remoção
              </span>
            </Link>
          </li>
          <li page="notification" className="noti">
            <Link href="/user/notification" className="nav-link">
              <FaBell
                style={{
                  color: "#d1d1d1",
                  marginRight: "15px",
                  fontSize: "20px",
                }}
              />
              <span style={{ color: "#d1d1d1", marginLeft: "10px" }}>
                Notificações
              </span>
            </Link>
            {state.number_of_notifications !== 0 && (
              <span className="count">
                {state.number_of_notifications >= 10
                  ? "9+"
                  : state.number_of_notifications}
              </span>
            )}
          </li>
        </ul>
      </nav>
      <style jsx>{`
        .main {
          display: flex;
          height: 100vh;
          background-color: #f4f4f9;
          width: auto;
        }
        .sidebar {
          width: 250px;
          background-color: #1e2a38;
          padding: 20px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
          border-radius: 12px;
        }
        .logo-container {
          margin-bottom: 20px;
        }
        ul {
          list-style-type: none;
          padding: 0;
          width: 100%;
        }
        li {
          width: 100%;
          margin-bottom: 10px;
        }
        .nav-link {
          display: flex;
          align-items: center;
          padding: 10px 15px;
          border-radius: 8px;
          transition: background-color 0.3s ease, color 0.3s ease;
          font-size: 16px;
          text-decoration: none;
          color: #d1d1d1; /* Default text color */
        }
        .nav-link:hover {
          background-color: #34495e;
          color: #ffffff; /* Text color on hover */
        }
        .active .nav-link {
          background-color: #16a085;
          color: #ffffff;
          font-weight: bold;
        }
        .noti {
          position: relative;
        }
        .count {
          position: absolute;
          top: -5px;
          right: -10px;
          background-color: #e65d29;
          color: white;
          border-radius: 50%;
          padding: 2px 6px;
          font-size: 12px;
          font-weight: bold;
        }
      `}</style>
    </main>
  );
}

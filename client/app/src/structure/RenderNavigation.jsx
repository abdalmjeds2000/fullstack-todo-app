import { Link, Route, Routes, useLocation } from "react-router-dom"
import { nav } from "./navigation"
import { AuthData } from "../auth/AuthWrapper"
import UserControls from "../components/UserControls";
import logo from '/images/todo-logo-outline.png';

export const RenderRoutes = () => {
  const { user } = AuthData();

  return (
    <>
      <Routes>
        {nav.map((r, i) => {
          if(r.isPrivate && user.isAuthenticated) {
            return <Route key={i} path={r.path} element={r.element} />
          } else if(!r.isPrivate) {
            return <Route key={i} path={r.path} element={r.element} />
          } else {
            return null
          }
        })}
      </Routes>
    </>
  )
}


export const RenderMenu = () => {
  const { user } = AuthData();
  const { pathname } = useLocation();

  const lastPath = pathname.split('/')[pathname.split('/').length-1];
  const activeRoute = nav.filter(r => r.path === `/${lastPath}`)[0];
  return (
    <div className="bg-gray-100 border-b border-b-gray-300 h-20 w-full sticky top-0">
      <div className="container mx-auto h-full px-6 flex items-center justify-between">
        <div className="flex gap-8 items-center">
          <span className="text-xl font-bold"><Link to={user.isAuthenticated ? '/dashboard' : '/login'}><img src={logo} width={50} /></Link></span>
          <h1 className="capitalize text-xl">{activeRoute?.name}</h1>
        </div>
        <div>
          {
            user.isAuthenticated ?
            <div>
              <UserControls />
              {/* <Link to='#' onClick={logout}>Log out</Link> */}
            </div>
            :
            <div><Link to='/login'>Log in</Link></div>
          }
        </div>
      </div>
    </div>
  )
}
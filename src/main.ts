import './style.css'
import Navigo from 'navigo'
import HomePage from './pages/Home'
import AdminPage from './pages/Admin/AdminList'
import AdminProductAdd from './pages/Admin/Products/AdminAdd'
import AdminProductEdit from './pages/Admin/Products/AdminUpdate'

const router = new Navigo('/', {linksSelector: "a"})

type ComponentBase = {
  render: () => Promise<string>;
  afterRender: () => void
}

const print = async (component: ComponentBase, params?: any) => {
  document.getElementById('app').innerHTML = await component.render(params)
  if(component.afterRender) {
    component.afterRender(params)
  }
}

router.on({
  "/": () => print(HomePage),
  "/admin": () => print(AdminPage),
  "/admin/product/add": () => print(AdminProductAdd),
  "/admin/product/:id/edit": (data) => print(AdminProductEdit, +data.data.id),
})
router.resolve()
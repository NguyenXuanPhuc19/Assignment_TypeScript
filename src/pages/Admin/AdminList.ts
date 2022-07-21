import axios from "axios"
import { listProducts, removeProduct } from "../../api/product"
import AdminHeader from "../../components/Header/Admin"
import Sidebar from "../../components/Sidebar"

const AdminPage = {
    async render() {
        const { data } = await listProducts()
        const { data: category } = await axios.get('http://localhost:3001/categoryProducts');        
        return /* html */ `
            ${AdminHeader.render()}
            <div class="flex">
                <div class="w-[250px] flex-none pt-3 pl-3">
                    ${Sidebar.render()}
                </div>
                <div class="grow bg-[#f7f8f8] p-5">
                    <div class="flex justify-between">
                        <div>
                            <h1 class="text-2xl"><b>Sản phẩm chung</b></h1> 
                            <div class="grid grid-cols-[80px,auto] gap-2 mt-3">
                                <div><b class="inline-block mt-3">Bộ lọc: </b></div>
                                <div class>
                                    <label for="default" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Danh mục sản phẩm</label>
                                    <select id="default" class="bg-gray-50 border border-gray-300 w-[400px] text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                        ${category.map(item => /* html */ `
                                            <option value="${item.name}">${item.name}</option>
                                        `).join("")}
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div>
                            <a href="/admin/product/add" class=""><i class="fa-solid fa-square-plus text-6xl mr-9"></i></a>
                        </div>
                    </div>
                    <table class="table table-bordered">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Tên sản phẩm</th>
                                <th>Ảnh</th>
                                <th>Giá gốc</th>
                                <th>Giá khuyến mãi</th>
                                <th>Danh mục</th> 
                                <th>Đặc điểm nổi bật</th> 
                                <th>Mô tả dài</th> 
                                <th>Mô tả ngắn</th> 
                                <th>Thao tác</th> 
                            </tr>
                        </thead>
                        <tbody> 
                            ${data.map((item, index) => /* html */ `
                                <tr>
                                    <td>${index + 1}</td>
                                    <td>${item.name}</td>
                                    <td><img src="${item.image}" /></td>
                                    <td>${item.originalPrice}</td>
                                    <td>${item.saleOffPrice}</td>
                                    <td>${item.category}</td>
                                    <td>${item.feature}</td>
                                    <td>${item.description}</td>
                                    <td>${item.shortDescription}</td>
                                    <td>
                                        <button class="btn btn-danger btn-remove" data-id=${item.id}>Remove</button> <br>
                                        <a href="/admin/product/${item.id}/edit" class="btn btn-danger btn-update">Update</a>
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table> 
                </div>
            </div>
        `
    },
    afterRender() {
        const btns = document.querySelectorAll('table .btn');
        btns.forEach((btn) => {
            const { id } = btn.dataset;
            btn.addEventListener('click', async () => {
                if(btn.classList.contains('btn-remove')) {
                    const confirm = window.confirm('Are you sure you want to remove this item?')
                    if(confirm) {
                        const { data } = await removeProduct(id)
                        location.href = '/admin'
                        if(data) {
                            alert('Delete successfully!')
                        }
                    }
                }
            })
        })
    }
}

export default AdminPage;
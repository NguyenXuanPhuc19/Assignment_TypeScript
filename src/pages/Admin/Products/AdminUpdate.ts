import axios from "axios";
import { upload } from "../../../api/image";
import { getProduct, updateProduct } from "../../../api/product";
import AdminHeader from "../../../components/Header/Admin"
import Sidebar from "../../../components/Sidebar"
import Product from "../../../models/product";

const AdminProductEdit = {
    render: async (id: number) => {
        const { data } = await getProduct(id);      
        const { data: category } = await axios.get('http://localhost:3001/categoryProducts');        
        return /*html*/`
        ${AdminHeader.render()}
        <div class="flex mt-4 divide-x">
            <div class="w-[250px] flex-none pt-3 pl-3">
                ${Sidebar.render()}
            </div>
            <div class="grow px-4">
                <div>
                <h3 class="text-2xl mb-3"><b>Sửa sản phẩm</b></h3>
                <div class="grid grid-cols-3 gap-8">
                    <div>
                        <div class="flex flex-col justify-center items-center border rounded-md h-[250px]" style="position: relative">
                            <label htmlFor="">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 mr-[380px]" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                                    clip-rule="evenodd" />
                                </svg>
                                <input id="edit-file" type="file" class="hidden w-full" style="padding-right: 200px;" accept="image/jpg, image/jpeg, image/png" />
                            </label>
                            <div class="mt-4 mr-[380px]">Thêm ảnh</div>
                            <img id="edit-image" src="${data.image}" style="position: absolute; height: 250px"/>
                        </div>
                        <div class="mt-3">
                            <label for="">Mô tả ngắn</label>
                            <textarea id="shortDescription" class="w-full border">${data.shortDescription}</textarea>
                        </div>
                    </div>
                    <div class="col-span-2">
                        <div class="border-b pb-2">Thông tin sản phẩm</div>
                        <div class="flex flex-col mt-4">
                            <label for="">Tên sản phẩm:</label>
                            <input id="name" type="text" placeholder="Tên sản phẩm" class="w-full border rounded-sm h-10" value="${data.name}" />
                        </div>
                        <div class="grid grid-cols-2 gap-4 mt-4">
                            <div class="flex flex-col">
                                <label for="">Giá gốc:</label>
                                <input id="originalPrice" type="text" placeholder="Giá gốc" class="w-full border rounded-sm h-10" value="${data.originalPrice}">
                            </div>
                            <div class="flex flex-col">
                                <label for="">Giá khuyến mãi:</label>
                                <input id="saleOffPrice" type="text" placeholder="Giá khuyến mãi" class="w-full border rounded-sm h-10" value="${data.saleOffPrice}">
                            </div>
                        </div>
                        <div class="flex flex-col mt-4">
                            <label for="default" class="block mb-2 font-medium text-gray-900 dark:text-gray-400">Danh mục sản phẩm</label>
                            <select id="category" class="bg-gray-50 border border-gray-300 w-[525px] text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                ${category.map(item => /* html */ `
                                    <option ${item.name == data.category ? 'selected' : ''} value="${item.name}">${item.name}</option>
                                `).join("")}
                            </select>
                        </div>
                        <div class="flex flex-col mt-4">
                            <label for="">Đặc điểm nổi bật</label>
                            <textarea id="feature" class="w-full border">${data.feature}</textarea>
                        </div>
                        <div class="flex flex-col mt-4">
                            <label for="">Mô tả dài</label>
                            <textarea id="description" class="w-full border">${data.description}</textarea>
                        </div>
                        <button class="btn btn-info w-[100px] mt-4 text-white" id="edit-product-btn">Update</button>
                    </div>
                </div>
            </div>        
            </div>
        </div>
        `
    },
    afterRender: async (id: number) => {
        const editProductBtn = document.querySelector('#edit-product-btn');
        const editFile = document.querySelector('#edit-file')
		const editImage = document.querySelector('#edit-image')
        editProductBtn?.addEventListener('click', async () => {
            const name = document.querySelector('#name')?.value
            const image = editImage?.src
            const originalPrice = document.querySelector('#originalPrice')?.value
            const saleOffPrice = document.querySelector('#saleOffPrice')?.value        
            const category = document.querySelector('#category')?.value
            const feature = document.querySelector('#feature')?.value
            const description = document.querySelector('#description')?.value
            const shortDescription = document.querySelector('#shortDescription')?.value
            const product = new Product(name, image, originalPrice, saleOffPrice, category, feature, description, shortDescription)
            try {
                const data = await updateProduct(id, product)
                alert('Sửa thành công')
                location.href = '/admin'
            } catch (error) {
                console.log(error);
            }
        })

        editFile?.addEventListener('change', (event) => {
			const file = event.target.files[0]
			const reader = new FileReader()
			reader.readAsDataURL(file)
			reader.onloadend = async () => {
				const res = await upload(reader.result)
				console.log(res)
				const data = res.data
				editImage.src = data.url
			}
		})
    }
}

export default AdminProductEdit;
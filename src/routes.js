import Home from './components/Home';
import Category from './components/category/Category';
import CategoryCreate from './components/category/CategoryCreate';
import CategoryEdit from './components/category/CategoryEdit';
import CreateAction from './components/action/CreateAction';
import EditAction from './components/action/EditAction';

export const routes = [

	{path: '/', component: Home },
	{path: '/action/create', component: CreateAction },
	{path: '/action/:id/edit', component: EditAction, name: 'editAction' },
	{path: '/category', component: Category },
	{path: '/category/:id/edit', component: CategoryEdit, name: 'editCategory' },
	{path: '/category/create', component: CategoryCreate, name: 'createCategory' },
]
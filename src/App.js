import  { RouterProvider,createBrowserRouter } from 'react-router-dom'
import './App.css';
import Home from './component/Home';
import AddUser from './component/AddUser';
import Edit from './component/Edit';

function App() {

  const route = createBrowserRouter([
    {
      path:'/',
      element:<Home/>
    },
    {
      path:'/add',
      element:<AddUser/>
    },
    {
      path:'/edit/:id',
      element:<Edit/>
    }
  ])

  return (
    <div className="App">
        <RouterProvider router={route}></RouterProvider>
    </div>
  );
}

export default App;

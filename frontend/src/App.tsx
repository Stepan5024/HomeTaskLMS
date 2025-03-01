import {
    createBrowserRouter,
    createRoutesFromElements,
    Navigate,
    Route,
    RouterProvider,
} from 'react-router-dom';
import Student from './pages/Student/Student';

function App() {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <>
                <Route
                    path="/"
                    element={<Navigate to={'/student'} replace />}
                />
                <Route path="/student" element={<Student />} />
            </>
        )
    );
    return <RouterProvider router={router} />;
}

export default App;

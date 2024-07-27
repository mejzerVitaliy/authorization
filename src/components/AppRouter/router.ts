import SignInForm from "../Pages/Registration/SignInForm"
import LogInForm from "../Pages/Login/LogInForm"
import Account from "../Pages/Account/Account"
import Notes from "../Pages/GeneralPage/Notes"
import CreateNote from "../Pages/CreateNewNote/CreateNote"

interface Routes {
    path: string,
    element: React.FC
}

export const publicRoutes: Routes[] = [
    { path: '/signIn', element: SignInForm  },
    { path: '/logIn', element: LogInForm }
]

export const privateRoutes: Routes[] = [
    { path: '/account', element: Account },
    { path: '/myNotes', element: Notes },
    { path: '/createNote', element: CreateNote }
]
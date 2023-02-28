

import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../store/user/user.selector';
import { signOutUser } from '../utils/firebase/firebase.utils';
import './header.styles.scss';

const Header = () => {


    const currentUser = useSelector(selectCurrentUser);

    const handleSignOut = async () => {
        await signOutUser();
    }


    return (
        <div className="header py-2 px-10 flex justify-between items-center ">


            <section>
                <h2 className='m-0 font-serif tracking-wider'>TaskLister</h2>
            </section>

            <section className='flex items-center'>

                <div>
                    <p>Hey, {currentUser.displayName}</p>
                </div>

                <div>
                    <button onClick={handleSignOut} className="ml-5 bg-white border-0 px-3 py-1 rounded-sm cursor-pointer"> Sign Out </button>
                </div>

            </section>


        </div>
    )
}

export default Header;